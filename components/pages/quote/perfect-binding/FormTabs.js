'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FormTabs() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Perfect Binding', path: '/perfect-binding' },
    { name: 'Saddle Stitching', path: '/saddle-stitching' },
    { name: 'Hardcover Book', path: '/hardcover-book' },
    { name: 'Wire Binding', path: '/wire-binding' },
  ];

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="flex gap-6">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;

          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`px-6 py-3 rounded-md text-base font-medium border 
                ${isActive 
                  ? 'bg-[#E21B36] text-white border-[#E21B36]' 
                  : 'bg-transparent text-black border-gray-400'
                }
              `}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
