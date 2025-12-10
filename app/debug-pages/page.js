import dbConnect from '@/lib/mongodb';

import Page from '@/models/Page';

async function getPages() {
  await dbConnect();
  return await Page.find({}).sort({ createdAt: -1 });
}

export default async function DebugPages() {
  const pages = await getPages();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Page Debug Information</h1>
      
      {pages.map((page) => (
        <div key={page._id} className="mb-8 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold">{page.title}</h2>
          <p className="text-gray-600">Slug: /{page.slug}</p>
          <p className="text-gray-600">Published: {page.published ? 'Yes' : 'No'}</p>
          <p className="text-gray-600">Components: {page.components?.length || 0}</p>
          
          {page.components && page.components.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Components:</h3>
              <div className="space-y-2">
                {page.components.map((comp, index) => (
                  <div key={comp.id} className="p-2 bg-gray-100 rounded">
                    <p><strong>#{index + 1}</strong> {comp.type} (ID: {comp.id})</p>
                    <pre className="text-xs mt-1 overflow-auto">
                      {JSON.stringify(comp.content, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4">
            <a 
              href={`/${page.slug}`}
              className="text-blue-600 hover:text-blue-800 mr-4"
              target="_blank"
            >
              View Live
            </a>
            <a 
              href={`/admin/dashboard/pages/${page._id}`}
              className="text-green-600 hover:text-green-800"
            >
              Edit in Admin
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}