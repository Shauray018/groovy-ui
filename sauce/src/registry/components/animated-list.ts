import { Registry } from '../index.js';

export const animatedListRegistry: Registry = {
  button: {
    name: 'animatedList',
    description: 'A customizable button component',
    type: 'registry:ui',
    registryDependencies: [],
    dependencies: [], 
    files: [
      {
        type: 'registry:ui',
        path: 'src/components/ui/AnimatedList.tsx',
        target: 'components/ui/Button.tsx', // Where to copy in user's project
      },
    ],
  },
};
