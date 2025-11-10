//components/pages/api/admin/users.js
import fs from 'fs';
import path from 'path';


const DATA_FILE = path.join(process.cwd(), 'data', 'adminUsers.json');


function readData() {
try {
const raw = fs.readFileSync(DATA_FILE, 'utf-8');
return JSON.parse(raw);
} catch (e) {
return [];
}
}


function writeData(data) {
fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}


export default function handler(req, res) {
if (req.method === 'GET') {
const data = readData();
res.status(200).json(data);
return;
}


if (req.method === 'POST') {
const data = readData();
const { name, email } = req.body;
const newUser = { id: 'u' + Date.now(), name, email };
data.unshift(newUser);
writeData(data);
res.status(201).json(newUser);
return;
}


if (req.method === 'DELETE') {
const { id } = req.query;
let data = readData();
data = data.filter((d) => d.id !== id);
writeData(data);
res.status(200).json({ success: true });
return;
}


res.status(405).end();
}