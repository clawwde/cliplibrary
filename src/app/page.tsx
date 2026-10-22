import { Suspense } from 'react';
import { ClipGalleryRoute } from '@/components/gallery/gallery-route';
import { listClips } from '@/lib/clips';

export const dynamic = 'force-dynamic';

const HomePage = async () => {
  const clips = await listClips();

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-10">
      <h1 className="font-semibold text-xl tracking-tight">Animations</h1>
      <p className="mt-1 mb-6 text-muted-foreground text-sm">
        Search, filter and open any clip in the editor.
      </p>
      <Suspense fallback={null}>
        <ClipGalleryRoute items={clips} />
      </Suspense>
    </div>
  );
};

export default HomePage;
