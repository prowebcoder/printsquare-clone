let pages = [
  { id: 1, title: "About Us", slug: "about-us", content: "About page content" },
  { id: 2, title: "Contact", slug: "contact", content: "Contact page content" },
];

// PUT → edit page
export async function PUT(req, { params }) {
  const id = Number(params.id);
  const updated = await req.json();

  pages = pages.map((p) => (p.id === id ? { ...p, ...updated } : p));

  return new Response(JSON.stringify({ message: "Page updated" }), { status: 200 });
}

// DELETE → remove page
export async function DELETE(req, { params }) {
  const id = Number(params.id);
  pages = pages.filter((p) => p.id !== id);

  return new Response(JSON.stringify({ message: "Page deleted" }), { status: 200 });
}
