export default function handler(req, res) {
if (req.method !== 'POST') return res.status(405).end();
const { email, password } = req.body;


const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@printsquare.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';


if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
const token = 'ps_demo_token_' + Date.now();
return res.status(200).json({ token });
}


return res.status(401).json({ message: 'Invalid credentials' });
}