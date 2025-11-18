"use client";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null, // ✅ add image field
  });

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/products`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((f) => ({ ...f, image: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct
        ? `${API_URL}/products/${editingProduct.id}`
        : `${API_URL}/products`;

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      if (form.image) formData.append("image", form.image);

      const res = await fetch(url, {
        method,
        body: formData, // ✅ send as multipart/form-data
      });

      if (!res.ok) throw new Error("Failed to save product");
      await loadProducts();
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      await loadProducts();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleApprove(id) {
    try {
      const res = await fetch(`${API_URL}/products/${id}/approve`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to approve product");
      await loadProducts();
    } catch (err) {
      alert(err.message);
    }
  }

  function resetForm() {
    setForm({ name: "", category: "", price: "", stock: "", image: null });
    setEditingProduct(null);
    setIsFormOpen(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-800">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">All Products</h1>
        <button
          onClick={() => {
            setIsFormOpen(true);
            setEditingProduct(null);
          }}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          + Add Product
        </button>
      </div>

      {isLoading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Stock</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {products.length === 0 && !isLoading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((p, idx) => (
                <tr key={p.id ?? idx} className="hover:bg-gray-50">
                  <Td>
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded" />
                    )}
                  </Td>
                  <Td>{p.name ?? "Unnamed"}</Td>
                  <Td>{p.category ?? "-"}</Td>
                  <Td>${p.price ?? "-"}</Td>
                  <Td>{p.stock ?? "-"}</Td>
                  <Td>
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-medium ${
                        p.approved
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {p.approved ? "Approved" : "Pending"}
                    </span>
                  </Td>
                  <Td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct(p);
                          setForm({
                            name: p.name,
                            category: p.category,
                            price: p.price,
                            stock: p.stock,
                            image: null,
                          });
                          setIsFormOpen(true);
                        }}
                        className="rounded-md bg-blue-100 px-2 py-1 text-xs text-blue-600 hover:bg-blue-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="rounded-md bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200"
                      >
                        Delete
                      </button>
                      {!p.approved && (
                        <button
                          onClick={() => handleApprove(p.id)}
                          className="rounded-md bg-green-100 px-2 py-1 text-xs text-green-600 hover:bg-green-200"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </Td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <Input
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
              />
              <Input
                label="Price"
                name="price"
                value={form.price}
                onChange={handleChange}
                type="number"
              />
              <Input
                label="Stock"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                type="number"
              />
              <Input
                label="Image"
                name="image"
                onChange={handleChange}
                type="file"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  {editingProduct ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
      />
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
