import { createSeedProject } from '@cliplibrary/project';
import { TimelineEditor } from '@/components/timeline/timeline-editor';

export const metadata = {
  title: 'Timeline Editor',
};

const EditorPage = () => <TimelineEditor initialProject={createSeedProject()} />;

export default EditorPage;
