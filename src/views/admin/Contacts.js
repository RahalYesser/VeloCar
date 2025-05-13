import React, { useState, useEffect } from "react";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [selected, setSelected] = useState(null);

  // Load contacts from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("contacts")) || [];
    setContacts(stored);
  }, []);

  const handleDelete = (indexToDelete) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      const updated = contacts.filter((_, i) => i !== indexToDelete);
      setContacts(updated);
      localStorage.setItem("contacts", JSON.stringify(updated));
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(contacts.length / rowsPerPage);
  const paginated = contacts.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 flex-grow flex-1">
            <h3 className="font-semibold text-base text-blueGray-700">
              Manage Contacts
            </h3>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">
                Name
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">
                Email
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">
                Message
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase whitespace-nowrap font-semibold text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((c, i) => (
              <tr key={i}>
                <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4 text-left">
                  {c.fullName || c.name}
                </td>
                <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">
                  {c.email}
                </td>
                <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">
                  {c.message.length > 30
                    ? c.message.slice(0, 30) + "…"
                    : c.message}
                </td>
                <td className="border-t-0 px-6 align-middle text-xs whitespace-nowrap p-4">
                  <button
                    onClick={() =>
                      setSelected({
                        ...c,
                        index: (currentPage - 1) * rowsPerPage + i,
                      })
                    }
                    className="text-blue-500 hover:underline mr-4"
                  >
                    View
                  </button>
                  <button
                    onClick={() =>
                      handleDelete((currentPage - 1) * rowsPerPage + i)
                    }
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-blueGray-100">
        <div className="flex-1 flex justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-indigo-500 text-white disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-indigo-500 text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-blueGray-600">
              Page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{totalPages}</span>
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md bg-white text-sm font-medium text-blueGray-700 hover:bg-blueGray-50 disabled:opacity-50"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === idx + 1
                      ? "bg-indigo-500 text-white"
                      : "bg-white text-blueGray-700 hover:bg-blueGray-50"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md bg-white text-sm font-medium text-blueGray-700 hover:bg-blueGray-50 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setSelected(null)}
          />
          <div className="bg-white rounded-lg overflow-hidden shadow-lg z-50 max-w-md w-full">
            <div className="px-6 py-4">
              <h4 className="text-xl font-semibold mb-2">Contact Details</h4>
              <p>
                <strong>Name:</strong> {selected.fullName || selected.name}
              </p>
              <p>
                <strong>Email:</strong> {selected.email}
              </p>
              <p className="mt-2">
                <strong>Message:</strong>
              </p>
              <p className="whitespace-pre-wrap">{selected.message}</p>
            </div>
            <div className="px-6 py-4 bg-blueGray-50 text-right">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-indigo-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
