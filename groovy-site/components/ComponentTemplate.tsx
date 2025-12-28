"use client"

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentDefinition } from '../types/docs.types';
import { CodeSnippet } from './code-snippet';
import { cn } from '@/lib/utils';

interface ComponentPreviewTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
  component: ComponentDefinition;
  slug: string;
  align?: "center" | "start" | "end";
}

export function ComponentPreviewTemplate({
  component,
  slug,
  className,
  align = "center",
  ...props
}: ComponentPreviewTemplateProps) {
  const [activeTab, setActiveTab] = React.useState("preview");

  const PreviewContent = React.useMemo(() => {
    // Check for video, gif, or image in component definition
    const mediaUrl = component.videoUrl || component.gifUrl || component.imageUrl;

    if (!mediaUrl) {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-muted-foreground">
            No preview media available for{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              {slug}
            </code>
          </p>
        </div>
      );
    }

    const isVideo = component.videoUrl;
    const isGif = component.gifUrl;
    const isImage = component.imageUrl;

    return (
      <div className={cn(
        "flex w-full h-full",
        align === "center" && "items-center justify-center",
        align === "start" && "items-start justify-start",
        align === "end" && "items-end justify-end"
      )}>
        <div className="relative">
          {/* Phone frame mockup */}
          <div className="relative w-[320px] h-[640px] bg-black rounded-[3rem] p-3 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
              {isVideo && (
                <video
                  src={component.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              )}
              {isGif && (
                <img
                  src={component.gifUrl}
                  alt={`${component.title} demo`}
                  className="w-full h-full object-cover"
                />
              )}
              {isImage && !isGif && (
                <img
                  src={component.imageUrl}
                  alt={`${component.title} preview`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl"></div>
          </div>
        </div>
      </div>
    );
  }, [component, slug, align]);

  // Get source code from component definition or fallback
  const sourceCode = component.sourceCode || `// Source code for ${component.title}\n// Add sourceCode property to component definition`;

  return (
    <div className={cn("space-y-8 h-auto", className)} {...props}>
      {/* Header Section */}
      <div>
        <h1 className="text-4xl font-bold mb-4">{component.title}</h1>
        <p className="text-lg text-muted-foreground">{component.description}</p>
      </div>

      {/* Preview/Code Tabs */}
      <section>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="relative w-full">
          <div className="flex items-center justify-between">
            <TabsList className="w-full justify-start rounded-none p-0 h-9 bg-transparent space-x-3 px-3">
              <TabsTrigger
                value="preview"
                className="relative text-base rounded-none border-b-transparent bg-transparent px-0 font-semibold text-muted-foreground shadow-none transition-colors duration-300 ease-out hover:text-foreground data-[state=active]:font-semibold data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent"
              >
                Demo
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className="relative text-base rounded-none border-b-transparent bg-transparent px-0 font-semibold text-muted-foreground shadow-none transition-colors duration-300 ease-out hover:text-foreground data-[state=active]:font-semibold data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:bg-transparent"
              >
                Code
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="preview" className="border border-border rounded-2xl mt-4">
            <div className="w-full flex items-center justify-center rounded-2xl min-h-[680px] overflow-hidden relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
              {PreviewContent}
            </div>
          </TabsContent>
          
          <TabsContent value="code" className="mt-4">
            <CodeSnippet title={slug + ".tsx"} code={sourceCode} language="tsx" />
          </TabsContent>
        </Tabs>
      </section>

      {/* Installation */}
      {component.installation && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Installation</h2>
          <CodeSnippet title="Terminal" code={component.installation} language="bash" />
        </section>
      )}

      {/* Dependencies */}
      {component.dependencies && component.dependencies.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Dependencies</h2>
          <div className="flex flex-wrap gap-2">
            {component.dependencies.map((dep, idx) => (
              <code key={idx} className="px-3 py-1 bg-muted rounded-md text-sm font-mono">
                {dep}
              </code>
            ))}
          </div>
        </section>
      )}

      {/* Usage */}
      {component.usage && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Usage</h2>
          <CodeSnippet title="Usage Example" code={component.usage} language="tsx" />
        </section>
      )}

      {/* Props Table */}
      {component.props && component.props.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Props</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="border-b bg-muted/30">
                <tr>
                  <th className="text-left p-3 font-semibold">Prop</th>
                  <th className="text-left p-3 font-semibold">Type</th>
                  <th className="text-left p-3 font-semibold">Default</th>
                  <th className="text-left p-3 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {component.props.map((prop, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="p-3 font-mono text-sm">{prop.name}</td>
                    <td className="p-3 text-sm">{prop.type}</td>
                    <td className="p-3 text-sm">{prop.default || '-'}</td>
                    <td className="p-3 text-sm">{prop.description || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Examples */}
      {component.examples && component.examples.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Examples</h2>
          {component.examples.map((example, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-lg font-medium mb-2">{example.title}</h3>
              <CodeSnippet title={`Example ${idx + 1}`} code={example.code} language="tsx" />
            </div>
          ))}
        </section>
      )}

      {/* Additional Content */}
      {component.additionalContent && (
        <section>
          {component.additionalContent}
        </section>
      )}
    </div>
  );
}