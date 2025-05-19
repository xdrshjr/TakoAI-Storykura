#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import json
import argparse
import dashscope
from dashscope.audio.tts_v2 import SpeechSynthesizer

# 设置默认API密钥
DEFAULT_API_KEY = os.getenv('VOICE_API_KEY', '')


def parse_arguments():
    """解析命令行参数"""
    parser = argparse.ArgumentParser(description='文本转语音服务')
    # 添加两种方式：直接传文本或通过文件传文本
    text_group = parser.add_mutually_exclusive_group(required=True)
    text_group.add_argument('--text', type=str, help='要转换为语音的文本')
    text_group.add_argument('--text_file', type=str, help='包含要转换为语音的文本的文件路径')

    parser.add_argument('--output', type=str, required=True, help='输出音频文件路径')
    parser.add_argument('--model', type=str, default='cosyvoice-v2', help='使用的模型')
    parser.add_argument('--voice', type=str, default='longxiaochun_v2', help='使用的音色')
    parser.add_argument('--api_key', type=str, default=DEFAULT_API_KEY, help='API密钥')
    parser.add_argument('--format', type=str, default='mp3', help='输出音频格式')

    # 使用更健壮的参数解析方式
    try:
        args = parser.parse_args()

        # 如果指定了文本文件，则从文件中读取文本
        if args.text_file:
            try:
                with open(args.text_file, 'r', encoding='utf-8') as f:
                    args.text = f.read()
                print(f"已从文件 {args.text_file} 读取文本，长度: {len(args.text)} 字符", file=sys.stderr)
            except Exception as e:
                print(f"读取文本文件出错: {str(e)}", file=sys.stderr)
                sys.exit(1)

        # 调试打印参数
        print(f"调试信息: 文本长度={len(args.text)}, 输出路径={args.output}", file=sys.stderr)
        return args
    except Exception as e:
        print(f"参数解析错误: {str(e)}", file=sys.stderr)
        sys.exit(1)


def synthesize_speech(text, output_path, model='cosyvoice-v2', voice='longxiaochun_v2', api_key=DEFAULT_API_KEY):
    """转换文本为语音"""
    try:
        # 设置API密钥
        dashscope.api_key = api_key

        # 调试信息
        print(f"使用API密钥: {api_key[:5]}***", file=sys.stderr)
        print(f"使用模型: {model}, 音色: {voice}", file=sys.stderr)
        print(f"文本长度: {len(text)} 字符", file=sys.stderr)
        print(f"输出路径: {output_path}", file=sys.stderr)

        # 创建语音合成器实例
        synthesizer = SpeechSynthesizer(
            model=model,  # 使用v2版本的模型
            voice=voice  # v2模型必须使用v2音色
        )

        # 调用语音合成接口
        audio = synthesizer.call(text)

        # 确保输出目录存在
        output_dir = os.path.dirname(os.path.abspath(output_path))
        os.makedirs(output_dir, exist_ok=True)
        print(f"创建输出目录: {output_dir}", file=sys.stderr)

        # 将合成的音频内容写入文件
        with open(output_path, 'wb') as f:
            f.write(audio)
            print(f"音频写入成功，大小: {len(audio)} 字节", file=sys.stderr)

        # 获取相对输出路径供返回使用
        rel_output_path = os.path.relpath(output_path)

        # 成功结果不再调用不存在的方法
        result = {
            'success': True,
            'output_path': output_path,
            'relative_path': rel_output_path,
            'audio_size': len(audio)
        }

        # 尝试获取请求ID，如果存在的话
        try:
            if hasattr(synthesizer, 'get_last_request_id'):
                result['request_id'] = synthesizer.get_last_request_id()
        except Exception as e:
            print(f"获取请求ID失败: {str(e)}", file=sys.stderr)

        return result
    except Exception as e:
        error_msg = str(e)
        print(f"语音合成失败: {error_msg}", file=sys.stderr)
        return {
            'success': False,
            'error': error_msg
        }


def main():
    """主函数"""
    try:
        args = parse_arguments()

        # 验证路径和参数
        print(f"输出文件路径: {os.path.abspath(args.output)}", file=sys.stderr)

        result = synthesize_speech(
            args.text,
            args.output,
            args.model,
            args.voice,
            args.api_key
        )

        # 输出JSON结果
        print(json.dumps(result, ensure_ascii=False))

        # 设置退出代码
        if result['success']:
            sys.exit(0)
        else:
            sys.exit(1)
    except Exception as e:
        error_result = {
            'success': False,
            'error': f"程序执行异常: {str(e)}"
        }
        print(json.dumps(error_result, ensure_ascii=False))
        sys.exit(1)


if __name__ == "__main__":
    main() 