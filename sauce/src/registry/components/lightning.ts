import { Registry } from '../index.js';

export const lightningRegistry: Registry = {
  lightning: {  
    name: 'lightning',  
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