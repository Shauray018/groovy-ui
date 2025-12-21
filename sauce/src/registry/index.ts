// src/registry/index.ts

export interface RegistryFile {
  type: 'registry:ui' | 'registry:example' | 'registry:hook' | 'registry:theme';
  path: string;
  target: string;
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
}

export type Registry = Record<string, RegistryComponent>;

// ✅ YOUR ACTUAL RAW GITHUB URL
const REGISTRY_BASE_URL = 'https://raw.githubusercontent.com/Shauray018/groovy-ui/refs/heads/main/groovy-ui-components';

// Import component registries
import { buttonRegistry } from './components/button.js';
// import { alertRegistry } from './components/alert.js';
// import { cardRegistry } from './components/card.js';

// Combine all registries
export const REGISTRY: Registry = {
  ...buttonRegistry,
  // ...alertRegistry,
  // ...cardRegistry,
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
  // Construct the full URL to the raw file
  const url = `${REGISTRY_BASE_URL}/${file.path}`;
  
  console.log(`Fetching component from: ${url}`); // For debugging
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch component template from ${url}: ${error}`);
  }
}