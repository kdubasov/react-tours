export type TipDataItem = {
  idx: number;
  nodeId: string;
  title?: string;
  text: string;
  maxWidth?: number;
  onClick?: {
    nextButton?: () => void | Promise<void>;
    prevButton?: () => void | Promise<void>;
    closeButton?: () => void | Promise<void>;
  };
};

export type TipDataItemWithNode = TipDataItem & {
  node: HTMLElement | null;
};

/** Опции тура — единый источник правды для провайдера и контекста. */
export type TipsConfig = {
  theme?: 'dark' | 'light';
  customColors?: CustomColors;
  escapeToClose?: boolean;
  isHiddenClose?: boolean;
  /** Паддинг подсветки активного блока, px. */
  highlightPadding?: number;
};

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
