import { Registry } from '../index.js';

export const lightningRegistry: Registry = {
  lightning: {  // Changed from 'button' to 'lightning'
    name: 'lightning',  // Should match the key
    description: 'crazyyyyy lightning background',
    type: 'registry:ui',
    registryDependencies: [],
    dependencies: [],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/Lightning.tsx',
        target: 'components/ui/Lightning.tsx',
      },
    ],
  },
};