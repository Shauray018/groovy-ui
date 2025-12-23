import React from 'react';

interface ContentAreaProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
}

const ContentArea: React.FC<ContentAreaProps> = ({ children, sidebarOpen }) => {
  return (
    <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
      <div className="max-w-4xl mx-auto p-8">
        {children}
      </div>
    </main>
  );
};

export default ContentArea;
