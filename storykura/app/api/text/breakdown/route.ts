import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// 定义段落接口
interface Segment {
  originalText: string;
  lectureText: string;
}

// 定义响应接口
interface SegmentResponse {
  segments: Segment[];
}

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: '缺少必要的文本参数' },
        { status: 400 }
      );
    }

    // 获取环境变量
    const apiKey = process.env.LLM_API_KEY;
    const apiUrl = process.env.LLM_API_URL;
    const modelName = process.env.LLM_MODEL_NAME || 'gpt-4';

    if (!apiKey || !apiUrl) {
      return NextResponse.json(
        { error: 'LLM API配置缺失' },
        { status: 500 }
      );
    }

    // 调用LLM API
    const response = await axios.post(
      `${apiUrl}/chat/completions`,
      {
        model: modelName,
        messages: [
          {
            role: 'system',
            content: '你是一位文本处理专家，擅长将长文本按语义单位拆解成一句话一句话的形式，并将每句话转换为讲课风格。你需要返回JSON格式的结果，其中必须包含一个名为"segments"的数组。'
          },
          {
            role: 'user',
            content: `请将以下文本按语义拆解成多个句子，并将每个句子转换为讲课风格的语言。

返回一个JSON格式的结果，JSON必须包含一个名为"segments"的数组字段，数组中的每个元素必须具有以下两个字段：
1. "originalText"：原始文本
2. "lectureText"：转换后的讲课文本

示例返回格式：
{
  "segments": [
    {
      "originalText": "原文句子1",
      "lectureText": "讲课风格的句子1"
    },
    {
      "originalText": "原文句子2",
      "lectureText": "讲课风格的句子2"
    }
  ]
}

请务必遵循这个JSON格式。以下是需要拆解的文本：\n\n${text}`
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        response_format: { type: "json_object" }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    // 解析LLM返回的JSON结果
    const responseContent = response.data.choices[0].message.content.trim();
    let parsedResponse: SegmentResponse | null = null;
    
    try {
      const rawResponse: any = JSON.parse(responseContent);
      console.log("LLM返回的原始数据:", JSON.stringify(rawResponse));
      
      // 处理可能的不同JSON结构
      if (!rawResponse.segments) {
        // 如果没有segments字段，但存在其他数组字段，尝试使用第一个数组字段
        const arrayFields = Object.keys(rawResponse).filter(key => 
          Array.isArray(rawResponse[key]) && 
          rawResponse[key].length > 0 &&
          typeof rawResponse[key][0] === 'object' &&
          rawResponse[key][0] !== null &&
          'originalText' in rawResponse[key][0] && 
          'lectureText' in rawResponse[key][0]
        );
        
        if (arrayFields.length > 0) {
          // 使用找到的第一个符合条件的数组
          parsedResponse = { segments: rawResponse[arrayFields[0]] };
        } else if (Array.isArray(rawResponse)) {
          // 如果返回的顶级就是数组
          parsedResponse = { segments: rawResponse };
        } else {
          // 构造新的响应对象
          // 查找可能包含原始文本和讲课文本的对象
          const entries = Object.entries(rawResponse);
          const segments: Segment[] = [];
          
          // 方法1：检查是否有数字键，这通常表示数组被转换为了对象
          const numericKeys = Object.keys(rawResponse).filter(key => !isNaN(Number(key)));
          if (numericKeys.length > 0) {
            numericKeys.forEach(key => {
              const item = rawResponse[key];
              if (item && typeof item === 'object' && 'originalText' in item && 'lectureText' in item) {
                segments.push({
                  originalText: String(item.originalText),
                  lectureText: String(item.lectureText)
                });
              }
            });
          } 
          
          // 方法2：如果上面的方法没找到有效段落，尝试更通用的方法
          if (segments.length === 0) {
            for (const [key, value] of entries) {
              if (value && typeof value === 'object' && value !== null) {
                // 查找包含originalText和lectureText的对象
                if ('originalText' in value && 'lectureText' in value) {
                  segments.push({
                    originalText: String(value.originalText),
                    lectureText: String(value.lectureText)
                  });
                }
                // 或者查找键名可能包含original和lecture的对象
                else {
                  const valueAsRecord = value as Record<string, unknown>;
                  const originalKey = Object.keys(valueAsRecord).find(k => 
                    k.toLowerCase().includes('original') || k.toLowerCase().includes('source')
                  );
                  const lectureKey = Object.keys(valueAsRecord).find(k => 
                    k.toLowerCase().includes('lecture') || k.toLowerCase().includes('target')
                  );
                  
                  if (originalKey && lectureKey) {
                    segments.push({
                      originalText: String(valueAsRecord[originalKey]),
                      lectureText: String(valueAsRecord[lectureKey])
                    });
                  }
                }
              }
            }
          }
          
          // 如果还是没找到有效段落，尝试直接从文本中分割
          if (segments.length === 0) {
            // 简单的按句号、问号、感叹号拆分文本
            const sentences = text.split(/(?<=[。？！.?!])\s*/).filter((s: string) => s.trim());
            sentences.forEach((sentence: string) => {
              segments.push({
                originalText: sentence,
                lectureText: `让我来讲解一下：${sentence}`
              });
            });
          }
          
          parsedResponse = { segments };
        }
      } else {
        // 如果有segments字段，直接使用
        parsedResponse = { 
          segments: Array.isArray(rawResponse.segments) ? rawResponse.segments.map((segment: any) => ({
            originalText: 'originalText' in segment ? String(segment.originalText) : '',
            lectureText: 'lectureText' in segment ? String(segment.lectureText) : ''
          })) : [] 
        };
      }
      
      // 最终检查确保格式正确
      if (!parsedResponse?.segments || !Array.isArray(parsedResponse.segments) || parsedResponse.segments.length === 0) {
        throw new Error('无法从LLM响应中提取有效的segments数组');
      }
      
      // 确保每个segment都有必要的字段
      parsedResponse.segments = parsedResponse.segments.map((segment: any) => ({
        originalText: 'originalText' in segment ? String(segment.originalText) : '',
        lectureText: 'lectureText' in segment ? String(segment.lectureText) : `让我来讲解一下：${'originalText' in segment ? String(segment.originalText) : ''}`
      }));
      
    } catch (error: any) {
      console.error('解析LLM响应时出错:', error, '原始响应:', responseContent);
      
      // 如果解析失败，使用备选方案
      // 简单的按句号、问号、感叹号拆分文本
      const sentences = text.split(/(?<=[。？！.?!])\s*/).filter((s: string) => s.trim());
      const segments: Segment[] = sentences.map((sentence: string) => ({
        originalText: sentence,
        lectureText: `让我来讲解一下：${sentence}`
      }));
      
      parsedResponse = { segments };
    }

    return NextResponse.json(parsedResponse);
  } catch (error: any) {
    console.error('处理文本拆解时出错:', error);
    
    return NextResponse.json(
      { error: '文本拆解处理失败', message: error.message },
      { status: 500 }
    );
  }
} 