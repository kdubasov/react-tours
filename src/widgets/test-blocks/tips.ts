export const tips = [
  {
    idx: 0,
    nodeId: 'test-0',
    title: 'Start tour',
    text: 'This button enables the tour to be shown, but you can also do it automatically, for example use useEffect',
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
    title: 'Tip #1',
    text: 'Example text for block',
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
    title: 'Tip #2',
    text: 'Example text for block. Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.',
  },
  {
    idx: 3,
    nodeId: 'test-3',
    title: 'Tip #3',
    text: 'Example text for block. Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.',
    maxWidth: 400,
  },
  {
    idx: 4,
    nodeId: 'test-4',
    title: 'Tip #4',
    text: 'Example text for block',
  },
  {
    idx: 5,
    nodeId: 'test-5',
    title: 'Tip #5',
    text: 'Example text for block',
  },
  {
    idx: 6,
    nodeId: 'test-6',
    title: 'Tip #6',
    text: 'Example text for block',
  },
];
