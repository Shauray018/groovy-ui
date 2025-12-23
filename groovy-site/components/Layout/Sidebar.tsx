// components/Layout/Sidebar.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
import { DOCS_CONFIG } from '../../config/docs.config';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    Object.keys(DOCS_CONFIG).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  );

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isOpen) {
    return (
      <button onClick={onToggle} className="fixed top-4 left-4 z-50 p-2 border rounded">
        <Menu className="w-5 h-5" />
      </button>
    );
  }

  return (
    <aside className="w-64 border-r min-h-screen sticky top-0 overflow-y-auto">
      <div className="p-4 border-b flex items-center justify-between">
        <h1 className="text-xl font-bold">Docs</h1>
        <button onClick={onToggle} className="p-1">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <nav className="p-4">
        {Object.entries(DOCS_CONFIG).map(([sectionKey, section]) => (
          <div key={sectionKey} className="mb-6">
            <button
              onClick={() => toggleSection(sectionKey)}
              className="flex items-center justify-between w-full text-sm font-semibold mb-2"
            >
              <span>{section.title}</span>
              {expandedSections[sectionKey] ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {expandedSections[sectionKey] && (
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const href = item.slug === 'introduction' ? '/docs' : `/docs/${item.slug}`;
                  const isActive = pathname === href;
                  
                  return (
                    <li key={item.slug}>
                      <Link
                        href={href}
                        className={`block w-full text-left px-3 py-2 rounded text-sm ${
                          isActive
                            ? 'bg-muted font-medium'
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;