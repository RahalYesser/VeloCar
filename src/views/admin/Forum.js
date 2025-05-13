import React, { useState, useEffect } from "react";

export default function Forum() {
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const threadsPerPage = 5;

  const indexOfLastThread = currentPage * threadsPerPage;
  const indexOfFirstThread = indexOfLastThread - threadsPerPage;
  const currentThreads = threads.slice(indexOfFirstThread, indexOfLastThread);

  const totalPages = Math.ceil(threads.length / threadsPerPage);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("forumThreads")) || [];
    setThreads(stored);
  }, []);

  const saveThreads = (newThreads) => {
    localStorage.setItem("forumThreads", JSON.stringify(newThreads));
    setThreads(newThreads);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this thread?")) return;
    const updated = threads.filter((t) => t.id !== id);
    saveThreads(updated);
    if (selectedThread?.id === id) setSelectedThread(null);
  };

  const handleAddThread = () => {
    if (!title || !body) return alert("Please fill in all fields");
    const newThread = {
      id: Date.now(),
      title,
      body,
      author: "Admin",
      timestamp: new Date().toISOString(),
      replies: [],
    };
    saveThreads([newThread, ...threads]);
    setTitle("");
    setBody("");
  };

  return (
    <div className="">
      <div className="relative flex flex-col break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t px-4 py-3 border-b border-gray-200 bg-gray-100">
          <h2 className="text-xl font-semibold text-blueGray-700">
            Forum Management
          </h2>
        </div>

        <div className="p-4 bg-white border-b border-gray-100">
          <h3 className="text-md font-semibold mb-2 text-blueGray-600">
            Add New Thread
          </h3>
          <input
            className="w-full px-3 py-2 mb-2 rounded border border-gray-300 text-sm"
            placeholder="Thread title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full px-3 py-2 mb-2 rounded border border-gray-300 text-sm"
            placeholder="Write your post here..."
            rows={3}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button
            onClick={handleAddThread}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            Add Thread
          </button>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="items-center w-full bg-transparent border-collapse text-sm">
            <thead>
              <tr className="bg-blueGray-100 text-blueGray-500 uppercase text-xs font-semibold border-b">
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Author</th>
                <th className="px-6 py-3 text-left">Replies</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentThreads.map((thread) => (
                <tr key={thread.id} className="border-t">
                  <td className="px-6 py-3">{thread.title}</td>
                  <td className="px-6 py-3">{thread.author}</td>
                  <td className="px-6 py-3">{thread.replies.length}</td>
                  <td className="px-6 py-3">
                    {new Date(thread.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-3 space-x-2">
                    <button
                      onClick={() => setSelectedThread(thread)}
                      className="bg-indigo-500 text-white px-3 py-1 rounded text-xs shadow hover:bg-indigo-600"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(thread.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs shadow hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {currentThreads.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-blueGray-400"
                  >
                    No forum threads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center px-4 py-2 border-t bg-gray-50">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 rounded text-sm bg-blueGray-100 hover:bg-blueGray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-blueGray-600 mx-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mx-1 rounded text-sm bg-blueGray-100 hover:bg-blueGray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {selectedThread && (
        <div className="relative flex flex-col break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t px-4 py-3 border-b border-gray-200 bg-gray-100">
            <h3 className="text-lg font-semibold text-blueGray-700">
              {selectedThread.title}
            </h3>
            <p className="text-sm text-blueGray-400">
              by {selectedThread.author}
            </p>
          </div>
          <div className="p-4">
            <p className="mb-4">{selectedThread.body}</p>
            <small className="block mb-4 text-blueGray-400">
              Posted: {new Date(selectedThread.timestamp).toLocaleString()}
            </small>

            <h4 className="font-semibold text-sm mb-2 text-blueGray-600">
              Replies
            </h4>
            {selectedThread.replies.length > 0 ? (
              selectedThread.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="bg-blueGray-100 p-3 mb-2 rounded text-sm border border-blueGray-100"
                >
                  <p>{reply.body}</p>
                  <div className="text-xs text-blueGray-400 mt-1">
                    {reply.author} —{" "}
                    {new Date(reply.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-blueGray-400">No replies yet.</p>
            )}

            <button
              onClick={() => setSelectedThread(null)}
              className="mt-4 bg-gray-300 text-blueGray-700 px-4 py-2 rounded text-sm hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
