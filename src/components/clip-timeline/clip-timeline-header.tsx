export const ClipTimelineHeader = ({ title }: { title: string }) => (
  <div className="sticky top-0 z-10 bg-sidebar/80 px-4 py-3 backdrop-blur">
    <span className="block truncate font-semibold text-sm">{title}</span>
  </div>
);
