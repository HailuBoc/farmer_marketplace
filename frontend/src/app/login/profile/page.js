"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { User, ShoppingBag, LogOut, MapPin, Mail, Phone } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchOrders(parsedUser.id);
    } else {
      window.location.href = "/login";
    }
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/user/${userId}`
      );
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* LEFT SIDEBAR */}
        <aside className="bg-white p-6 rounded-2xl shadow-md">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 mb-3">
              <Image
                src="/profile1.png"
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-500 text-sm capitalize">{user.role}</p>

            <div className="mt-4 space-y-2 text-gray-600 text-sm w-full">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-600" /> {user.email}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-600" /> +251 9XX XXX XXX
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" /> Addis Ababa,
                Ethiopia
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="md:col-span-2 space-y-8">
          {/* Account Overview */}
          <section className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              Account Overview
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="font-medium">Full Name</p>
                <p>{user.name}</p>
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="font-medium">Role</p>
                <p className="capitalize">{user.role}</p>
              </div>
              <div>
                <p className="font-medium">Member Since</p>
                <p>{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </section>

          {/* CART SECTION */}

          {/* Order History */}
          <section className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-green-600" />
              Order History
            </h3>

            {orders.length === 0 ? (
              <p className="text-gray-500">No orders yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 text-left">Order ID</th>
                      <th className="p-3 text-left">Date</th>
                      <th className="p-3 text-left">Total</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-t hover:bg-gray-50 transition"
                      >
                        <td className="p-3">#{order.id}</td>
                        <td className="p-3">
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="p-3">${order.total}</td>
                        <td className={`p-3 font-medium`}>{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
