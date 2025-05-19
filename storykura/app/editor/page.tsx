"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

// 定义脚本片段类型
interface ScriptSegment {
  id: string;
  originalText: string;
  lectureText: string;
  audioUrl: string | null;
  videoUrl: string | null;
  imageUrl: string | null;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

// 主编辑器页面组件
export default function Editor() {
  // 状态管理
  const [inputText, setInputText] = useState<string>('');
  const [segments, setSegments] = useState<ScriptSegment[]>([]);
  const [selectedSegmentId, setSelectedSegmentId] = useState<string | null>(null);
  const [videoMode, setVideoMode] = useState<'search' | 'lecture'>('search');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStatus, setProcessingStatus] = useState<string>('');
  
  // 获取选中的片段
  const selectedSegment = segments.find(seg => seg.id === selectedSegmentId);

  // 文件上传处理
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setInputText(text);
      };
      reader.readAsText(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/markdown': ['.md'],
      'text/plain': ['.txt']
    },
    multiple: false
  });

  // 处理脚本拆解
  const handleBreakdown = async () => {
    if (!inputText.trim()) {
      alert('请先输入或上传文本内容！');
      return;
    }

    setIsProcessing(true);
    setProcessingStatus('正在拆解脚本...');
    
    try {
      // 调用API进行文本拆解
      const response = await fetch('/api/text/breakdown', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      
      if (!response.ok) {
        throw new Error('API请求失败');
      }
      
      const data = await response.json();
      
      if (!data.segments || !Array.isArray(data.segments)) {
        throw new Error('返回的数据格式不符合预期');
      }
      
      // 转换API返回的结果为应用需要的格式
      const newSegments: ScriptSegment[] = data.segments.map((segment: any, index: number) => ({
        id: `segment-${Date.now()}-${index}`,
        originalText: segment.originalText,
        lectureText: segment.lectureText,
        audioUrl: null,
        videoUrl: null,
        imageUrl: null,
        status: 'completed'
      }));
      
      setSegments(newSegments);
      
      // 如果有片段，选中第一个
      if (newSegments.length > 0) {
        setSelectedSegmentId(newSegments[0].id);
      }
      
      setProcessingStatus('脚本拆解完成');
      
    } catch (error) {
      console.error('处理文本时出错:', error);
      setProcessingStatus('处理失败，请重试');
    } finally {
      setIsProcessing(false);
    }
  };

  // 处理生成语音
  const handleGenerateAudio = async (segmentId: string) => {
    const segment = segments.find(s => s.id === segmentId);
    if (!segment) return;
    
    // 更新状态
    const updatedSegments = segments.map(s => 
      s.id === segmentId ? { ...s, status: 'processing' as const } : s
    );
    setSegments(updatedSegments);
    setProcessingStatus(`正在为片段生成语音...`);
    
    try {
      // 实际项目中应该调用API
      // 这里模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟获取到语音URL
      const audioUrl = `/api/audio/${segmentId}.mp3`; // 这是模拟的URL
      
      const finalSegments = segments.map(s => 
        s.id === segmentId ? { 
          ...s, 
          audioUrl, 
          status: 'completed' as const 
        } : s
      );
      
      setSegments(finalSegments);
      setProcessingStatus('语音生成完成');
      
    } catch (error) {
      console.error('生成语音时出错:', error);
      
      const errorSegments = segments.map(s => 
        s.id === segmentId ? { ...s, status: 'error' as const } : s
      );
      
      setSegments(errorSegments);
      setProcessingStatus('语音生成失败，请重试');
    }
  };

  // 处理搜索视频
  const handleSearchVideo = async (segmentId: string) => {
    const segment = segments.find(s => s.id === segmentId);
    if (!segment) return;
    
    // 更新状态
    const updatedSegments = segments.map(s => 
      s.id === segmentId ? { ...s, status: 'processing' as const } : s
    );
    setSegments(updatedSegments);
    setProcessingStatus(`正在搜索视频片段...`);
    
    try {
      // 实际项目中应该调用Pexels API
      // 这里模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 模拟获取到视频URL
      const videoUrl = "https://player.vimeo.com/external/371911297.sd.mp4?s=7f9621be936a77f15322570806bbde367e54f2e0&profile_id=139&oauth2_token_id=57447761"; 
      
      const finalSegments = segments.map(s => 
        s.id === segmentId ? { 
          ...s, 
          videoUrl, 
          status: 'completed' as const 
        } : s
      );
      
      setSegments(finalSegments);
      setProcessingStatus('视频搜索完成');
      
    } catch (error) {
      console.error('搜索视频时出错:', error);
      
      const errorSegments = segments.map(s => 
        s.id === segmentId ? { ...s, status: 'error' as const } : s
      );
      
      setSegments(errorSegments);
      setProcessingStatus('视频搜索失败，请重试');
    }
  };

  // 界面渲染
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm py-3 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">Storykura</Link>
        </div>
        <nav className="flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">首页</Link>
          <Link href="/guide" className="text-gray-700 hover:text-blue-600">使用指南</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600">关于</Link>
        </nav>
      </header>

      {/* 主要内容区域 - 三列布局 */}
      <div className="flex flex-1 overflow-hidden">
        {/* 左侧栏 - 参数设置与输入 */}
        <div className="w-1/4 p-4 border-r border-gray-200 overflow-y-auto bg-white">
          <h2 className="text-xl font-semibold mb-4">内容输入</h2>
          
          {/* 文本输入区域 */}
          <div className="mb-4">
            <textarea
              className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="在此粘贴您的文本内容..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
          </div>
          
          {/* 文件上传区域 */}
          <div 
            {...getRootProps()} 
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 mb-4"
          >
            <input {...getInputProps()} />
            <p className="text-gray-500">拖放Markdown文件到此处，或点击上传</p>
          </div>
          
          {/* 视频模式选择 */}
          <div className="mb-4">
            <h3 className="text-md font-medium mb-2">视频生成模式</h3>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-2 rounded-lg ${videoMode === 'search' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setVideoMode('search')}
              >
                搜索视频片段
              </button>
              <button
                className={`px-3 py-2 rounded-lg ${videoMode === 'lecture' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setVideoMode('lecture')}
              >
                讲稿图文模式
              </button>
            </div>
          </div>
          
          {/* 开始拆解按钮 */}
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            onClick={handleBreakdown}
            disabled={isProcessing || !inputText.trim()}
          >
            {isProcessing ? '处理中...' : '开始拆解'}
          </button>
        </div>

        {/* 中间栏 - 脚本列表 */}
        <div className="w-1/3 p-4 border-r border-gray-200 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">脚本拆解</h2>
          
          {segments.length === 0 ? (
            <div className="text-center text-gray-500 mt-12">
              <p>尚无脚本内容</p>
              <p className="text-sm mt-2">请在左侧输入文本内容并点击"开始拆解"</p>
            </div>
          ) : (
            <div className="space-y-3">
              {segments.map((segment) => (
                <div 
                  key={segment.id}
                  className={`p-3 rounded-lg border ${selectedSegmentId === segment.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'} cursor-pointer hover:border-blue-300`}
                  onClick={() => setSelectedSegmentId(segment.id)}
                >
                  <div className="text-sm text-gray-500 mb-1">原文:</div>
                  <div className="mb-2">{segment.originalText}</div>
                  
                  {segment.lectureText && (
                    <>
                      <div className="text-sm text-gray-500 mb-1">讲课话术:</div>
                      <div className="text-gray-700">{segment.lectureText}</div>
                    </>
                  )}
                  
                  <div className="flex items-center mt-2 text-sm">
                    <span className={`mr-3 ${segment.audioUrl ? 'text-green-600' : 'text-gray-400'}`}>
                      🔊 语音{segment.audioUrl ? '已生成' : '未生成'}
                    </span>
                    <span className={`${segment.videoUrl || segment.imageUrl ? 'text-green-600' : 'text-gray-400'}`}>
                      {videoMode === 'search' ? '🎬 视频' : '🖼️ 图文'}
                      {segment.videoUrl || segment.imageUrl ? '已生成' : '未生成'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 右侧栏 - 预览与编辑 */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          <h2 className="text-xl font-semibold mb-4">预览与编辑</h2>
          
          {!selectedSegment ? (
            <div className="text-center text-gray-500 mt-12">
              <p>未选择脚本片段</p>
              <p className="text-sm mt-2">请在中间栏选择一个脚本片段进行预览和编辑</p>
            </div>
          ) : (
            <div>
              {/* 编辑区域 */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">编辑讲课话术</h3>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedSegment.lectureText}
                  onChange={(e) => {
                    const updatedSegments = segments.map(s => 
                      s.id === selectedSegment.id ? { ...s, lectureText: e.target.value } : s
                    );
                    setSegments(updatedSegments);
                  }}
                ></textarea>
              </div>
              
              {/* 语音控制 */}
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">语音控制</h3>
                <div className="flex items-center space-x-3">
                  {selectedSegment.audioUrl ? (
                    <>
                      <audio 
                        controls
                        src={selectedSegment.audioUrl}
                        className="flex-1"
                      />
                      <button 
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        onClick={() => handleGenerateAudio(selectedSegment.id)}
                      >
                        重新生成
                      </button>
                    </>
                  ) : (
                    <button 
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
                      onClick={() => handleGenerateAudio(selectedSegment.id)}
                      disabled={selectedSegment.status === 'processing'}
                    >
                      {selectedSegment.status === 'processing' ? '生成中...' : '生成语音'}
                    </button>
                  )}
                </div>
              </div>
              
              {/* 视频/图文预览与控制 */}
              <div>
                <h3 className="text-md font-medium mb-2">
                  {videoMode === 'search' ? '视频片段' : '图文内容'}
                </h3>
                
                {videoMode === 'search' ? (
                  // 视频模式
                  <div>
                    {selectedSegment.videoUrl ? (
                      <div className="mb-3">
                        <video 
                          controls
                          src={selectedSegment.videoUrl}
                          className="w-full h-64 object-cover rounded-lg bg-black"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                        <p className="text-gray-500">暂无视频</p>
                      </div>
                    )}
                    
                    <button 
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
                      onClick={() => handleSearchVideo(selectedSegment.id)}
                      disabled={selectedSegment.status === 'processing'}
                    >
                      {selectedSegment.status === 'processing' ? '搜索中...' : (selectedSegment.videoUrl ? '重新搜索视频' : '搜索视频')}
                    </button>
                  </div>
                ) : (
                  // 图文模式
                  <div>
                    {selectedSegment.imageUrl ? (
                      <div className="mb-3">
                        <img 
                          src={selectedSegment.imageUrl} 
                          alt="讲稿图文"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      </div>
                    ) : (
                      // 未生成时显示预览
                      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-3 border border-gray-300">
                        <div className="text-center p-6 max-w-md">
                          <h3 className="text-xl font-semibold mb-2">图文预览</h3>
                          <p className="text-gray-700">{selectedSegment.lectureText}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex space-x-3">
                      <select className="flex-1 border border-gray-300 rounded-lg p-2">
                        <option>白底黑字风格</option>
                        <option>PPT风格</option>
                        <option>黑板风格</option>
                        <option>渐变背景风格</option>
                      </select>
                      <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        生成图文
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 底部状态栏 */}
      <footer className="bg-white border-t border-gray-200 py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="text-gray-600">{processingStatus}</div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50">
              预览视频
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
              导出视频
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
} 