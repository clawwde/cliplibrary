export const posterPreviewFileName = (pageIndex: number): string =>
  `${String(pageIndex + 1).padStart(2, '0')}.jpg`;
