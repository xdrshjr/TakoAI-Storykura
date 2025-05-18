import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Storykura</h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-6">
            Turn Text into Talk – Effortlessly with Storykura
          </p>
        </div>

        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <textarea
            className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
            placeholder="Enter your text here to convert to speech..."
          />
          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center">
              <label className="mr-2 text-sm text-gray-600 dark:text-gray-300">Voice:</label>
              <select className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white">
                <option>Natural Female</option>
                <option>Natural Male</option>
                <option>Robot Voice</option>
              </select>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors">
              Convert to Speech
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-blue-500 text-4xl mb-4">🔊</div>
            <h3 className="text-xl font-semibold mb-2">Natural Voices</h3>
            <p className="text-gray-600 dark:text-gray-300">
              High-quality, lifelike voices that sound natural and engaging.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-blue-500 text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast Conversion</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Transform your text into speech in seconds with our efficient technology.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-blue-500 text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold mb-2">Use Anywhere</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Works on all devices with a responsive design optimized for any screen.
            </p>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm text-gray-600 dark:text-gray-400">
        <span>© {new Date().getFullYear()} Storykura</span>
        <a
          className="hover:underline hover:underline-offset-4"
          href="#"
        >
          About
        </a>
        <a
          className="hover:underline hover:underline-offset-4"
          href="#"
        >
          Privacy
        </a>
        <a
          className="hover:underline hover:underline-offset-4"
          href="#"
        >
          Contact
        </a>
      </footer>
    </div>
  );
}
