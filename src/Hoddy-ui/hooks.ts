import { useContext } from "react";
import { Platform } from "react-native";
import { ms, vs } from "react-native-size-matters";
import colors from "./colors";
import { UIThemeContext } from "./theme";

export const useColors = () => {
  const { themeState } = useContext(UIThemeContext);
  return colors(themeState.value);
};

export const useTheme = () => {
  const { themeState } = useContext(UIThemeContext);
  return themeState.value;
};
export const useNavScreenOptions = (type: "stack" | "tab" | "drawer") => {
  const colors = useColors();
  const options = {
    stack: {
      headerShown: false,

      headerStyle: {
        backgroundColor: colors.white[1],
      },
      headerShadowVisible: false,
      contentStyle: {
        backgroundColor: colors.white[1],
      },
      headerTitleStyle: {
        color: colors.black[1],
      },
      headerTintColor:
        Platform.OS === "android" ? colors.black[1] : colors.primary.main,
    },
    tab: {
      headerShown: false,
      // headerTintColor: colors.dark.main,
      tabBarStyle: {
        borderTopColor: colors.white[2],
        borderTopWidth: 0,
        // shadowColor: "#000",
        // shadowOffset: { height: -3, width: 0 },
        // shadowRadius: 7,
        // shadowOpacity: 0.1,
        // height: vs(55),

   position:  Platform.OS === "android" ? "":"absolute",
       
        backgroundColor:"#fff",
      },
      tabBarActiveTintColor: "#000",
      tabBarInactiveTintColor: "#aaa",
      tabBarLabelStyle: {
        // fontSize: ms(12),
      },
    },
    drawer: {
      headerShown: false,
      drawerActiveTintColor: colors.primary.main,
      drawerInactiveTintColor: colors.textSecondary.main,

      sceneContainerStyle: {
        backgroundColor: colors.white[2],
      },
      drawerStyle: {
        backgroundColor: colors.white[1],
        width: "90%"

      },
      headerStyle: {
        backgroundColor: colors.white[1],
      },
      headerTitleStyle: {
        color: colors.dark.main,
      },
    },
  };
  return options[type];
};
