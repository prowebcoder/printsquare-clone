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
    <div className="w-full mt-4 md:mt-6 px-4 sm:px-6">
      <div className="grid grid-cols-2 md:flex md:flex-nowrap gap-2 md:gap-6 md:justify-center">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;

          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={`
                px-3 py-3 md:px-6 md:py-3 rounded-md text-sm md:text-base font-medium border 
                text-center transition-all duration-200 active:scale-95
                ${isActive 
                  ? 'bg-[#E21B36] text-white border-[#E21B36] shadow-sm md:shadow-none' 
                  : 'bg-transparent text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
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