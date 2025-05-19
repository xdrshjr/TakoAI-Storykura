# Storykura

**Turn Text into Talk – Effortlessly with Storykura.**

## Overview

Storykura is an advanced text-to-video conversion tool that helps users transform written content into engaging video presentations. With powerful AI integration, it automatically converts text into natural speech and pairs it with relevant visuals.

## Features

- **Text Input Support**
  - Paste text directly or upload Markdown (.md) files
  - Real-time content preview with Markdown rendering

- **Script Processing**
  - Automatic semantic-based script segmentation
  - AI-powered conversion to conversational, lecture-style language

- **Voice Generation**
  - Generate speech for each script segment
  - Multiple voice styles (male, female, energetic, calm)

- **Video Generation Modes**
  - Automatic video search mode: Finds relevant video clips for each segment
  - Lecture-style mode: Creates HTML-style slides with text and background

- **Visual Editing**
  - Script-by-script editing
  - Real-time preview of audio and visual content
  - Material management and customization

- **Video Export**
  - Preview complete video with transitions and background music
  - Export options for resolution and aspect ratio
  - Download as standard video format (MP4, H.264)

## 语音生成功能

StoryKura现在支持使用阿里云DashScope API生成自然流畅的语音内容。

### 功能特点

- 使用DashScope的cosyvoice-v2语音模型
- 支持多种音色选项
- 高质量、自然流畅的语音输出

### 设置步骤

1. 确保安装了必要的Python依赖：
   ```bash
   cd scripts
   pip install -r requirements.txt
   ```

2. 在`.env.local`文件中设置DashScope API密钥：
   ```
   TTS_API_KEY=您的DashScope API密钥
   ```

3. 使用编辑器界面中的"生成语音"按钮将文本转换为语音。

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.7 or higher) for TTS functionality
- API keys for LLM, TTS, and video services

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/storykura.git
   cd storykura
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file with your API keys:
   ```
   LLM_API_KEY=your_llm_api_key
   LLM_API_URL=your_llm_api_url
   LLM_MODEL_NAME=your_model_name
   TTS_API_KEY=your_tts_api_key
   TTS_API_URL=your_tts_api_url
   VIDEO_API_KEY=your_video_api_key
   VIDEO_API_URL=your_video_api_url
   ```

4. Install Python dependencies (for TTS functionality):
   ```
   pip install requests
   ```

### Running the Application

Start the development server:

```
npm run dev
```

Visit `http://localhost:3000` in your browser to use Storykura.

## Usage

1. Input your text content (paste or upload)
2. Click "Start Processing" to segment the script
3. Review and edit the generated conversational script
4. Generate voice for each segment
5. Choose a video generation mode
6. Preview and customize the content
7. Export the final video

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Pexels for providing the video search API
- OpenAI for text processing capabilities
