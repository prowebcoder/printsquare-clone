let pages = [
  { id: 1, title: "About Us", slug: "about-us", content: "About page content" },
  { id: 2, title: "Contact", slug: "contact", content: "Contact page content" },
];

// GET → list all pages
export async function GET() {
  return new Response(JSON.stringify(pages), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// POST → add new page
export async function POST(req) {
  const body = await req.json();
  const newPage = {
    id: Date.now(),
    title: body.title,
    slug: body.slug,
    content: body.content,
  };
  pages.push(newPage);

  return new Response(JSON.stringify(newPage), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}