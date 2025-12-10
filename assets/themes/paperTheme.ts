import {
  configureFonts,
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
} from "react-native-paper";
import { ColorSchemeName } from "react-native";
import { LightScheme } from "./LightScheme";
import { DarkScheme } from "./DarkScheme";
import { BankLightScheme } from "./BankLightScheme";
import { BankDarkScheme } from "./BankDarkScheme";


const createTheme = (base: MD3Theme, colors: MD3Theme["colors"]) => ({
  ...base,
  colors,
});

export const getAppTheme = (colorScheme: ColorSchemeName) =>
  colorScheme === "dark"
    ? createTheme(MD3DarkTheme, DarkScheme)
    : createTheme(MD3LightTheme, LightScheme);

export const getBankTheme = (colorScheme: ColorSchemeName) =>
  colorScheme === "dark"
    ? createTheme(MD3DarkTheme, BankDarkScheme)
    : createTheme(MD3LightTheme, BankLightScheme);
