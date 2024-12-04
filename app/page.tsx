"use client";

import { useState } from "react";

export default function Home() {
  const [summaryStyle, setSummaryStyle] = useState("normal");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Notes Crunch
          </h1>
          <p className="text-center text-gray-400 mt-4 max-w-2xl mx-auto">
            Transform your documents into clear, concise summaries. Upload any PDF and get an AI-powered summary tailored to your needs - from quick overviews to detailed analyses.
          </p>
        </header>

        <main className="flex flex-col items-center gap-8">
          <div className="w-full max-w-xl">
            <div className="flex justify-between items-center mb-2">
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-gray-300"
              >
                Upload your PDF
              </label>
              {selectedFile && (
                <button
                  onClick={() => setSelectedFile(null)}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Clear file
                </button>
              )}
            </div>
            <label
              htmlFor="file-upload"
              className={`mt-1 flex justify-center items-center px-6 py-8 border-2 border-dashed rounded-lg hover:border-blue-500 transition-colors cursor-pointer ${selectedFile ? 'border-blue-500 bg-gray-800' : 'border-gray-600'}`}
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
              <div className="text-center">
                {!selectedFile ? (
                  <>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 mb-4"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-sm text-gray-400">
                      Click to upload or drag and drop your PDF file
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      PDF up to 10MB
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-300">
                      Selected file: <span className="text-blue-500">{selectedFile.name}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Click to choose a different file
                    </p>
                  </>
                )}
              </div>
            </label>
          </div>

          <div className="w-full max-w-xl">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Choose Your Summary Style
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                className={`p-4 text-center border border-gray-600 rounded-lg hover:border-blue-500 hover:bg-gray-800 transition-all ${summaryStyle === "brief" ? "border-blue-500 bg-gray-800" : ""}`}
                onClick={() => setSummaryStyle("brief")}
              >
                Brief
                <p className="text-xs text-gray-400 mt-1">Perfect for quick insights</p>
              </button>
              <button
                className={`p-4 text-center border border-gray-600 rounded-lg hover:border-blue-500 hover:bg-gray-800 transition-all ${summaryStyle === "normal" ? "border-blue-500 bg-gray-800" : ""}`}
                onClick={() => setSummaryStyle("normal")}
              >
                Normal
                <p className="text-xs text-gray-400 mt-1">Ideal for most needs</p>
              </button>
              <button
                className={`p-4 text-center border border-gray-600 rounded-lg hover:border-blue-500 hover:bg-gray-800 transition-all ${summaryStyle === "detailed" ? "border-blue-500 bg-gray-800" : ""}`}
                onClick={() => setSummaryStyle("detailed")}
              >
                Detailed
                <p className="text-xs text-gray-400 mt-1">Deep dive into content</p>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
