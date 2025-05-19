"use client";

import Link from 'next/link';

export default function Guide() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* 顶部导航栏 */}
      <header className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">Storykura</Link>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="text-gray-700 hover:text-blue-600">首页</Link></li>
            <li><Link href="/editor" className="text-gray-700 hover:text-blue-600">编辑器</Link></li>
            <li><Link href="/guide" className="text-gray-700 hover:text-blue-600 font-semibold">使用指南</Link></li>
            <li><Link href="/about" className="text-gray-700 hover:text-blue-600">关于</Link></li>
          </ul>
        </nav>
      </header>

      {/* 主要内容 */}
      <div className="flex flex-col items-center justify-center flex-grow w-full px-4 py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl w-full">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Storykura 使用指南</h1>
          
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">快速入门</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Storykura 的设计理念是简单易用，让您能够快速将文本内容转换为视频讲解。以下是使用 Storykura 的基本流程：
            </p>
            
            <ol className="space-y-6 mb-4">
              <li className="flex">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">1</div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">输入文本内容</h3>
                  <p className="text-gray-600">
                    在编辑器页面左侧的文本框中粘贴您的文本内容，或者通过上传功能导入 Markdown (.md) 或文本 (.txt) 文件。
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">2</div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">选择视频生成模式</h3>
                  <p className="text-gray-600">
                    选择"搜索视频片段"模式（系统会自动匹配相关视频）或"讲稿图文模式"（生成文字与背景的组合画面）。
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">3</div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">拆解脚本</h3>
                  <p className="text-gray-600">
                    点击"开始拆解"按钮，系统会自动将您的文本按语义单位拆分为多个脚本片段，并转换为讲课风格的语言。
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">4</div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">编辑和生成语音</h3>
                  <p className="text-gray-600">
                    在中间栏中选择脚本片段，然后在右侧编辑区域修改文本内容（如需），并点击"生成语音"按钮为每个片段生成语音。
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">5</div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">生成视频内容</h3>
                  <p className="text-gray-600">
                    根据您选择的模式，点击"搜索视频"或"生成图文"按钮为每个片段创建视觉内容。
                  </p>
                </div>
              </li>
              
              <li className="flex">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 mt-1">6</div>
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-2">预览和导出</h3>
                  <p className="text-gray-600">
                    在完成所有片段的处理后，您可以预览完整视频，并通过底部的"导出视频"按钮将其保存为标准视频格式。
                  </p>
                </div>
              </li>
            </ol>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">高级功能</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-2">语音风格选择</h3>
              <p className="text-gray-700 mb-4">
                Storykura 提供多种语音风格选项，以适应不同的内容需求：
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>默认语音 - 中性，适合大多数内容</li>
                <li>男声/女声 - 根据内容性质选择合适的声音</li>
                <li>激情讲解 - 适合动态内容，如体育或娱乐新闻</li>
                <li>温和叙述 - 适合教育内容或知识分享</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-2">图文模板</h3>
              <p className="text-gray-700 mb-4">
                在"讲稿图文模式"下，您可以选择以下几种模板风格：
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>白底黑字 - 简洁清晰，适合正式内容</li>
                <li>PPT风格 - 模拟演示文稿，专业美观</li>
                <li>黑板风格 - 仿教学黑板，适合教育内容</li>
                <li>渐变背景 - 现代动感的设计，适合年轻受众</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">视频导出设置</h3>
              <p className="text-gray-700 mb-4">
                导出视频时，您可以自定义以下参数：
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-1">
                <li>分辨率 - 720p、1080p或4K</li>
                <li>画面比例 - 16:9（横屏）、9:16（竖屏）或1:1（方形）</li>
                <li>视频格式 - MP4（H.264编码）</li>
                <li>背景音乐 - 可选择添加轻音乐背景</li>
                <li>品牌水印 - 可添加您的Logo作为视频水印</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">常见问题</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">如何获得最佳效果？</h3>
                <p className="text-gray-600">
                  为了获得最佳效果，建议输入内容结构清晰，段落分明。每个段落最好围绕一个主题或观点展开，这样系统能更好地拆分和处理您的内容。
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">为什么找不到合适的视频素材？</h3>
                <p className="text-gray-600">
                  系统基于文本内容的关键词搜索视频。如果找不到合适的素材，您可以尝试编辑讲解文本，使用更具体、更常见的描述词汇，或者切换到"讲稿图文模式"。
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">如何处理专业术语较多的内容？</h3>
                <p className="text-gray-600">
                  对于包含较多专业术语的内容，系统会尽量保留原意。您也可以在拆解后手动编辑各个片段，确保专业术语的准确表达。
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-800 mb-2">支持哪些语言？</h3>
                <p className="text-gray-600">
                  目前 Storykura 主要支持中文内容处理。我们正在努力扩展对其他语言的支持，未来版本将增加更多语言选项。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部信息 */}
      <footer className="w-full bg-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold text-gray-700">Storykura</h3>
            <p className="text-gray-500">Turn Text into Talk – Effortlessly.</p>
          </div>
          <div className="flex space-x-8">
            <Link href="/terms" className="text-gray-600 hover:text-blue-600">条款</Link>
            <Link href="/privacy" className="text-gray-600 hover:text-blue-600">隐私</Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600">联系我们</Link>
          </div>
        </div>
        <div className="text-center mt-6 text-gray-500 text-sm">
          © {new Date().getFullYear()} Storykura. All rights reserved.
        </div>
      </footer>
    </main>
  );
} 