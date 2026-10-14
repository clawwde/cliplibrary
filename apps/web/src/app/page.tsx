import { ClipCard } from '@/components/gallery/clip-card';
import { listClips, listExports } from '@/lib/clips';

const SectionTitle = ({ title, count }: { title: string; count: number }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
    <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{title}</h2>
    <span style={{ color: 'var(--muted)', fontSize: 13 }}>{count}</span>
  </div>
);

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: 20,
} as const;

const HomePage = async () => {
  const [clips, exports] = await Promise.all([listClips(), listExports()]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <section>
        <SectionTitle title="Clips" count={clips.length} />
        <div style={gridStyle}>
          {clips.map((clip) => (
            <ClipCard
              key={clip.meta.id}
              meta={clip.meta}
              values={clip.props.values as Record<string, unknown>}
            />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle title="Exports" count={exports.length} />
        {exports.length === 0 ? (
          <div
            style={{
              border: '1px dashed var(--border-strong)',
              borderRadius: 'var(--radius-lg)',
              padding: 40,
              textAlign: 'center',
              color: 'var(--muted)',
              fontSize: 14,
            }}
          >
            No exports yet. Open a clip, edit it, and render an mp4 to see it here.
          </div>
        ) : (
          <div style={gridStyle}>
            {exports.map((record) => (
              <a
                key={record.exportId}
                href={record.mp4}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  background: 'var(--panel-raised)',
                }}
              >
                <video
                  src={record.mp4}
                  poster={record.poster}
                  muted
                  loop
                  playsInline
                  style={{ width: '100%', aspectRatio: '16 / 9', background: '#000' }}
                />
                <div style={{ padding: 14, fontSize: 13, color: 'var(--muted)' }}>
                  {record.clipId} · {record.status}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
