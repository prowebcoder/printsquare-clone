'use client';
import React, { useState } from 'react';


export default function LoginPage() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState(null);


function submit(e) {
e.preventDefault();
fetch('/api/admin/login', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, password }),
})
.then((r) => r.json())
.then((data) => {
if (data?.token) {
localStorage.setItem('ps_admin_token', data.token);
window.location.href = '/dashboard';
} else {
setError(data?.message || 'Login failed');
}
});
}


return (
<div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
<form onSubmit={submit} className="w-full max-w-md bg-white p-6 rounded shadow">
<h2 className="text-xl font-semibold mb-4">Admin login</h2>
{error && <div className="mb-2 text-red-600">{error}</div>}
<input required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" className="w-full px-3 py-2 border rounded mb-2" />
<input required value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="w-full px-3 py-2 border rounded mb-4" />
<button className="w-full px-3 py-2 bg-blue-600 text-white rounded">Sign in</button>
</form>
</div>
);
}