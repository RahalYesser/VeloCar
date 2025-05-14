import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const saveOrders = (newOrders) => {
    localStorage.setItem("orders", JSON.stringify(newOrders));
    setOrders(newOrders);
  };

  const handleConfirm = (id) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, confirmed: true } : order
    );
    saveOrders(updated);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    const updated = orders.filter((order) => order.id !== id);
    saveOrders(updated);
  };

  return (
    <div className="">
      <div className="relative flex flex-col break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t px-4 py-3 border-b border-gray-200 bg-gray-100">
          <h2 className="text-xl font-semibold text-blueGray-700">Order Management</h2>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="items-center w-full bg-transparent border-collapse text-sm">
            <thead>
              <tr className="bg-blueGray-100 text-blueGray-500 uppercase text-xs font-semibold border-b">
                <th className="px-6 py-3 text-left">Car</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Contact</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="px-6 py-3">{order.carModel}</td>
                    <td className="px-6 py-3">{order.fullName}</td>
                    <td className="px-6 py-3">
                      <div>Email: {order.email}</div>
                      <div>Phone: {order.mobile}</div>
                      <div>Address: {order.address}</div>
                    </td>
                    <td className="px-6 py-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      {order.confirmed ? (
                        <span className="text-green-600 font-semibold">Confirmed</span>
                      ) : (
                        <span className="text-yellow-600 font-semibold">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-3 space-x-2">
                      {!order.confirmed && (
                        <button
                          onClick={() => handleConfirm(order.id)}
                          className="bg-green-500 text-white px-3 py-1 rounded text-xs shadow hover:bg-green-600"
                        >
                          Confirm
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs shadow hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-blueGray-400">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
