"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* 顶部导航栏 */}
      <header className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">Storykura</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/" className="text-gray-700 hover:text-blue-600">首页</Link></li>
            <li><Link href="/editor" className="text-gray-700 hover:text-blue-600">编辑器</Link></li>
            <li><Link href="/guide" className="text-gray-700 hover:text-blue-600">使用指南</Link></li>
            <li><Link href="/about" className="text-gray-700 hover:text-blue-600">关于</Link></li>
          </ul>
        </nav>
      </header>

      {/* 主页内容 */}
      <div className="flex flex-col items-center justify-center flex-grow w-full px-4 py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            将文字 <span className="text-blue-600">开口说话</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Storykura 可以将您的文本内容转换为流畅的讲解视频，
            <br/>轻松创建专业级演示内容，提升您的内容表达力。
          </p>
          <Link 
            href="/editor" 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            开始创作
          </Link>
        </div>

        {/* 功能特点 */}
        <div className="mt-24 w-full max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">主要功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="文本转语音" 
              description="将文本内容转换为自然流畅的语音，支持多种语音风格和语言。"
              icon="🔊"
            />
            <FeatureCard 
              title="智能视频匹配" 
              description="根据内容自动搜索匹配的视频素材，或生成精美的图文内容。"
              icon="🎬"
            />
            <FeatureCard 
              title="便捷导出分享" 
              description="一键导出高质量视频，支持多种分辨率和格式，方便发布到各大平台。"
              icon="📤"
            />
          </div>
        </div>

        {/* 使用流程 */}
        <div className="mt-24 w-full max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">使用流程</h2>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-4">
            <StepCard number={1} title="输入文本" description="粘贴文本或上传Markdown文件" />
            <div className="hidden md:block text-gray-400">→</div>
            <StepCard number={2} title="拆解脚本" description="AI自动将文本拆分为语义单元" />
            <div className="hidden md:block text-gray-400">→</div>
            <StepCard number={3} title="生成语音" description="将每个单元转换为自然语音" />
            <div className="hidden md:block text-gray-400">→</div>
            <StepCard number={4} title="匹配视频" description="为每个单元匹配合适的视频" />
            <div className="hidden md:block text-gray-400">→</div>
            <StepCard number={5} title="导出视频" description="合成并导出最终视频" />
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

// 功能卡片组件
function FeatureCard({ title, description, icon }: { title: string, description: string, icon: string }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

// 步骤卡片组件
function StepCard({ number, title, description }: { number: number, title: string, description: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col items-center text-center w-full md:w-40">
      <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mb-3">
        {number}
      </div>
      <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
}
