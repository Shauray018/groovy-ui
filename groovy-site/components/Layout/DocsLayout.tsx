"use client"

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';

interface DocsLayoutProps {
  children: React.ReactNode;
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <ContentArea sidebarOpen={sidebarOpen}>
        {children}
      </ContentArea>
    </div>
  );
};

export default DocsLayout;