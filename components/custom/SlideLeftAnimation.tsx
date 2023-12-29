import React, { useState, useEffect } from "react";
import { Animated, View, StyleSheet } from "react-native";

interface SlideLeftAnimationProps {
  children: React.ReactNode;
  duration?: number;
  distance?: number;
}

const SlideLeftAnimation: React.FC<SlideLeftAnimationProps> = ({
  children,
  duration = 500,
  distance = 100,
}) => {
  const [slideLeftAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(slideLeftAnim, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }, []);

  const slideLeft = slideLeftAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [distance, 0],
  });

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateX: slideLeft }] }]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SlideLeftAnimation;
