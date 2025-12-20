import { Registry } from '../index.js';

export const buttonRegistry: Registry = {
  button: {
    name: 'button',
    description: 'A customizable button component',
    type: 'registry:ui',
    registryDependencies: [],
    dependencies: [], // npm packages needed
    files: [
      {
        type: 'registry:ui',
        // Points to raw GitHub URL of your component
        path: 'src/components/ui/Button.tsx',
        target: 'components/ui/Button.tsx', // Where to copy in user's project
      },
    ],
  },
};