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
  bgPrimary: string;
  textPrimary: string;
  layoutPrimary: string;
  primary: string;
};
