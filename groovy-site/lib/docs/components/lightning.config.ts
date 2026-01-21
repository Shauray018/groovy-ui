import { ComponentConfig } from "../types/docs.types";

export const lightningConfig: ComponentConfig = {
  title: 'Lightning',
  description: 'A dynamic lightning-effect animated background using WebGL shaders with fractal noise.',
  installation: 'npx groovy-ui add lightning',
  videoUrl: '/demos/lightning.mp4',
  githubUrl: 'https://raw.githubusercontent.com/Shauray018/groovy-ui/refs/heads/main/groovy-ui-components/src/components/ui/Lightning.tsx',
  dependencies: ['expo-gl'],
  usage: `import { Lightning } from '@/components/ui/lightning';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Lightning hue={230} speed={1} />
      <Text>Your content here</Text>
    </View>
  );
}`,
  props: [
    {
      name: 'hue',
      type: 'number',
      default: '230',
      description: 'Color hue value (0-360)'
    },
    {
      name: 'xOffset',
      type: 'number',
      default: '0',
      description: 'Horizontal offset of the lightning bolt'
    },
    {
      name: 'speed',
      type: 'number',
      default: '1',
      description: 'Animation speed multiplier'
    },
    {
      name: 'intensity',
      type: 'number',
      default: '1',
      description: 'Brightness intensity'
    },
    {
      name: 'size',
      type: 'number',
      default: '1',
      description: 'Scale of the fractal pattern'
    }
  ],
  examples: [
    {
      title: 'Basic Lightning',
      code: `<Lightning />`
    },
    {
      title: 'Purple Lightning',
      code: `<Lightning hue={280} speed={2} intensity={1.5} />`
    }
  ]
};
