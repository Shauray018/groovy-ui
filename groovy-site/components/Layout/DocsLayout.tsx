"use client";

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';
import BreadcrumbNav from './BreadcrumbNav';

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex "> {/* pt-20 to account for fixed navbar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col">
        <BreadcrumbNav />
        <ContentArea sidebarOpen={sidebarOpen}>
          {children}
        </ContentArea>
      </div>
    </div>
  );
};

export default DocsLayout;