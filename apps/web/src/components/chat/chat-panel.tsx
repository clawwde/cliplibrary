'use client';

const EXAMPLES = [
  'Create animated text that says "Hello World" with a spring animation',
  'Make the headline larger and add a glow',
  'Change the background to dark blue',
  'Slow the animation down and stagger the cards',
];

export const ChatPanel = () => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
      <div
        style={{
          background: 'var(--panel-raised)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: 14,
          fontSize: 13,
          lineHeight: 1.55,
          color: 'var(--muted)',
        }}
      >
        <p style={{ marginTop: 0 }}>
          Hi! I can help you create and modify animated scenes. Describe what you want, like:
        </p>
        <ul
          style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}
        >
          {EXAMPLES.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
      </div>
    </div>
    <div style={{ borderTop: '1px solid var(--border)', padding: 12 }}>
      <textarea
        disabled
        placeholder="Describe changes to this scene..."
        rows={2}
        style={{
          width: '100%',
          padding: 10,
          borderRadius: 8,
          border: '1px solid var(--border)',
          background: 'var(--panel)',
          color: 'var(--text)',
          fontFamily: 'inherit',
          fontSize: 13,
          resize: 'none',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 8,
        }}
      >
        <span style={{ fontSize: 11, color: 'var(--muted)' }}>AI editing coming soon</span>
        <button
          type="button"
          disabled
          style={{
            padding: '6px 14px',
            borderRadius: 8,
            border: 'none',
            background: 'var(--border)',
            color: 'var(--muted)',
            fontSize: 13,
          }}
        >
          Update
        </button>
      </div>
    </div>
  </div>
);
