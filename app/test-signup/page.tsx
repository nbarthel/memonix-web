"use client";

import { useState } from "react";

export default function TestSignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!", { email, password });
    setMessage(`Form submitted! Email: ${email}, Password: ${password}`);
    alert(`Form submitted! Email: ${email}, Password length: ${password.length}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Test Signup Form</h1>

        {message && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                console.log("Email changed:", e.target.value);
                setEmail(e.target.value);
              }}
              className="w-full p-2 border rounded text-black"
              placeholder="test@example.com"
              required
            />
            <p className="text-xs mt-1">Current value: {email || "(empty)"}</p>
          </div>

          <div>
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                console.log("Password changed:", e.target.value.length, "chars");
                setPassword(e.target.value);
              }}
              className="w-full p-2 border rounded text-black"
              placeholder="password"
              required
            />
            <p className="text-xs mt-1">Current length: {password.length}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white p-3 rounded hover:bg-teal-600"
            onClick={() => console.log("Button clicked directly!")}
          >
            Submit Test Form
          </button>

          <div className="text-xs space-y-1 p-3 bg-gray-100 dark:bg-gray-700 rounded">
            <div>Email valid: {email.includes("@") ? "✓" : "✗"}</div>
            <div>Password length: {password.length}</div>
            <div>Form can submit: {(email.includes("@") && password.length > 0) ? "YES" : "NO"}</div>
          </div>
        </form>

        <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
          <p>Open browser console (F12) to see logs</p>
          <p className="mt-2">Try typing in the fields above. You should see:</p>
          <ul className="list-disc ml-5 mt-1">
            <li>Console logs when typing</li>
            <li>Current values updating below each field</li>
            <li>Alert when form submits</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
