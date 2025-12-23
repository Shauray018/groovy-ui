import { DocsConfig } from '../types/docs.types';

export const DOCS_CONFIG: DocsConfig = {
  gettingStarted: {
    title: 'Getting Started',
    items: [
      { slug: 'introduction', title: 'Introduction' },
      { slug: 'installation', title: 'Installation' },
      { slug: 'usage', title: 'Usage' }
    ]
  },
  components: {
    title: 'Components',
    items: [
      { slug: 'button', title: 'Button' },
      { slug: 'input', title: 'Input' },
      { slug: 'card', title: 'Card' },
      { slug: 'modal', title: 'Modal' },
      { slug: 'dropdown', title: 'Dropdown' }
    ]
  }
};
