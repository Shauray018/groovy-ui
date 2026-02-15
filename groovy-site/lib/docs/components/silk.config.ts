import { ComponentConfig } from '../types/docs.types';

export const silkConfig: ComponentConfig = {
  title: 'Silk',
  description: 'A mesmerizing animated background component with flowing silk-like patterns using WebGL shaders.',
  installation: 'npx groovy-ui add silk',
  videoUrl: '/demos/silk.mp4',
  githubUrl: 'https://raw.githubusercontent.com/Shauray018/groovy-ui/refs/heads/main/groovy-ui-components/src/components/ui/Silk.tsx',
  dependencies: ['expo-gl', 'expo-three', 'three', '@types/three'],
  usage: `import { Silk } from '@/components/ui/silk';

export default function App() {
  return (
    <View style={styles.container}>
      <Silk speed={5} scale={1} color="#6A8FAF" />
      <View style={styles.content}>
        <Text style={styles.title}>Your content here</Text>
      </View>
    </View>
  );
}`,
  // sourceCode is now optional - will be fetched from GitHub
  props: [
    {
      name: 'speed',
      type: 'number',
      default: '5',
      description: 'Animation speed of the silk pattern'
    },
    {
      name: 'scale',
      type: 'number',
      default: '1',
      description: 'Scale of the silk pattern'
    },
    {
      name: 'color',
      type: 'string',
      default: "'#7B7481'",
      description: 'Hex color of the silk pattern'
    },
    {
      name: 'noiseIntensity',
      type: 'number',
      default: '1.5',
      description: 'Intensity of the noise effect'
    },
    {
      name: 'rotation',
      type: 'number',
      default: '0',
      description: 'Rotation angle in radians'
    },
    {
      name: 'style',
      type: 'ViewStyle',
      default: '-',
      description: 'Additional container styles'
    }
  ],
  examples: [
    {
      title: 'Basic Silk Background',
      code: `<Silk />`
    },
    {
      title: 'Custom Color and Speed',
      code: `<Silk color="#4A90E2" speed={8} scale={1.5} />`
    }
  ]
};