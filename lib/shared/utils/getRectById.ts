import { mockDomRect } from '@/shared/mock-data';

export const getRectById = (id: string | undefined): DOMRect => {
  if (!id) {
    return mockDomRect;
  }

  return document.getElementById(id)?.getBoundingClientRect() || mockDomRect;
};
