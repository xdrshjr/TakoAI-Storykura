import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';
import crypto from 'crypto';

// 将 exec 转换为 Promise
const execPromise = util.promisify(exec);

// 获取语音合成 API 密钥
const TTS_API_KEY = process.env.TTS_API_KEY || '';

export async function POST(req: NextRequest) {
  try {
    const { text, voiceStyle = 'longxiaochun_v2', voiceModel = 'cosyvoice-v2' } = await req.json();
    
    if (!text) {
      return NextResponse.json(
        { error: '文本内容不能为空' },
        { status: 400 }
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
    
    // 日志记录
    console.log('开始生成语音...');
    console.log(`工作目录: ${process.cwd()}`);
    console.log(`输出路径: ${outputPath}`);
    
    // 确保脚本路径存在
    const scriptPath = path.join(process.cwd(), 'scripts', 'dashscope_tts.py');
    let finalScriptPath = scriptPath;
    
    if (!fs.existsSync(scriptPath)) {
      console.error(`脚本文件不存在: ${scriptPath}`);
      
      // 尝试查找脚本位置
      const possiblePaths = [
        path.join(process.cwd(), 'storykura', 'scripts', 'dashscope_tts.py'),
        path.join(process.cwd(), '..', 'scripts', 'dashscope_tts.py')
      ];
      
      let foundScript = false;
      for (const altPath of possiblePaths) {
        if (fs.existsSync(altPath)) {
          console.log(`找到替代脚本路径: ${altPath}`);
          finalScriptPath = altPath;
          foundScript = true;
          break;
        }
      }
      
      if (!foundScript) {
        return NextResponse.json(
          { error: '找不到语音生成脚本文件', details: `已检查路径: ${scriptPath}` },
          { status: 500 }
        );
      }
    }
    
    // 获取Python路径
    let pythonPath = 'python';
    try {
      // 尝试检查Python路径
      const { stdout: pythonVersionOutput } = await execPromise('python --version');
      console.log(`Python版本: ${pythonVersionOutput.trim()}`);
    } catch (error) {
      console.warn('无法获取Python版本，使用默认python命令');
    }
    
    // 构建命令，注意处理文本中的特殊字符
    const escapedText = text.replace(/"/g, '\\"').replace(/\n/g, ' ');
    const command = `${pythonPath} "${finalScriptPath}" --text "${escapedText}" --output "${outputPath}" --model "${voiceModel}" --voice "${voiceStyle}" --api_key "${TTS_API_KEY}"`;
    
    console.log(`执行命令: ${command}`);
    
    // 执行命令
    try {
      const { stdout, stderr } = await execPromise(command);
      
      console.log('语音生成输出:');
      console.log(stdout);
      
      if (stderr) {
        console.error('语音生成错误输出:');
        console.error(stderr);
      }
      
      // 检查文件是否生成
      if (!fs.existsSync(outputPath)) {
        console.error('语音文件未生成');
        return NextResponse.json(
          { 
            error: '语音生成失败，文件未创建', 
            details: stderr || stdout,
            command: command
          },
          { status: 500 }
        );
      }
      
      if (fs.statSync(outputPath).size === 0) {
        console.error('语音文件生成但大小为0');
        return NextResponse.json(
          { 
            error: '语音生成失败，文件为空', 
            details: stderr || stdout,
            command: command
          },
          { status: 500 }
        );
      }
      
      console.log(`语音生成成功，文件大小: ${fs.statSync(outputPath).size} 字节`);
      
      return NextResponse.json({ 
        audioUrl: relativePath,
        success: true,
        details: stdout
      });
    } catch (execError: any) {
      console.error('执行命令时出错:', execError);
      return NextResponse.json(
        { 
          error: '语音生成失败，命令执行出错', 
          details: execError.message,
          command: command
        },
        { status: 500 }
      );
    }
    
  } catch (error: any) {
    console.error('语音生成过程中发生意外错误:', error);
    
    return NextResponse.json(
      { 
        error: '生成语音失败', 
        details: error.message,
        stack: error.stack
      },
      { status: 500 }
    );
  }
} 