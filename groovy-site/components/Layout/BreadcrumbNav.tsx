"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Custom label mapping
const LABEL_MAP: Record<string, string> = {
  'docs': 'Documentation',
  'introduction': 'Introduction',
  'installation': 'Installation',
  // Add more custom labels as needed
};

const BreadcrumbNav = () => {
  const pathname = usePathname();
  
  // Split pathname and filter empty strings
  const pathSegments = pathname.split('/').filter(segment => segment);
  
  // Don't show breadcrumbs on homepage
  if (pathSegments.length === 0) return null;

  // Generate breadcrumb items
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = LABEL_MAP[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    return { label, href, isLast: index === pathSegments.length - 1 };
  });

  // Special case: if we're on /docs (page.tsx), add "Introduction" as a separate item
  if (pathname === '/docs') {
    breadcrumbs.push({
      label: 'Introduction',
      href: '/docs',
      isLast: true
    });
    // Update the previous item to not be last
    if (breadcrumbs.length > 1) {
      breadcrumbs[breadcrumbs.length - 2].isLast = false;
    }
  }

  return (
    <div className="bg-inherit">
      <div className="max-w-4xl px-8 ml-80 pt-3">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                <BreadcrumbItem>
                  {crumb.isLast ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!crumb.isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default BreadcrumbNav;