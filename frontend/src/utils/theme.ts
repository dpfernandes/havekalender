export interface Theme {
  bg: {
    primary: string;
    secondary: string;
    card: string;
    cardHover: string;
    button: string;
    tab: string;
    tabActive: string;
    harvestTab: string;
  };
  border: {
    primary: string;
    secondary: string;
    card: string;
    harvestCard: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    title: string;
    harvest: string;
  };
  gradient: {
    header: string;
  };
}

export const darkTheme: Theme = {
  bg: {
    primary: "#060e05",
    secondary: "#0a1c08",
    card: "#0f2a0d",
    cardHover: "#143510",
    button: "#0f1f0d",
    tab: "#0a1508",
    tabActive: "#0f2a0d",
    harvestTab: "#2a1e00",
  },
  border: {
    primary: "#1e3a1a",
    secondary: "#2d4a2a",
    card: "#2d4a2a",
    harvestCard: "#3a2e00",
  },
  text: {
    primary: "#c8e6c4",
    secondary: "#6b8f65",
    tertiary: "#3a5a38",
    title: "#c8e6c4",
    harvest: "#fde68a",
  },
  gradient: {
    header: "linear-gradient(180deg,#0a1c08,#060e05)",
  },
};

export const lightTheme: Theme = {
  bg: {
    primary: "#f8faf8",
    secondary: "#ffffff",
    card: "#ffffff",
    cardHover: "#f0f4f0",
    button: "#f0f4f0",
    tab: "#f0f4f0",
    tabActive: "#e8f5e8",
    harvestTab: "#fff9e6",
  },
  border: {
    primary: "#d4e4d2",
    secondary: "#b8d4b5",
    card: "#d4e4d2",
    harvestCard: "#f0e6c0",
  },
  text: {
    primary: "#1a3318",
    secondary: "#3a6338",
    tertiary: "#6b9565",
    title: "#1a3318",
    harvest: "#8b6c00",
  },
  gradient: {
    header: "linear-gradient(180deg,#e8f5e8,#f8faf8)",
  },
};

export function getTheme(isDark: boolean): Theme {
  return isDark ? darkTheme : lightTheme;
}
