import { useContext } from "react";
import { ThemeTypes } from "./types";
import { GLobalContext } from "../context";

const lightColors = {
  white: {
    1: "#f7f7f7",
    2: "#f7f7f7",
    3: "#eee",
    4: "#ddd",
    5: "#bbb",
    6:"#FFFEFE33",
    7:"#B300EECC"
  },
  black: {
    1: "#888",
    2: "#777",
    3: "#555",
    4: "#333",
    5: "#000",
      7:"#fff",
  },
};

const darkColors = {
  black: {
    1: "#fff",
    2: "#fff",
    3: "#eee",
    4: "#ddd",
    5: "#aaa",
  },
  white: {
    1: "#111",
    2: "#222",
    3: "#444",
    4: "#333",
    5: "#555",
     6:"#fff9",
  },
  dark: {
    main: "#fff9",
    light: "#000",
    dark: "#fff9",
    text: "#000",
  },
  light: {
    main: "#000",
    light: "#000",
    dark: "#333",
    text: "#fff",
  },
  grey: {
    dark: "#555555",
    main: "#555555",
  },
  textSecondary: {
    main: "#777",
  },
  secondary: {
    main: "#FFFEFE33",
    light: "#a33",
    dark: "#900",
    text: "#fff",
  },
  blue: {
    main: "#266DD3",
    light: "#f4d",
    dark: "#a06",
    text: "#fff",
  },
};

export default function colors(theme: ThemeTypes) {
  const dynamicColors = theme === "dark" ? darkColors : lightColors;

  return {
    
    primary: {
      main: "#000",
      light:" #f7f7f7",
      dark: "#000",
      text: "#fff",
    },
    secondary: {
      main: "#EBEDF4",
      light: "#f43",
      dark: "#fff",
      text: "#000",
      
    },
    purple: {
      main: "#a09",
      light: "#f4d",
      dark: "#a06",
      text: "#fff",
    },
    light: {
      main: "#fff",
      light: "#fff",
      dark: "#ddd",
      text:"  #000 ",
    },
    dark: {
      main: "#000",
      light: "#fff",
      dark: "#111",
      text: "#fff99",
    },
    textSecondary: {
      main: "#fff",
      light: "#9ab",
      dark: "#678",
      text: "#fff",
    },
    blue: {
      main: "#09F",
      light: "#39f",
      dark: "#028",
      text: "#fff",

    },
    info: {
      main: "#5FCC35",
      light: "#3af",
      dark: "#08a",
      text: "#fff",
    },
    success: {
      main: "#0a4",
      text: "#fff",
      light: "#5c3",
      dark: "#062",

    },

    warning: {
      main: "#fa2",
      light: "#fc7",
      dark: "#f90",
      text: "#fff",
    },
    error: {
      main: "#D22",
      text: "#fff",
      light: "#f43",
      dark: "#a20",

    },

    ...dynamicColors,
  };
}
