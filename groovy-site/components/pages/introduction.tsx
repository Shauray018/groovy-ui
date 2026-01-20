import React from 'react';

export const IntroductionPage: React.FC = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-semibold ">
      Introduction
    </h1>

    <p className="text-base text-muted-foreground leading-relaxed">
      Welcome to a community-driven React Native UI library built to make
      beautiful apps easier to create. High-quality UI components in the
      React Native ecosystem are still surprisingly limited — this project
      aims to change that.
    </p>

    <p className="text-base text-muted-foreground leading-relaxed">
      Our goal is simple: give everyone access to clean, modern, and reusable
      components so you can ship great-looking React Native apps without
      spending hours on UI from scratch.
    </p>

    <h2 className="text-xl font-medium mt-8">
      Features
    </h2>

    <ul className="space-y-2 text-muted-foreground">
      <li>• Modern, production-ready components</li>
      <li>• First-class TypeScript support</li>
      <li>• Easily customizable themes</li>
      <li>• Simple CLI-based setup</li>
    </ul>
  </div>
);
