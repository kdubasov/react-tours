export type TipDataItem = {
  idx: number;
  nodeId: string;
  title?: string;
  text: string;
  maxWidth?: number;
};

export interface TipDataItemWithNode extends TipDataItem {
  node: HTMLElement | null;
}

export type CustomColors = {
  light: Partial<ColorTheme>;
  dark: Partial<ColorTheme>;
};

type ColorTheme = {
  dark: string;
  gray: string;
  lightGray: string;
  light: string;
  lightColor: string;
  primary: string;
  highlightBorder: string;
};
