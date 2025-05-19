import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';
import crypto from 'crypto';

// 将 exec 转换为 Promise
const execPromise = util.promisify(exec);

export async function POST(req: NextRequest) {
  try {
    const { text, voiceStyle = 'default' } = await req.json();
    
    if (!text) {
      return NextResponse.json(
        { error: '文本内容不能为空' },
        { status: 400 }
      );
    }
    
    // 获取环境变量
    const apiUrl = process.env.SPEECH_API_URL;
    const apiKey = process.env.SPEECH_API_KEY;
    
    if (!apiUrl || !apiKey) {
      return NextResponse.json(
        { error: '未配置 Speech API 的 URL 或 API KEY' },
        { status: 500 }
      );
    }
    
    // 生成唯一文件名
    const hash = crypto.createHash('md5').update(text + Date.now()).digest('hex');
    const fileName = `speech-${hash}.mp3`;
    
    // 创建存储目录（如果不存在）
    const audioDir = path.join(process.cwd(), 'public', 'audio');
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true });
    }
    
    const outputPath = path.join(audioDir, fileName);
    const relativePath = `/audio/${fileName}`;
    
    // 执行 Python 脚本生成语音
    const scriptPath = path.join(process.cwd(), 'scripts', 'speech_synthesis.py');
    
    // 构建命令，注意处理文本中的特殊字符
    const escapedText = text.replace(/"/g, '\\"');
    const command = `python "${scriptPath}" --text "${escapedText}" --output "${outputPath}" --api-url "${apiUrl}" --api-key "${apiKey}" --voice-style "${voiceStyle}" --format "mp3"`;
    
    // 执行命令
    await execPromise(command);
    
    // 检查文件是否生成
    if (!fs.existsSync(outputPath)) {
      return NextResponse.json(
        { error: '语音生成失败，请检查日志' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      audioUrl: relativePath,
      success: true 
    });
    
  } catch (error: any) {
    console.error('Speech synthesis error:', error.message);
    
    return NextResponse.json(
      { error: '生成语音失败', details: error.message },
      { status: 500 }
    );
  }
} 