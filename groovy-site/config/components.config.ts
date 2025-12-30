import { ComponentsConfig } from '../types/docs.types';

export const DOCS_CONFIG = {
  gettingStarted: {
    title: 'Getting Started',
    items: [
      { slug: 'introduction', title: 'Introduction' },
      { slug: 'installation', title: 'Installation' },
      { slug: 'usage', title: 'Usage' }
    ]
  },
  components: {
    title: 'Components',
    items: [
      { slug: 'silk', title: 'Silk' },
      { slug: 'lightning', title: 'Lightning' }
    ]
  }
};

export const COMPONENTS: ComponentsConfig = {
  silk: {
    title: 'Silk',
    description: 'A mesmerizing animated background component with flowing silk-like patterns using WebGL shaders. Features customizable colors, speed, scale, and noise effects.',
    installation: 'npx groovy-ui add silk',
    videoUrl: '/demos/silk.mp4',
    sourceCode: `import { GLView } from 'expo-gl';
import { Renderer, THREE } from 'expo-three';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type NormalizedRGB = [number, number, number];

const hexToNormalizedRGB = (hex: string): NormalizedRGB => {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return [r, g, b];
};

const vertexShader = \`
varying vec2 vUv;
varying vec3 vPosition;
void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
\`;

const fragmentShader = \`
varying vec2 vUv;
varying vec3 vPosition;
uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;
const float e = 2.71828182845904523536;
float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}
vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}
void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;
  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);
  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));
  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
\`;

export interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
  style?: ViewStyle;
}

export const Silk: React.FC<SilkProps> = ({
  speed = 5,
  scale = 1,
  color = '#7B7481',
  noiseIntensity = 1.5,
  rotation = 0,
  style
}) => {
  const timeRef = useRef(0);
  const requestRef = useRef<number | null>(null);

  const onContextCreate = async (gl: any) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    
    // Create renderer
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    // Create scene
    const scene = new THREE.Scene();

    // Create camera
    const camera = new THREE.OrthographicCamera(
      -width / 2,
      width / 2,
      height / 2,
      -height / 2,
      0.1,
      1000
    );
    camera.position.z = 1;

    // Create uniforms
    const uniforms = {
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new THREE.Color(...hexToNormalizedRGB(color)) },
      uRotation: { value: rotation },
      uTime: { value: 0 }
    };

    // Create material
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    });

    // Create mesh
    const geometry = new THREE.PlaneGeometry(width, height, 1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    let lastTime = Date.now();
    
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);
      
      const currentTime = Date.now();
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      
      timeRef.current += 0.1 * delta;
      material.uniforms.uTime.value = timeRef.current;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <View style={[styles.container, style]}>
      <GLView
        style={styles.glView}
        onContextCreate={onContextCreate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  glView: {
    flex: 1,
  },
});`,
    dependencies: ['expo-gl', 'expo-three', 'three', '@types/three'],
    usage: `import { Silk } from '@/components/ui/silk';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Silk 
        speed={5}
        scale={1}
        color="#7B7481"
        noiseIntensity={1.5}
      />
      <Text style={{ zIndex: 1 }}>Your content here</Text>
    </View>
  );
}`,
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
        description: 'Rotation angle of the pattern in radians'
      },
      {
        name: 'style',
        type: 'ViewStyle',
        default: '-',
        description: 'Additional styles to apply to the container'
      }
    ],
    examples: [
      {
        title: 'Basic Silk Background',
        code: `<View style={{ flex: 1 }}>
  <Silk />
  <Text>Content over silk background</Text>
</View>`
      },
      {
        title: 'Custom Color and Speed',
        code: `<View style={{ flex: 1 }}>
  <Silk 
    color="#4A90E2"
    speed={8}
    scale={1.5}
  />
  <Text>Fast blue silk pattern</Text>
</View>`
      },
      {
        title: 'High Intensity with Rotation',
        code: `<View style={{ flex: 1 }}>
  <Silk 
    color="#E24A90"
    noiseIntensity={2.5}
    rotation={0.785}
    speed={3}
  />
  <Text>Rotated pink silk</Text>
</View>`
      }
    ]
  },

  lightning: {
    title: 'Lightning',
    description: 'A dynamic lightning-effect animated background using WebGL shaders with fractal noise. Features customizable hue, speed, intensity, and positioning.',
    installation: 'npx groovy-ui add lightning',
    videoUrl: '/demos/lightning.mp4',
    sourceCode: `import { GLView } from 'expo-gl';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

export interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
  style?: ViewStyle;
}

export const Lightning: React.FC<LightningProps> = ({
  hue = 230,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
  style
}) => {
  const requestRef = useRef<number | null>(null);

  const onContextCreate = async (gl: any) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    const vertexShaderSource = \`
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    \`;

    const fragmentShaderSource = \`
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      
      #define OCTAVE_COUNT 10

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));
          
          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          uv.x += uXOffset - (iResolution.x / iResolution.y - 1.0) * 0.5;
          
          float loopTime = mod(iTime * uSpeed, 3.0);
          uv += 2.0 * fbm(uv * uSize + 0.8 * loopTime) - 1.0;
          
          float dist = abs(uv.x);
          dist = max(dist, 0.01);
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.7, 0.8));
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
          col = clamp(col, 0.0, 1.0);
          col = pow(col, vec3(1.0));
          fragColor = vec4(col, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    \`;

    const compileShader = (source: string, type: number): any => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, 'iResolution');
    const iTimeLocation = gl.getUniformLocation(program, 'iTime');
    const uHueLocation = gl.getUniformLocation(program, 'uHue');
    const uXOffsetLocation = gl.getUniformLocation(program, 'uXOffset');
    const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');
    const uIntensityLocation = gl.getUniformLocation(program, 'uIntensity');
    const uSizeLocation = gl.getUniformLocation(program, 'uSize');

    const startTime = Date.now();
    
    const render = () => {
      requestRef.current = requestAnimationFrame(render);

      gl.viewport(0, 0, width, height);
      gl.uniform2f(iResolutionLocation, width, height);
      const currentTime = Date.now();
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0);
      gl.uniform1f(uHueLocation, hue);
      gl.uniform1f(uXOffsetLocation, xOffset);
      gl.uniform1f(uSpeedLocation, speed);
      gl.uniform1f(uIntensityLocation, intensity);
      gl.uniform1f(uSizeLocation, size);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      gl.endFrameEXP();
    };
    
    render();
  };

  useEffect(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <View style={[styles.container, style]}>
      <GLView
        style={styles.glView}
        onContextCreate={onContextCreate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  glView: {
    flex: 1,
  },
});`,
    dependencies: ['expo-gl'],
    usage: `import { Lightning } from '@/components/ui/lightning';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Lightning 
        hue={230}
        speed={1}
        intensity={1}
      />
      <Text style={{ zIndex: 1 }}>Your content here</Text>
    </View>
  );
}`,
    props: [
      {
        name: 'hue',
        type: 'number',
        default: '230',
        description: 'Color hue value (0-360) for the lightning effect'
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
        description: 'Brightness intensity of the lightning'
      },
      {
        name: 'size',
        type: 'number',
        default: '1',
        description: 'Scale of the fractal noise pattern'
      },
      {
        name: 'style',
        type: 'ViewStyle',
        default: '-',
        description: 'Additional styles to apply to the container'
      }
    ],
    examples: [
      {
        title: 'Basic Lightning Background',
        code: `<View style={{ flex: 1 }}>
  <Lightning />
  <Text>Content over lightning background</Text>
</View>`
      },
      {
        title: 'Purple Lightning with High Speed',
        code: `<View style={{ flex: 1 }}>
  <Lightning 
    hue={280}
    speed={2}
    intensity={1.5}
  />
  <Text>Fast purple lightning</Text>
</View>`
      },
      {
        title: 'Green Lightning with Offset',
        code: `<View style={{ flex: 1 }}>
  <Lightning 
    hue={120}
    xOffset={0.5}
    size={1.5}
    intensity={0.8}
  />
  <Text>Offset green lightning</Text>
</View>`
      }
    ]
  }
};