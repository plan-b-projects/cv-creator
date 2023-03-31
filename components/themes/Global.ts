import { createGlobalStyle } from "styled-components";
import * as theme from './Theme.styled';
import { Theme } from '../../shared-types';

export const GlobalStyles = createGlobalStyle`
// theme buttons color
.light {
  background-color: ${theme.light.colors.primaryBackground};
}
.dark {
  background-color: ${theme.dark.colors.primaryBackground};
}
.blue {
  background-color: ${theme.blue.colors.primaryBackground};
}
.green {
  background-color: ${theme.green.colors.primaryBackground};
}
.brown {
  background-color: ${theme.brown.colors.primaryBackground};
}
.pink {
  background-color: ${theme.pink.colors.primaryBackground};
}

// active theme
.active{
    border: 3px solid ${(theme: Theme) => theme.colors.border};
}
`;