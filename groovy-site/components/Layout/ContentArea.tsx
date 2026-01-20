import React from 'react';

interface ContentAreaProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
}

const ContentArea: React.FC<ContentAreaProps> = ({ children, sidebarOpen }) => {
  return (
    <main className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'ml-0' : 'ml-0'}`}>
      <div className="max-w-4xl px-8 ml-80 mt-4 pb-16">
        {children}
      </div>
    </main>
  );
};

export default ContentArea;