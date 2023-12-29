import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import React, { useContext, useRef, useState } from "react";
import { useColorScheme } from "react-native";
import { GLobalContext } from "../src/context";

SplashScreen.preventAutoHideAsync();

const Storage = () => {
  const { authDispatch, authState } = useContext(GLobalContext);

  const colorScheme = useColorScheme();
  const [currentColorScheme, setCurrentColorScheme] = useState(colorScheme);
  const onColorSchemeChange = useRef();
  // Check the storage
  React.useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("nd-rest-tkn");
      const data = await AsyncStorage.getItem("userData");
      const res = JSON.parse(data);

      if (data && token) {
        authDispatch({
          type: "SUCCESS",
          payload: {
            ...res,
            token: token,
          },
        });
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 1000);
      } else {
        SplashScreen.hideAsync();
      }
    })();
  }, []);

  // React.useEffect(() => {
  //   AsyncStorage.getItem("theme").then((val) => {
  //     if (val) {
  //       if (val === "default") {
  //         if (colorScheme !== currentColorScheme) {
  //           onColorSchemeChange.current = setTimeout(() => {
  //             setCurrentColorScheme(colorScheme);
  //             themeDispatch({
  //               type: "default",
  //               payload: colorScheme,
  //             });
  //           }, 1000);
  //         } else if (onColorSchemeChange.current) {
  //           clearTimeout(onColorSchemeChange.current);
  //         }
  //       } else
  //         themeDispatch({
  //           type: val,
  //         });
  //     } else {
  //       if (colorScheme !== currentColorScheme) {
  //         onColorSchemeChange.current = setTimeout(() => {
  //           setCurrentColorScheme(colorScheme);
  //           themeDispatch({
  //             type: "default",
  //             payload: colorScheme,
  //           });
  //         }, 1000);
  //       } else {
  //         if (onColorSchemeChange.current) {
  //           clearTimeout(onColorSchemeChange.current);
  //         }
  //         if (currentColorScheme !== themeState.value) {
  //           themeDispatch({
  //             type: "default",
  //             payload: currentColorScheme,
  //           });
  //         }
  //       }
  //     }
  //   });
  // }, [colorScheme]);
  return <></>;
};

export default Storage;
