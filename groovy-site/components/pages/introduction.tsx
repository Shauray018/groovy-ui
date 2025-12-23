import React from 'react';

export const IntroductionPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-4xl font-bold">Introduction</h1>
    <p className="text-lg">
      Welcome to the documentation for our React Native UI Library.
    </p>
    <h2 className="text-2xl font-semibold mt-8">Features</h2>
    <ul className="space-y-2">
      <li>• Beautiful, modern components</li>
      <li>• TypeScript support</li>
      <li>• Customizable themes</li>
      <li>• Easy CLI integration</li>
    </ul>
  </div>
);
