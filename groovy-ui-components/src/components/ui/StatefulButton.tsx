import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  withRepeat,
  useAnimatedStyle,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

interface StatefulButtonProps {
  onPress: () => Promise<any>;
  children: React.ReactNode;
}

export const StatefulButton = ({ onPress, children }: StatefulButtonProps) => {
  const loaderScale = useSharedValue(0);
  const loaderRotate = useSharedValue(0);
  const checkScale = useSharedValue(0);

  const startLoading = async () => {
    loaderScale.value = withTiming(1, { duration: 200 });
    loaderRotate.value = withRepeat(
      withTiming(360, { duration: 800 }),
      -1,
      false
    );
  };

  const Loader = () => {
        return (
            <Svg width={20} height={20} viewBox="0 0 24 24" stroke="white" fill="none">
            <Path d="M12 3a9 9 0 1 0 9 9" strokeWidth={2} />
            </Svg>
            );
    };
    const CheckIcon = () => {
    return (
        <Svg width={20} height={20} viewBox="0 0 24 24" stroke="white" fill="none">
        <Path d="M9 12l2 2l4 -4" strokeWidth={2} />
        <Path d="M12 12m-9 0a9 9 0 1 0 18 0" strokeWidth={2} />
        </Svg>
    );
    };


  const showSuccess = async () => {
    loaderScale.value = withTiming(0, { duration: 200 });
    loaderRotate.value = 0;

    checkScale.value = withTiming(1, { duration: 200 });

    setTimeout(() => {
      checkScale.value = withTiming(0, { duration: 200 });
    }, 2000);
  };

  const handlePress = async () => {
    await startLoading();
    await onPress();
    await showSuccess();
  };

  const loaderStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: loaderScale.value },
      { rotate: `${loaderRotate.value}deg` },
    ],
  }));

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={styles.button}>
        <View style={styles.content}>
          <Animated.View style={loaderStyle}>
            <Loader />
          </Animated.View>

          <Animated.View style={checkStyle}>
            <CheckIcon />
          </Animated.View>

          <Text style={styles.text}>{children}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    minWidth: 120,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#22c55e",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
});




