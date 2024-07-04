import {
  createBaseThemeOptions,
  createUnifiedTheme,
  genPageTheme,
  palettes,
  shapes,
} from '@backstage/theme';

const defaultPageColor1: string = '#8c4351';
const defaultPageColor2: string = '#2c2f3e'; // Darkened version of #343b58

const diamondDarkPalette = {
  primary: {
    main: '#1A3B7A', // Darkened version of #385BBD
  },
  secondary: {
    main: '#4A5568', // Darkened version of #CBD5E0
  },
  error: {
    main: defaultPageColor1, // Keeping the same as no corresponding color provided
  },
  warning: {
    main: '#B58F17', // Darkened version of #fcd021
  },
  info: {
    main: '#08285E', // Darkened version of #1040A1
  },
  success: {
    main: '#202838', // Darkened version of #39435E
  },
  background: {
    default: '#1A1A1A', // Darkened version of #FBFBFB
    paper: '#121212', // Darkened version of #F7F7F7
  },
  banner: {
    info: '#08285E', // Darkened version of #1040A1
    error: defaultPageColor1, // Keeping the same as no corresponding color provided
    text: '#202838', // Darkened version of #39435E
    link: '#4A5568', // Darkened version of #CBD5E0
  },
  errorBackground: defaultPageColor1, // Keeping the same as no corresponding color provided
  warningBackground: '#B58F17', // Darkened version of #fcd021
  infoBackground: '#08285E', // Darkened version of #1040A1
  navigation: {
    background: '#000A2E', // Darkened version of #001d55
    indicator: '#B58F17', // Darkened version of #fcd021
    color: '#E7ECEF', // Darkened version of #E7ECEF
    selectedColor: '#ffffff', // Keeping the same
  },
};

export const diamondDarkTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: { ...palettes.dark, ...diamondDarkPalette },
  }),
  defaultPageTheme: 'home',
  fontFamily: '"Helvetica Neue", Helvetica, Roboto, Arial, sans-serif',
  /* below drives the header colors */
  pageTheme: {
    home: genPageTheme({
      colors: [defaultPageColor1, defaultPageColor2],
      shape: shapes.wave,
    }),
    documentation: genPageTheme({
      colors: [defaultPageColor1, defaultPageColor2],
      shape: shapes.wave2,
    }),
    tool: genPageTheme({
      colors: [defaultPageColor1, defaultPageColor2],
      shape: shapes.round,
    }),
    service: genPageTheme({
      colors: [defaultPageColor1, defaultPageColor2],
      shape: shapes.wave,
    }),
    website: genPageTheme({
      colors: [defaultPageColor1, defaultPageColor2],
      shape: shapes.wave,
    }),
    library: genPageTheme({
      colors: [defaultPageColor1, defaultPageColor2],
      shape: shapes.wave,
    }),
    other: genPageTheme({
      colors: [defaultPageColor1, defaultPageColor2],
      shape: shapes.wave,
    }),
    app: genPageTheme({
      colors: [defaultPageColor1, defaultPageColor2],
      shape: shapes.wave,
    }),
    apis: genPageTheme({
      colors: [defaultPageColor1, defaultPageColor2],
      shape: shapes.wave,
    }),
  },
});
