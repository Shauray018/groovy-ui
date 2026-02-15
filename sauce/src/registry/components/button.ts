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
        path: 'src/components/ui/Button.tsx',
        target: 'components/ui/Button.tsx', 
      },
    ],
  },
};