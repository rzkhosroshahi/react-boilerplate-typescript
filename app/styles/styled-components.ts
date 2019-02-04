import * as styledComponents from 'styled-components';

// theme.ts
// your theme variables
export interface IThemeInterface {
  primary: string;
  componentBackground: string;
  componentBackgroundSecondary: string;
  mediumUp: string;
  mediumOnly: string;
}

interface IBreakpoints {
 medium: number;
}

const breakpoints: IBreakpoints = {
  medium: 1280,
};

export const theme = {

  default: {
    primary: 'red',
    componentBackground: '#fff',
    componentBackgroundSecondary: '#fff',
    mediumUp: `min-width(${breakpoints.medium / 16}em)`,
    mediumOnly: `max-width(${breakpoints.medium  / 16}em)`,
  },
};
const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  IThemeInterface
>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
