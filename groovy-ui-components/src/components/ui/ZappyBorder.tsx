import React, { useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);

function hexToRgba(hex: string, alpha: number = 1): string {
  if (!hex) return `rgba(0,0,0,${alpha})`;
  let h = hex.replace('#', '');
  if (h.length === 3) {
    h = h.split('').map(c => c + c).join('');
  }
  const int = parseInt(h, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

interface ElectricBorderProps {
  children?: React.ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  style?: ViewStyle;
  width: number;
  height: number;
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = '#5227FF',
  speed = 1,
  chaos = 0.12,
  borderRadius = 24,
  style,
  width,
  height,
}) => {
  const time = useSharedValue(0);
  
  const random = useCallback((x: number): number => {
    return (Math.sin(x * 12.9898) * 43758.5453) % 1;
  }, []);

  const noise2D = useCallback(
    (x: number, y: number): number => {
      const i = Math.floor(x);
      const j = Math.floor(y);
      const fx = x - i;
      const fy = y - j;
      const a = random(i + j * 57);
      const b = random(i + 1 + j * 57);
      const c = random(i + (j + 1) * 57);
      const d = random(i + 1 + (j + 1) * 57);
      const ux = fx * fx * (3.0 - 2.0 * fx);
      const uy = fy * fy * (3.0 - 2.0 * fy);
      return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
    },
    [random]
  );

  const octavedNoise = useCallback(
    (
      x: number,
      octaves: number,
      lacunarity: number,
      gain: number,
      baseAmplitude: number,
      baseFrequency: number,
      t: number,
      seed: number,
      baseFlatness: number
    ): number => {
      let y = 0;
      let amplitude = baseAmplitude;
      let frequency = baseFrequency;
      for (let i = 0; i < octaves; i++) {
        let octaveAmplitude = amplitude;
        if (i === 0) {
          octaveAmplitude *= baseFlatness;
        }
        y += octaveAmplitude * noise2D(frequency * x + seed * 100, t * frequency * 0.3);
        frequency *= lacunarity;
        amplitude *= gain;
      }
      return y;
    },
    [noise2D]
  );

  const getCornerPoint = useCallback(
    (
      centerX: number,
      centerY: number,
      radius: number,
      startAngle: number,
      arcLength: number,
      progress: number
    ): { x: number; y: number } => {
      const angle = startAngle + progress * arcLength;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    },
    []
  );

  const getRoundedRectPoint = useCallback(
    (t: number, left: number, top: number, w: number, h: number, radius: number): { x: number; y: number } => {
      const straightWidth = w - 2 * radius;
      const straightHeight = h - 2 * radius;
      const cornerArc = (Math.PI * radius) / 2;
      const totalPerimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
      const distance = t * totalPerimeter;
      let accumulated = 0;

      if (distance <= accumulated + straightWidth) {
        const progress = (distance - accumulated) / straightWidth;
        return { x: left + radius + progress * straightWidth, y: top };
      }
      accumulated += straightWidth;

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + w - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, progress);
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightHeight) {
        const progress = (distance - accumulated) / straightHeight;
        return { x: left + w, y: top + radius + progress * straightHeight };
      }
      accumulated += straightHeight;

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + w - radius, top + h - radius, radius, 0, Math.PI / 2, progress);
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightWidth) {
        const progress = (distance - accumulated) / straightWidth;
        return { x: left + w - radius - progress * straightWidth, y: top + h };
      }
      accumulated += straightWidth;

      if (distance <= accumulated + cornerArc) {
        const progress = (distance - accumulated) / cornerArc;
        return getCornerPoint(left + radius, top + h - radius, radius, Math.PI / 2, Math.PI / 2, progress);
      }
      accumulated += cornerArc;

      if (distance <= accumulated + straightHeight) {
        const progress = (distance - accumulated) / straightHeight;
        return { x: left, y: top + h - radius - progress * straightHeight };
      }
      accumulated += straightHeight;

      const progress = (distance - accumulated) / cornerArc;
      return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, progress);
    },
    [getCornerPoint]
  );

  const generatePath = useCallback(
    (currentTime: number) => {
      const octaves = 10;
      const lacunarity = 1.6;
      const gain = 0.7;
      const amplitude = chaos;
      const frequency = 10;
      const baseFlatness = 0;
      const displacement = 60;
      const borderOffset = 60;

      const left = borderOffset;
      const top = borderOffset;
      const borderWidth = width;
      const borderHeight = height;
      const maxRadius = Math.min(borderWidth, borderHeight) / 2;
      const radius = Math.min(borderRadius, maxRadius);

      const approximatePerimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
      const sampleCount = Math.floor(approximatePerimeter / 2);

      let pathData = '';
      
      for (let i = 0; i <= sampleCount; i++) {
        const progress = i / sampleCount;
        const point = getRoundedRectPoint(progress, left, top, borderWidth, borderHeight, radius);

        const xNoise = octavedNoise(
          progress * 8,
          octaves,
          lacunarity,
          gain,
          amplitude,
          frequency,
          currentTime,
          0,
          baseFlatness
        );
        const yNoise = octavedNoise(
          progress * 8,
          octaves,
          lacunarity,
          gain,
          amplitude,
          frequency,
          currentTime,
          1,
          baseFlatness
        );

        const displacedX = point.x + xNoise * displacement;
        const displacedY = point.y + yNoise * displacement;

        if (i === 0) {
          pathData += `M ${displacedX} ${displacedY} `;
        } else {
          pathData += `L ${displacedX} ${displacedY} `;
        }
      }
      pathData += 'Z';
      return pathData;
    },
    [width, height, borderRadius, chaos, octavedNoise, getRoundedRectPoint]
  );

  useEffect(() => {
    time.value = withRepeat(
      withTiming(1000, {
        duration: 1000000 / speed,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [speed]);

  const animatedProps = useAnimatedProps(() => {
    const pathData = generatePath(time.value);
    return {
      d: pathData,
    };
  });

  const svgWidth = width + 120;
  const svgHeight = height + 120;

  return (
    <View style={[styles.container, { width, height, borderRadius }, style]}>
      <View style={[styles.svgContainer, { width: svgWidth, height: svgHeight }]}>
        <Svg width={svgWidth} height={svgHeight} style={styles.svg}>
          <AnimatedPath
            animatedProps={animatedProps}
            stroke={color}
            strokeWidth={1}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>

      <View style={[styles.glowContainer, { borderRadius }]}>
        <View
          style={[
            styles.glow1,
            {
              borderRadius,
              borderWidth: 2,
              borderColor: hexToRgba(color, 0.6),
            },
          ]}
        />
        <View
          style={[
            styles.glow2,
            {
              borderRadius,
              borderWidth: 2,
              borderColor: color,
            },
          ]}
        />
        <View
          style={[
            styles.glow3,
            {
              borderRadius,
              backgroundColor: hexToRgba(color, 0.3),
            },
          ]}
        />
      </View>

      <View style={[styles.content, { borderRadius }]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'visible',
  },
  svgContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -60 }, { translateY: -60 }],
    zIndex: 2,
  },
  svg: {
    position: 'absolute',
  },
  glowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  glow1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  glow2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  glow3: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    opacity: 0.3,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
});

export default ElectricBorder;