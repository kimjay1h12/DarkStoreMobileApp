import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

const SlideInComponent = ({ children }) => {
  const slideAnim = useRef(new Animated.Value(1000)).current; // Start off-screen to the right

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0, // Slide to the left by 0 units (i.e., on-screen)
      duration: 300, // Adjust the duration as needed
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        transform: [{ translateX: slideAnim }],
        width: "100%",
        height: 100,
        backgroundColor: "lightblue",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </Animated.View>
  );
};

export default SlideInComponent;
