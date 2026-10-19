import { Suspense } from 'react';
import { ExportTile } from '@/components/gallery/export-tile';
import { ClipGalleryRoute } from '@/components/gallery/gallery-route';
import { listClips, listExports } from '@/lib/clips';

export const dynamic = 'force-dynamic';

const HomePage = async () => {
  const [clips, exports] = await Promise.all([listClips(), listExports()]);

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-10">
      <h1 className="font-semibold text-xl tracking-tight">Animations</h1>
      <p className="mt-1 mb-6 text-muted-foreground text-sm">
        Search, filter and open any clip in the editor.
      </p>
      <Suspense fallback={null}>
        <ClipGalleryRoute items={clips} />
      </Suspense>

      <h2 className="mt-12 font-semibold text-xl tracking-tight">Exports</h2>
      {exports.length === 0 ? (
        <p className="mt-1 text-muted-foreground text-sm">
          No exports yet. Open a clip and render one from the editor.
        </p>
      ) : (
        <>
          <p className="mt-1 text-muted-foreground text-sm">
            {exports.length} rendered {exports.length === 1 ? 'export' : 'exports'}.
          </p>
          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {exports.map((record) => (
              <ExportTile key={record.exportId} record={record} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
