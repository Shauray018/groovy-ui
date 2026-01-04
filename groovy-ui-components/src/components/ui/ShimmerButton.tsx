import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

export interface ShimmerButtonProps {
  shimmerColor?: string;
  shimmerDuration?: number;
  borderRadius?: number;
  background?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
  onPress?: () => void;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  shimmerColor = '#ffffff',
  shimmerDuration = 10000,
  borderRadius = 100,
  background = '#000000',
  style,
  textStyle,
  children,
  onPress,
}) => {
  const rotation = useSharedValue(0);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: shimmerDuration,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [shimmerDuration]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const size = 400; // Large enough to cover the button

  return (
    <View style={[styles.wrapper, style]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          { borderRadius },
          pressed && styles.pressed,
        ]}
      >
        {/* Animated gradient border container */}
        <View
          style={[
            styles.borderContainer,
            { borderRadius, overflow: 'hidden' },
          ]}
        >
          <Animated.View
            style={[
              animatedStyle,
              {
                width: size,
                height: size,
                position: 'absolute',
                left: -size / 2,
                top: -size / 2,
              },
            ]}
          >
            <LinearGradient
              colors={[
                'transparent',
                'transparent',
                shimmerColor,
                'transparent',
                'transparent',
              ]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={{ width: size, height: size }}
            />
          </Animated.View>
        </View>

        {/* Inner content with background */}
        <View
          style={[
            styles.content,
            {
              backgroundColor: background,
              borderRadius: borderRadius - 2,
            },
          ]}
        >
          {typeof children === 'string' ? (
            <Text style={[styles.text, textStyle]}>{children}</Text>
          ) : (
            children
          )}

          {/* Inner highlight */}
          <View
            style={[
              styles.innerHighlight,
              { borderRadius: borderRadius - 2 },
            ]}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'flex-start',
  },
  button: {
    position: 'relative',
    padding: 2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ translateY: 1 }],
  },
  borderContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },
  text: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    zIndex: 2,
  },
  innerHighlight: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
});