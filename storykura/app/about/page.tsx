"use client";

import Link from 'next/link';

export default function About() {
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
            <li><Link href="/about" className="text-gray-700 hover:text-blue-600 font-semibold">关于</Link></li>
          </ul>
        </nav>
      </header>

      {/* 主要内容 */}
      <div className="flex flex-col items-center justify-center flex-grow w-full px-4 py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl w-full">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">关于 Storykura</h1>
          
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">项目简介</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Storykura 是一款创新的文本转视频工具，旨在帮助内容创作者、教育工作者和演讲者将文字内容快速转化为引人入胜的视频讲解。
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              利用先进的人工智能技术，Storykura 能够自动将文本内容转换为口语化的讲解语句，配以合适的语音和视觉元素，一键生成专业的演示视频。
            </p>
            <p className="text-gray-700 leading-relaxed">
              无论是课程讲解、产品演示还是知识分享，Storykura 都能帮助您高效地制作出专业水准的内容。
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">核心特点</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="text-blue-600 mr-3 text-xl">✓</div>
                <div>
                  <h3 className="font-medium text-gray-800">智能文本处理</h3>
                  <p className="text-gray-600">自动将正式文本转化为自然流畅的口语表达，更适合听觉感知。</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-blue-600 mr-3 text-xl">✓</div>
                <div>
                  <h3 className="font-medium text-gray-800">自然语音合成</h3>
                  <p className="text-gray-600">使用高质量的语音合成技术，支持多种声音风格和情感表达。</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-blue-600 mr-3 text-xl">✓</div>
                <div>
                  <h3 className="font-medium text-gray-800">智能视频匹配</h3>
                  <p className="text-gray-600">根据内容自动搜索并匹配相关的视频素材，使讲解更加生动形象。</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-blue-600 mr-3 text-xl">✓</div>
                <div>
                  <h3 className="font-medium text-gray-800">图文讲解模式</h3>
                  <p className="text-gray-600">提供多种图文风格模板，呈现富有视觉冲击力的讲解画面。</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="text-blue-600 mr-3 text-xl">✓</div>
                <div>
                  <h3 className="font-medium text-gray-800">灵活的导出选项</h3>
                  <p className="text-gray-600">支持多种分辨率和格式的视频导出，适合各种平台的发布需求。</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">技术说明</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Storykura 采用 Next.js 和 React 开发，使用先进的 API 来处理文本、生成语音和搜索视频素材。
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              文本处理使用大型语言模型进行自然语言转换，语音合成采用专业的 TTS 引擎，视频搜索则通过 Pexels API 实现。
            </p>
            <p className="text-gray-700 leading-relaxed">
              完整的技术架构和API集成确保了高质量的输出结果和流畅的用户体验。
            </p>
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