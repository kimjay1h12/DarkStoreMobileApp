import React, { useState, useRef, useEffect } from "react";

import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const { width } = Dimensions.get("window");
import { ScaledSheet } from "react-native-size-matters";

const SlidingImageBackground = ({ images = [], children }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const currentIndex = Math.floor(contentOffset.x / width);
    setCurrentPage(currentIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentPage + 1) % images?.length;
      handlePagination(newIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPage]);

  const handlePagination = (index) => {
    setCurrentPage(index);
    scrollViewRef.current?.scrollTo({ x: width * index, animated: true });
  };

  const scrollViewRef = useRef();
  return (
    <View style={styles.container} >
      <View>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: width * images?.length }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {images.map((image, index) => (
            <View key={index}>
              <Image
                source={{ uri: image }}
                style={styles.image}
              />
            </View>
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <Text
              key={index}
              style={
                index === currentPage
                  ? styles.paginationTextActive
                  : styles.paginationText
              }
              onPress={() => handlePagination(index)}
            >
              ⬤
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.contentContainer}>
        {/* Your fixed content */}
        {children}
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 0,
    // padding:10,
height: "370@s",
zIndex:1000
    // backgroundColor:"#000"
  },
  image: {
    width: Dimensions.get("window").width,
    height: "370@s",

    resizeMode: "cover",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  contentContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  slide: {
    width,
    height: 200,
  },
  textContent: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
  },
  pagination: {
    marginTop: "-18@s",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#aaa",
    fontSize:10
  },
  inactiveDot: {
    width: 10,
    height: 10,
    fontSize:10,
    borderRadius: 5,
    backgroundColor: "gray",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  paginationText: {
    color: "#888",
    margin: 3,
  },
  paginationTextActive: {
    color: "#000",
    margin: 3,
  },
});

export default SlidingImageBackground;
