import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import {
    LayoutChangeEvent,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

interface AnimatedItemProps {
  children: ReactNode;
  delay?: number;
  index: number;
  isSelected: boolean;
  onPress: () => void;
  scrollY: number;
  itemY: number;
  viewportHeight: number;
}

const AnimatedItem: React.FC<AnimatedItemProps> = ({
  children,
  index,
  isSelected,
  onPress,
  scrollY,
  itemY,
  viewportHeight,
}) => {
  const scale = useSharedValue(0.7);
  const opacity = useSharedValue(0);
  const [layout, setLayout] = useState({ y: 0, height: 0 });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setLayout({ y, height });
  };

  useEffect(() => {
    const itemTop = layout.y;
    const itemBottom = itemTop + layout.height;
    const scrollTop = scrollY;
    const scrollBottom = scrollY + viewportHeight;

    // Check if item is in viewport with margin
    const margin = 100;
    const isInView = itemBottom > scrollTop - margin && itemTop < scrollBottom + margin;

    if (isInView) {
      scale.value = withTiming(1, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      scale.value = withTiming(0.7, { duration: 300 });
      opacity.value = withTiming(0, { duration: 300 });
    }
  }, [scrollY, layout, viewportHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.itemWrapper, animatedStyle]} onLayout={handleLayout}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[
          styles.itemContainer,
          isSelected && styles.itemContainerSelected,
        ]}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
};

interface AnimatedListProps {
  items?: string[];
  onItemSelect?: (item: string, index: number) => void;
  showGradients?: boolean;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
  maxHeight?: number;
  width?: number;
}

const AnimatedList: React.FC<AnimatedListProps> = ({
  items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
    'Item 13',
    'Item 14',
    'Item 15',
  ],
  onItemSelect,
  showGradients = true,
  displayScrollbar = true,
  initialSelectedIndex = -1,
  maxHeight = 400,
  width = 500,
}) => {
  const scrollRef = useRef<ScrollView>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex);
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const topGradientOpacity = useSharedValue(0);
  const bottomGradientOpacity = useSharedValue(1);
  const [contentHeight, setContentHeight] = useState(0);

  const handleItemPress = useCallback(
    (item: string, index: number) => {
      setSelectedIndex(index);
      if (onItemSelect) {
        onItemSelect(item, index);
      }
    },
    [onItemSelect]
  );

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const scrollTop = contentOffset.y;
    const scrollHeight = contentSize.height;
    const clientHeight = layoutMeasurement.height;

    setScrollY(scrollTop);

    topGradientOpacity.value = withTiming(
      Math.min(scrollTop / 50, 1),
      { duration: 150 }
    );

    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    const shouldShowBottom = scrollHeight > clientHeight;
    bottomGradientOpacity.value = withTiming(
      shouldShowBottom ? Math.min(bottomDistance / 50, 1) : 0,
      { duration: 150 }
    );
  };

  const handleScrollViewLayout = (event: LayoutChangeEvent) => {
    setViewportHeight(event.nativeEvent.layout.height);
  };

  const handleContentSizeChange = (_: number, height: number) => {
    setContentHeight(height);
  };

  useEffect(() => {
    if (contentHeight > viewportHeight) {
      bottomGradientOpacity.value = withTiming(1, { duration: 300 });
    } else {
      bottomGradientOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [contentHeight, viewportHeight]);

  const topGradientStyle = useAnimatedStyle(() => ({
    opacity: topGradientOpacity.value,
  }));

  const bottomGradientStyle = useAnimatedStyle(() => ({
    opacity: bottomGradientOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={8}
        showsVerticalScrollIndicator={displayScrollbar}
        onLayout={handleScrollViewLayout}
        onContentSizeChange={handleContentSizeChange}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={index}
            delay={0.1}
            index={index}
            isSelected={selectedIndex === index}
            onPress={() => handleItemPress(item, index)}
            scrollY={scrollY}
            itemY={index * 100}
            viewportHeight={viewportHeight}
          >
            <Text style={styles.itemText}>{item}</Text>
          </AnimatedItem>
        ))}
      </ScrollView>

      {showGradients && (
        <>
          <Animated.View
            style={[styles.gradientTop, topGradientStyle]}
            pointerEvents="none"
          />
          <Animated.View
            style={[styles.gradientBottom, bottomGradientStyle]}
            pointerEvents="none"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  itemWrapper: {
    marginBottom: 16,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#111111',
    borderRadius: 8,
  },
  itemContainerSelected: {
    backgroundColor: '#222222',
  },
  itemText: {
    color: '#ffffff',
    fontSize: 16,
    margin: 0,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'transparent',
  },
  gradientBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'transparent',
  },
});

export default AnimatedList;