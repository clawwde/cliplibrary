import { VideoTile } from '@/components/gallery/video-tile';
import { listClips } from '@/lib/clips';

const HomePage = async () => {
  const clips = await listClips();

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-10">
      <h1 className="font-semibold text-xl tracking-tight">Animations</h1>
      <p className="mt-1 text-muted-foreground text-sm">
        {clips.length} clips. Click any to open the editor.
      </p>
      <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {clips.map((clip) => (
          <VideoTile key={clip.meta.id} meta={clip.meta} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
