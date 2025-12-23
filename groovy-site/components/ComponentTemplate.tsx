import React from 'react';
import { ComponentDefinition } from '../types/docs.types';

interface ComponentTemplateProps {
  component: ComponentDefinition;
}

const ComponentTemplate: React.FC<ComponentTemplateProps> = ({ component }) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">{component.title}</h1>
        <p className="text-lg text-muted-foreground">{component.description}</p>
      </div>

      {component.installation && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Installation</h2>
          <pre className="p-4 rounded border bg-muted/30 overflow-x-auto">
            <code>{component.installation}</code>
          </pre>
        </section>
      )}

      {component.usage && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Usage</h2>
          <pre className="p-4 rounded border bg-muted/30 overflow-x-auto">
            <code>{component.usage}</code>
          </pre>
        </section>
      )}

      {component.props && component.props.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Props</h2>
          <div className="border rounded overflow-hidden">
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

      {component.examples && component.examples.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Examples</h2>
          {component.examples.map((example, idx) => (
            <div key={idx} className="mb-6">
              <h3 className="text-lg font-medium mb-2">{example.title}</h3>
              <pre className="p-4 rounded border bg-muted/30 overflow-x-auto">
                <code>{example.code}</code>
              </pre>
            </div>
          ))}
        </section>
      )}

      {component.additionalContent && (
        <section>
          {component.additionalContent}
        </section>
      )}
    </div>
  );
};

export default ComponentTemplate;