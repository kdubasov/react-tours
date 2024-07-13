export type TipDataItem = {
  idx: number;
  nodeId: string;
  title?: string;
  text: string;
};

export interface TipDataItemWithNode extends TipDataItem {
  node: HTMLElement | null;
}
