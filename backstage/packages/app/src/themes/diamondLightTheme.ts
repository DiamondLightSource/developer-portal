import {
  createBaseThemeOptions,
  createUnifiedTheme,
  genPageTheme,
  palettes,
  shapes,
} from '@backstage/theme';

const defaultPageColor1: string = '#8c4351';
const defaultPageColor2: string = '#343b58';

// https://diamondlightsource.github.io/web-ui-components/?path=/docs/theme-colours--docs
// 50#FBFBFB
// 75#F7F7F7
// 100#E7ECEF
// 200#CBD5E0
// 300#39435E
// 400#9BBBFA
// 500#fcd021
// 600#385BBD
// 700#1040A1
// 800#001d55

const diamondLightPalette = {
  primary: {
    main: '#385BBD', // Based on 600#385BBD
  },
  secondary: {
    main: '#CBD5E0', // Based on 200#CBD5E0
  },
  error: {
    main: defaultPageColor1, // Keeping the same as no corresponding color provided
  },
  warning: {
    main: '#fcd021', // Based on 500#fcd021
  },
  info: {
    main: '#1040A1', // Based on 700#1040A1
  },
  success: {
    main: '#39435E', // Based on 300#39435E
  },
  background: {
    default: '#FBFBFB', // Based on 50#FBFBFB
    paper: '#F7F7F7', // Based on 75#F7F7F7
  },
  banner: {
    info: '#1040A1', // Based on 700#1040A1
    error: defaultPageColor1, // Keeping the same as no corresponding color provided
    text: '#39435E', // Based on 300#39435E
    link: '#CBD5E0', // Based on 200#CBD5E0
  },
  errorBackground: defaultPageColor1, // Keeping the same as no corresponding color provided
  warningBackground: '#fcd021', // Based on 500#fcd021
  infoBackground: '#1040A1', // Based on 700#1040A1
  navigation: {
    background: '#001d55', // Based on 800#001d55
    indicator: '#fcd021', // Based on 500#fcd021
    color: '#E7ECEF', // Based on 100#E7ECEF
    selectedColor: '#ffffff', // Keeping the same
  },
};

export const diamondLightTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: { ...palettes.light, ...diamondLightPalette },
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
