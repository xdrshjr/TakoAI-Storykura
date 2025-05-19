import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

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
            content: '你是一位优秀的讲师，擅长将学术或正式的文本转换为讲课风格的语言。保持原始内容的意思，但让表达更口语化、生动、适合朗读。'
          },
          {
            role: 'user',
            content: `请将以下文本转换为讲课风格的语言，保持原意，但使其更口语化、更适合朗读:\n\n${text}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1024
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    const lectureText = response.data.choices[0].message.content.trim();

    return NextResponse.json({ lectureText });
  } catch (error) {
    console.error('处理文本时出错:', error);
    
    return NextResponse.json(
      { error: '处理文本失败' },
      { status: 500 }
    );
  }
} 