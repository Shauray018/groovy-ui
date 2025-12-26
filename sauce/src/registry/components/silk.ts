import { Registry } from '../index.js';

export const silkRegistry: Registry = {
  button: {
    name: 'silk background',
    description: 'crazyyyyy background',
    type: 'registry:ui',
    registryDependencies: [],
    dependencies: [], // npm packages needed
    files: [
      {
        type: 'registry:ui',
        // Points to raw GitHub URL of your component
        path: 'src/components/ui/Silk.tsx',
        target: 'components/ui/Silk.tsx', // Where to copy in user's project
      },
    ],
  },
};