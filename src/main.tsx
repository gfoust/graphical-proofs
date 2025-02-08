import React from 'react';
import { createRoot } from 'react-dom/client';

import Root from './ui/root';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('root');
  if (node) {
    const root = createRoot(node);
    root.render(<Root/>);
  }
});
