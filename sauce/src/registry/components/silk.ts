import { Registry } from '../index.js';

export const silkRegistry: Registry = {
  silk: {  // Changed from 'button' to 'silk'
    name: 'silk',  // Should match the key
    description: 'crazyyyyy silk background',
    type: 'registry:ui',
    registryDependencies: [],
    dependencies: [],
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/Silk.tsx',
        target: 'components/ui/Silk.tsx',
      },
    ],
  },
};