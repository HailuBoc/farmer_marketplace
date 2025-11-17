"use client";
import { useEffect, useState } from "react";

export default function FarmersPage() {
  const [farmers, setFarmers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:5000/farmers", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch farmers");
        setFarmers(await res.json());
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
      <h1 className="mb-4 text-2xl font-semibold text-gray-900">Farmers</h1>
      {isLoading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <Th>Name</Th>
              <Th>Location</Th>
              <Th>Joined</Th>
              <Th>Products</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {farmers.length === 0 && !isLoading ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  No farmers found.
                </td>
              </tr>
            ) : (
              farmers.map((f, idx) => (
                <tr key={f.id ?? idx} className="hover:bg-gray-50">
                  <Td>{f.name ?? "Unknown"}</Td>
                  <Td>{f.location ?? "-"}</Td>
                  <Td>{new Date(f.createdAt).toLocaleDateString()}</Td>
                  <Td>{f.productCount ?? 0}</Td>
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
