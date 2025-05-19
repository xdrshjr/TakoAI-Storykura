import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// 提取关键词函数
async function extractKeywords(text: string): Promise<string[]> {
  // 这里可以使用LLM API提取关键词
  // 简单起见，我们使用一些基本的文本处理来提取关键词
  
  // 移除标点符号并分割为单词
  const words = text
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .replace(/\s{2,}/g, " ")
    .toLowerCase()
    .split(" ");
  
  // 移除常见的停用词
  const stopWords = ["的", "了", "是", "在", "和", "与", "这", "那", "有", "我", "你", "他", "她", "它", "们"];
  const filteredWords = words.filter(word => !stopWords.includes(word) && word.length > 1);
  
  // 取前3个关键词
  return filteredWords.slice(0, 3);
}

export async function POST(request: NextRequest) {
  try {
    const { text, mode = 'search' } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: '缺少必要的文本参数' },
        { status: 400 }
      );
    }

    // 根据模式处理不同的逻辑
    if (mode === 'search') {
      // 从环境变量获取API密钥
      const apiKey = process.env.VIDEO_API_KEY;
      const apiUrl = process.env.VIDEO_API_URL || 'https://api.pexels.com/videos';
      
      if (!apiKey) {
        return NextResponse.json(
          { error: '视频API配置缺失' },
          { status: 500 }
        );
      }
      
      // 提取关键词
      const keywords = await extractKeywords(text);
      const searchQuery = keywords.join(' ');
      
      // 调用Pexels API搜索视频
      const response = await axios.get(`${apiUrl}/search`, {
        params: {
          query: searchQuery,
          per_page: 1, // 只获取一个结果
          orientation: 'landscape'
        },
        headers: {
          'Authorization': apiKey
        }
      });
      
      // 解析响应
      if (response.data.videos && response.data.videos.length > 0) {
        const video = response.data.videos[0];
        const videoFile = video.video_files.find((file: any) => 
          file.quality === 'sd' && file.file_type === 'video/mp4'
        ) || video.video_files[0];
        
        return NextResponse.json({
          videoUrl: videoFile.link,
          videoThumbnail: video.image,
          width: videoFile.width,
          height: videoFile.height,
          duration: video.duration
        });
      } else {
        return NextResponse.json(
          { error: '未找到匹配的视频' },
          { status: 404 }
        );
      }
    } else if (mode === 'lecture') {
      // 对于讲稿图文模式，这里应该生成一个图文HTML或图像
      // 简单起见，我们返回一个模拟的图像URL
      return NextResponse.json({
        imageUrl: `https://via.placeholder.com/800x450?text=${encodeURIComponent(text.substring(0, 20))}...`
      });
    } else {
      return NextResponse.json(
        { error: '不支持的模式' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('处理视频请求时出错:', error);
    
    return NextResponse.json(
      { error: '视频搜索失败' },
      { status: 500 }
    );
  }
} 