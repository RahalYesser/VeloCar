import React, { useState, useEffect } from "react";
import { initForum } from "../data/initForum";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import Footer from "../components/Footers/Footer.js";

export default function Forum() {
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [replyInputs, setReplyInputs] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const threadsPerPage = 5;

  useEffect(() => {
    initForum();
    const stored = JSON.parse(localStorage.getItem("forumThreads")) || [];
    setThreads(stored);
  }, []);

  const saveThreads = (newThreads) => {
    localStorage.setItem("forumThreads", JSON.stringify(newThreads));
    setThreads(newThreads);
  };

  const handlePost = () => {
    if (!title || !body) return alert("Please fill in all fields");
    const newThread = {
      id: Date.now(),
      title,
      body,
      author: "Guest",
      timestamp: new Date().toISOString(),
      replies: [],
    };
    saveThreads([newThread, ...threads]);
    setTitle("");
    setBody("");
    setCurrentPage(1); // Go to first page after new post
  };

  const handleReplyChange = (threadId, value) => {
    setReplyInputs({ ...replyInputs, [threadId]: value });
  };

  const handleReplySubmit = (threadId) => {
    const replyText = replyInputs[threadId];
    if (!replyText) return alert("Reply cannot be empty");

    const updatedThreads = threads.map((thread) =>
      thread.id === threadId
        ? {
            ...thread,
            replies: [
              ...thread.replies,
              {
                id: Date.now(),
                body: replyText,
                author: "Guest",
                timestamp: new Date().toISOString(),
              },
            ],
          }
        : thread
    );

    saveThreads(updatedThreads);
    setReplyInputs({ ...replyInputs, [threadId]: "" });
  };

  // Pagination logic
  const indexOfLast = currentPage * threadsPerPage;
  const indexOfFirst = indexOfLast - threadsPerPage;
  const currentThreads = threads.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(threads.length / threadsPerPage);
  const paginate = (pageNum) => setCurrentPage(pageNum);

  return (
    <>
      <IndexNavbar fixed />
      <div className="max-w-6xl my-24 mx-auto p-6 text-white ">
        <div className="p-6 max-w-6xl mx-auto text-gray-800">
          <h2 className="text-2xl font-bold text-center mb-1">
            COMMUNITY FORUM
          </h2>
          <p className="text-center text-sm mb-4">DISCUSSIONS</p>
          <div className="flex justify-center mb-8">
            <div className="w-[200px] h-1 bg-red-600 rounded-full" />
          </div>
        </div>

        {/* New Thread */}
        <div className="bg-gray-800 p-4 rounded mb-6">
          <h3 className="font-semibold mb-2">Start a Discussion</h3>
          <input
            className="w-full p-2 mb-2 rounded bg-gray-900 text-white"
            placeholder="Thread title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full p-2 mb-2 rounded bg-gray-900 text-white"
            placeholder="Write your post here..."
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button onClick={handlePost} className="bg-red-600 px-4 py-2 rounded">
            Post
          </button>
        </div>

        {/* Thread List */}
        {threads.length === 0 ? (
          <p>No threads yet. Start the conversation!</p>
        ) : (
          currentThreads.map((thread) => (
            <div key={thread.id} className="mb-6 bg-gray-700 p-4 rounded">
              <h4 className="font-bold text-lg">{thread.title}</h4>
              <p className="text-sm text-gray-300 mb-1">by {thread.author}</p>
              <p className="mb-2">{thread.body}</p>
              <small>{new Date(thread.timestamp).toLocaleString()}</small>

              {/* Replies */}
              <div className="ml-4 mt-4 space-y-2 border-l-2 border-red-500 pl-4">
                {thread.replies.length > 0 ? (
                  thread.replies.map((reply) => (
                    <div key={reply.id} className="bg-gray-600 p-2 rounded">
                      <p className="text-sm text-gray-200">{reply.body}</p>
                      <div className="text-xs text-gray-400">
                        {reply.author} –{" "}
                        {new Date(reply.timestamp).toLocaleString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No replies yet.</p>
                )}
              </div>

              {/* Reply Input */}
              <div className="mt-3">
                <textarea
                  value={replyInputs[thread.id] || ""}
                  onChange={(e) => handleReplyChange(thread.id, e.target.value)}
                  className="w-full p-2 rounded bg-gray-800 text-white mt-2"
                  placeholder="Write a reply..."
                  rows={2}
                />
                <button
                  onClick={() => handleReplySubmit(thread.id)}
                  className="bg-red-600 mt-2 px-3 py-1 rounded"
                >
                  Reply
                </button>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => paginate(num)}
                className={`px-3 py-1 rounded ${
                  num === currentPage
                    ? "bg-red-600 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
