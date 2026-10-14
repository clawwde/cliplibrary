const MODES = [
  {
    key: 'cli',
    label: 'Local Claude CLI',
    detail: 'Use your logged-in Claude subscription via the CLI on this machine.',
  },
  { key: 'oauth', label: 'OAuth token', detail: 'Authenticate with a Claude OAuth token.' },
  { key: 'apiKey', label: 'Anthropic API key', detail: 'Use an Anthropic API key for inference.' },
];

const SettingsPage = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 640 }}>
    <div>
      <h1 style={{ margin: 0, fontSize: 22 }}>Settings</h1>
      <p style={{ color: 'var(--muted)', fontSize: 14 }}>
        Choose how in-app AI editing authenticates. Inference is not wired up yet.
      </p>
    </div>
    <section style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <h2
        style={{
          fontSize: 14,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          color: 'var(--muted)',
        }}
      >
        Claude authentication
      </h2>
      {MODES.map((mode) => (
        <label
          key={mode.key}
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
            padding: 16,
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--panel)',
          }}
        >
          <input type="radio" name="auth-mode" value={mode.key} disabled style={{ marginTop: 3 }} />
          <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{mode.label}</span>
            <span style={{ color: 'var(--muted)', fontSize: 13 }}>{mode.detail}</span>
          </span>
        </label>
      ))}
    </section>
  </div>
);

export default SettingsPage;
