import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PosterEditor } from '@/components/design-editor/poster-editor';
import { findPosterPack, POSTER_PACK_META } from '@/posters';

export const generateStaticParams = () => POSTER_PACK_META.map((meta) => ({ packId: meta.id }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ packId: string }>;
}): Promise<Metadata> => {
  const { packId } = await params;
  const pack = findPosterPack(packId);
  return { title: pack === undefined ? 'Poster' : `${pack.meta.title} · Clip Library` };
};

const PosterEditorPage = async ({ params }: { params: Promise<{ packId: string }> }) => {
  const { packId } = await params;
  const pack = findPosterPack(packId);
  if (pack === undefined) {
    notFound();
  }
  return <PosterEditor packId={packId} design={pack.build()} />;
};

export default PosterEditorPage;
