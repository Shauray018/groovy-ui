"use client";

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <ContentArea sidebarOpen={sidebarOpen}>
        {children}
      </ContentArea>
    </div>
  );
};

export default DocsLayout;
