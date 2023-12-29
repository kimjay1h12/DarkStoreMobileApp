import React, { useState, useEffect } from "react";
import { Animated, View, StyleSheet } from "react-native";

interface FadeInAnimationProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
}

const FadeInAnimation: React.FC<FadeInAnimationProps> = ({
  children,
  duration = 500,
  delay = 0,
}) => {
  const [fadeInAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeInAnim }]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FadeInAnimation;
