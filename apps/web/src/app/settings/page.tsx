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
  <div className="w-full px-4 py-8 sm:px-6 lg:px-10">
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-semibold text-xl tracking-tight">Settings</h1>
        <p className="mt-1 text-muted-foreground text-sm">
          Choose how in-app AI editing authenticates. Inference is not wired up yet.
        </p>
      </div>
      <section className="flex flex-col gap-3">
        <h2 className="text-[11px] text-muted-foreground uppercase tracking-wider">
          Claude authentication
        </h2>
        {MODES.map((mode) => (
          <label
            key={mode.key}
            className="flex cursor-not-allowed items-start gap-3 rounded-xl bg-card p-4 opacity-80"
          >
            <input type="radio" name="auth-mode" value={mode.key} disabled className="mt-1" />
            <span className="flex flex-col gap-1">
              <span className="font-semibold text-sm">{mode.label}</span>
              <span className="text-muted-foreground text-xs">{mode.detail}</span>
            </span>
          </label>
        ))}
      </section>
    </div>
  </div>
);

export default SettingsPage;
