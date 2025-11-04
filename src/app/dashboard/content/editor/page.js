"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PageEditor from "@/components/PageEditor";

// 🔹 Main component now wraps inner editor in Suspense
export default function ContentEditor() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading editor...</div>}>
      <ContentEditorInner />
    </Suspense>
  );
}

// 🔹 All logic moved inside a new inner component
function ContentEditorInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get("slug");
  const isNew = searchParams.get("new") === "true";

  const [pageData, setPageData] = useState(null);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug && !isNew) {
      fetchPageData();
    } else {
      setLoading(false);
    }
  }, [slug, isNew]);

  const fetchPageData = async () => {
    if (!slug || slug === "null") {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/admin/content/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPageData(data);
        setSections(data.sections || []);
        if (data.sections?.length > 0) {
          setSelectedSection(data.sections[0].sectionId);
        } else {
          const defaultSection = { sectionId: "hero", content: {}, images: [] };
          setSections([defaultSection]);
          setSelectedSection("hero");
        }
      } else {
        const defaultSections = [
          { sectionId: "hero", content: {}, images: [] },
          { sectionId: "content", content: {}, images: [] },
        ];
        setSections(defaultSections);
        setSelectedSection("hero");
      }
    } catch (error) {
      console.error("Error fetching page data:", error);
      const defaultSections = [
        { sectionId: "hero", content: {}, images: [] },
        { sectionId: "content", content: {}, images: [] },
      ];
      setSections(defaultSections);
      setSelectedSection("hero");
    } finally {
      setLoading(false);
    }
  };

  const addSection = () => {
    const sectionId = prompt("Enter section ID (e.g., hero, pricing):");
    if (sectionId && !sections.find((s) => s.sectionId === sectionId)) {
      const newSection = { sectionId, content: {}, images: [] };
      const updatedSections = [...sections, newSection];
      setSections(updatedSections);
      setSelectedSection(sectionId);
    } else if (sectionId) {
      alert("Section ID already exists!");
    }
  };

  const createNewPage = async (pageData) => {
    try {
      const response = await fetch("/api/admin/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pageData),
      });

      if (response.ok) {
        const newPage = await response.json();
        router.push(`/dashboard/content/editor?slug=${newPage.slug}`);
      } else {
        alert("Error creating page");
      }
    } catch (error) {
      console.error("Error creating page:", error);
      alert("Error creating page");
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isNew) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Page</h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Page Slug</label>
              <input
                type="text"
                placeholder="about-us, services, etc."
                className="w-full p-3 border rounded-lg"
                id="newPageSlug"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Page Title</label>
              <input
                type="text"
                placeholder="About Us"
                className="w-full p-3 border rounded-lg"
                id="newPageTitle"
              />
            </div>
            <button
              onClick={() => {
                const slug = document.getElementById("newPageSlug").value.trim();
                const title = document.getElementById("newPageTitle").value.trim();

                if (!slug) {
                  alert("Please enter a page slug");
                  return;
                }

                createNewPage({
                  slug,
                  title: title || slug.charAt(0).toUpperCase() + slug.slice(1),
                  description: `Content for ${slug}`,
                  sections: [{ sectionId: "hero", content: {}, images: [] }],
                  isActive: true,
                });
              }}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
            >
              Create Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!slug) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">No Page Selected</h1>
        <p className="text-gray-600 mb-4">
          Please select a page to edit or create a new one.
        </p>
        <button
          onClick={() => router.push("/dashboard/content/editor?new=true")}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
        >
          Create New Page
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Editing: {slug}</h1>
          <p className="text-gray-600 mt-1">
            {pageData?.title || "Page title not set"}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addSection}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            + Add Section
          </button>
          <button
            onClick={() => router.push("/dashboard/content/editor?new=true")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            New Page
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Section Navigation */}
        <div className="w-64 bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold mb-4">Sections</h3>
          <div className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.sectionId}
                onClick={() => setSelectedSection(section.sectionId)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedSection === section.sectionId
                    ? "bg-indigo-500 text-white"
                    : "bg-white hover:bg-gray-100 text-gray-800"
                }`}
              >
                {section.sectionId}
              </button>
            ))}
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1">
          {selectedSection ? (
            <PageEditor pageSlug={slug} sectionId={selectedSection} />
          ) : (
            <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-6 text-center">
              <p className="text-yellow-800">
                Select a section to edit or create a new section.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
