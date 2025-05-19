#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import requests
import json
import argparse
from pathlib import Path

def generate_speech(text, output_file, api_url=None, api_key=None, voice_style="default"):
    """
    使用API生成语音并保存到指定文件
    
    参数:
        text (str): 要转换为语音的文本
        output_file (str): 输出音频文件路径
        api_url (str): API端点URL，如果为None则从环境变量获取
        api_key (str): API密钥，如果为None则从环境变量获取
        voice_style (str): 语音风格 (default, male, female, energetic, calm)
    
    返回:
        bool: 成功返回True，失败返回False
    """
    # 从环境变量获取API配置（如果未指定）
    if not api_url:
        api_url = os.getenv('TTS_API_URL')
    if not api_key:
        api_key = os.getenv('TTS_API_KEY')
    
    if not api_url or not api_key:
        print("错误: 未指定TTS API URL或API密钥")
        return False
    
    try:
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        }
        
        # 根据voice_style设置合适的参数
        voice_params = {}
        if voice_style == "male":
            voice_params = {"voice": "male_voice"}
        elif voice_style == "female":
            voice_params = {"voice": "female_voice"}
        elif voice_style == "energetic":
            voice_params = {"voice": "energetic_voice", "energy": 0.8}
        elif voice_style == "calm":
            voice_params = {"voice": "calm_voice", "energy": 0.3}
        
        payload = {
            "text": text,
            "output_format": "mp3",
            **voice_params
        }
        
        # 发送请求到TTS API
        response = requests.post(
            api_url,
            headers=headers,
            data=json.dumps(payload)
        )
        
        if response.status_code == 200:
            # 确保输出目录存在
            output_dir = os.path.dirname(output_file)
            if output_dir and not os.path.exists(output_dir):
                os.makedirs(output_dir)
                
            # 将响应内容写入文件
            with open(output_file, 'wb') as f:
                f.write(response.content)
            
            print(f"语音已成功生成并保存到: {output_file}")
            return True
        else:
            print(f"错误: API请求失败，状态码 {response.status_code}")
            print(f"响应: {response.text}")
            return False
            
    except Exception as e:
        print(f"发生错误: {str(e)}")
        return False

def main():
    parser = argparse.ArgumentParser(description='文本转语音生成工具')
    parser.add_argument('--text', type=str, help='要转换为语音的文本')
    parser.add_argument('--input-file', type=str, help='包含要转换文本的输入文件')
    parser.add_argument('--output-file', type=str, required=True, help='输出音频文件路径')
    parser.add_argument('--api-url', type=str, help='API端点URL（可选，默认使用环境变量）')
    parser.add_argument('--api-key', type=str, help='API密钥（可选，默认使用环境变量）')
    parser.add_argument('--voice-style', type=str, default='default', 
                        choices=['default', 'male', 'female', 'energetic', 'calm'],
                        help='语音风格')
    
    args = parser.parse_args()
    
    # 获取文本内容（从命令行参数或文件）
    text = args.text
    if not text and args.input_file:
        try:
            with open(args.input_file, 'r', encoding='utf-8') as f:
                text = f.read().strip()
        except Exception as e:
            print(f"读取输入文件时出错: {str(e)}")
            sys.exit(1)
    
    if not text:
        print("错误: 未提供文本内容")
        sys.exit(1)
    
    # 生成语音
    success = generate_speech(
        text=text,
        output_file=args.output_file,
        api_url=args.api_url,
        api_key=args.api_key,
        voice_style=args.voice_style
    )
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main() 