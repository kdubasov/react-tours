export const tips = [
  {
    idx: 0,
    nodeId: 'test-0',
    title: 'Welcome aboard',
    text: 'This button starts the tour. You can also trigger it on mount with setIsShow(true).',
    onClick: {
      nextButton: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      },
      prevButton: () => console.log('prev'),
      closeButton: () => console.log('close'),
    },
  },
  {
    idx: 1,
    nodeId: 'test-1',
    title: 'Highlight any element',
    text: 'The spotlight frames the target pixel-perfectly while the rest of the page dims away.',
    onClick: {
      nextButton: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      },
      prevButton: () => console.log('prev1'),
      closeButton: () => console.log('close1'),
    },
  },
  {
    idx: 2,
    maxWidth: 300,
    nodeId: 'test-2',
    title: 'Light & dark',
    text: 'Switch themes with a single prop — or pass fully custom colors per theme.',
  },
  {
    idx: 3,
    nodeId: 'test-3',
    title: 'Async step handlers',
    text: 'Return a promise from a Next or Back handler and the tour shows a spinner until it resolves, then advances.',
    maxWidth: 400,
  },
  {
    idx: 4,
    nodeId: 'test-4',
    title: 'Follows scroll & resize',
    text: 'Even a target this tall stays framed — the highlight is recomputed natively, so it never drifts.',
  },
  {
    idx: 5,
    nodeId: 'test-5',
    title: 'Keyboard control',
    text: 'Press Esc to close the tour at any time.',
  },
  {
    idx: 6,
    nodeId: 'test-6',
    title: 'Plays nice with modals',
    text: 'mousedown is stopped at the overlay, so dialogs that close on outside-click keep working mid-tour.',
  },
  {
    idx: 7,
    nodeId: 'test-7',
    title: 'Nested scroll',
    text: 'Scroll the panel — the spotlight tracks the target inside the container, not just the window.',
  },
  {
    idx: 8,
    nodeId: 'test-8',
    title: 'Still tracked',
    text: 'Even far down a scroll container, the highlight stays locked to its target.',
  },
  {
    idx: 9,
    nodeId: 'test-9',
    title: 'Horizontal scroll',
    text: 'The same tracking works for horizontal scroll containers.',
  },
  {
    idx: 10,
    nodeId: 'test-10',
    title: 'Edge to edge',
    text: 'Tracked all the way to the far end of the track.',
  },
];
