import { Registry } from '../index.js';

export const lightningRegistry: Registry = {
  button: {
    name: 'lightning background',
    description: 'crazyyyyy background',
    type: 'registry:ui',
    registryDependencies: [],
    dependencies: [], // npm packages needed
    files: [
      {
        type: 'registry:ui',
        // Points to raw GitHub URL of your component
        path: 'src/components/ui/Lightning.tsx',
        target: 'components/ui/Lightning.tsx', // Where to copy in user's project
      },
    ],
  },
};