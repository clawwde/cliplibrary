import { renderPageDataUrl } from '@/components/design-editor/render-page';
import { POSTER_PACKS } from '@/posters';

interface PosterPreviewApi {
  packs: () => { id: string; pageCount: number }[];
  render: (packId: string, pageIndex: number, width: number) => Promise<string>;
}

const api: PosterPreviewApi = {
  packs: () => POSTER_PACKS.map((pack) => ({ id: pack.meta.id, pageCount: pack.meta.pageCount })),
  render: (packId, pageIndex, width) => {
    const pack = POSTER_PACKS.find((item) => item.meta.id === packId);
    const design = pack?.build();
    const page = design?.pages[pageIndex];
    if (design === undefined || page === undefined) {
      return Promise.reject(new Error(`Unknown poster ${packId} page ${pageIndex}`));
    }
    return renderPageDataUrl(design, page, {
      pixelRatio: width / design.width,
      mimeType: 'image/jpeg',
      quality: 0.82,
    });
  },
};

Object.assign(window, { posterPreview: api });
