import { ClipGalleryRoute } from '@/components/gallery/gallery-route';
import { listClips } from '@/lib/clips';
import { listPosters } from '@/lib/posters';

const HomePage = () => {
  const clips = listClips();

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-10">
      <h1 className="font-semibold text-xl tracking-tight">Library</h1>
      <p className="mt-1 mb-6 text-muted-foreground text-sm">
        Search, filter and open any animation or poster in its editor.
      </p>
      <ClipGalleryRoute items={[...clips, ...listPosters()]} />
    </div>
  );
};

export default HomePage;
