// Registry types
export interface RegistryFile {
  type: 'registry:ui' | 'registry:example' | 'registry:hook' | 'registry:theme';
  path: string;
  target: string;
  content?: string;
}

export interface RegistryComponent {
  name: string;
  description: string;
  type: 'registry:ui' | 'registry:example' | 'registry:hook' | 'registry:theme';
  registryDependencies?: string[];
  dependencies?: string[];
  hooks?: string[];
  theme?: string[];
  files: RegistryFile[];
  preview?: {
    light: string;
    dark: string;
  };
}

export type Registry = Record<string, RegistryComponent>;

// Base URL for fetching component templates
const REGISTRY_BASE_URL = 'https://raw.githubusercontent.com/yourusername/groovy-ui/main';

// Import all registry configs
// import { alertRegistry } from './components/alert.js';
import { buttonRegistry } from './components/button.js';
// ... import other component registries

// Combine all registries
export const REGISTRY: Registry = {
//   ...alertRegistry,
  ...buttonRegistry,
  // ... spread other registries
};

// Helper functions
export function getComponent(name: string): RegistryComponent | undefined {
  return REGISTRY[name];
}

export function getAllComponents(): RegistryComponent[] {
  return Object.values(REGISTRY).filter(comp => comp.type === 'registry:ui');
}

export function resolveAllDependencies(componentName: string): string[] {
  const resolved = new Set<string>();
  const queue = [componentName];

  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (resolved.has(current)) continue;
    resolved.add(current);

    const component = getComponent(current);
    if (!component) continue;

    const deps = component.registryDependencies || [];
    deps.forEach(dep => {
      if (!resolved.has(dep)) {
        queue.push(dep);
      }
    });
  }

  return Array.from(resolved);
}

export async function fetchComponentTemplate(
  file: RegistryFile
): Promise<string> {
  const url = `${REGISTRY_BASE_URL}/${file.path}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch component template: ${error}`);
  }
}