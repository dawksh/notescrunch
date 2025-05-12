"use client";

import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Home() {
  const [summaryStyle, setSummaryStyle] = useState("normal");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [quiz, setQuiz] = useState<string>("");
  const [quizOpen, setQuizOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mockSummary, setMockSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSummarize = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setError("");

    const formData = new FormData();
    // Change "file" to "pdf" to match the backend expectation
    formData.append("pdf", selectedFile);
    formData.append("summaryStyle", summaryStyle);

    try {
      const response = await fetch("http://localhost:8080/api/summarize-pdf", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to summarize document");
      }

      const data = await response.json();
      setMockSummary(data.summary);
      setQuiz(data.quiz);
      setIsModalOpen(true);
    } catch (error) {
      setError(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

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

          {error && (
            <div className="w-full max-w-xl bg-red-900/30 border border-red-500 p-4 rounded-lg text-red-300">
              <p className="font-medium">Error: {error}</p>
            </div>
          )}

          <button
            onClick={handleSummarize}
            disabled={!selectedFile || isLoading}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${!selectedFile || isLoading
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
          >
            {isLoading ? "Processing..." : "Summarize"}
          </button>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-auto">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold">Summary</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-grow">
              <div className="prose prose-invert max-w-none">
                <Markdown remarkPlugins={[remarkGfm]}>{quizOpen ? quiz : mockSummary}</Markdown>
              </div>
            </div>

            <div className="p-4 border-t border-gray-700 flex gap-4">
              <button
                className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                onClick={() => {
                  setQuizOpen(quizOpen => !quizOpen);
                }}
              >
                {quizOpen ? "Hide Quiz" : "Show Quiz"}
              </button>
              <button
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                onClick={() => {
                  const blob = new Blob([mockSummary], { type: 'text/plain' });
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', 'summary.txt');
                  document.body.appendChild(link);
                  link.click();
                  link.remove();
                  window.URL.revokeObjectURL(url);
                }}
              >
                Download Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}