import type { Metadata } from 'next';
import { BlankDesign } from '@/components/design-editor/blank-design';
import { DESIGN_FORMATS, findDesignFormat } from '@/design';

export const metadata: Metadata = { title: 'New design · Clip Library' };

const NewDesignPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ format?: string | string[] }>;
}) => {
  const { format } = await searchParams;
  const resolved = findDesignFormat(typeof format === 'string' ? format : '') ?? DESIGN_FORMATS[0];
  return <BlankDesign formatId={resolved.id} />;
};

export default NewDesignPage;
