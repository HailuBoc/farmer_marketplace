"use client";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_URL}/orders`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
        setOrders(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">Orders</h1>
      {isLoading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <Th>Order ID</Th>
              <Th>Customer</Th>
              <Th>Status</Th>
              <Th>Total</Th>
              <Th>Date</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {orders.length === 0 && !isLoading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  No orders yet.
                </td>
              </tr>
            ) : (
              orders.map((o, idx) => (
                <tr key={o.id ?? idx} className="hover:bg-gray-50">
                  <Td>{o.id ?? "-"}</Td>
                  <Td>{o.customerName ?? "N/A"}</Td>
                  <Td>
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-medium ${
                        o.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : o.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {o.status ?? "Unknown"}
                    </span>
                  </Td>
                  <Td>${o.total ?? 0}</Td>
                  <Td>{new Date(o.createdAt).toLocaleDateString()}</Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }) {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
      {children}
    </th>
  );
}

function Td({ children }) {
  return (
    <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
      {children}
    </td>
  );
}
