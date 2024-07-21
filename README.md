# React-custom-tours 👩‍🏫🆘🔖

🪲 We recommend installing version starting from 1.3.6 (previous versions have problems) <br>
🎉 A library for creating step-by-step hints in your applications ([Click to open in npm](https://www.npmjs.com/package/react-custom-tours))<br>
🧪 Tested on projects in production (autotests will appear soon) <br>
⭐ I would be grateful if you put a star on the [GitHub repo](https://github.com/kdubasov/react-tours)

### Preview GIF 📹:

![ScreenRecording2024-07-21at1 49 43PM-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/4af0b92a-922b-4903-ac29-1bbeee428476)

### Custom themes 🌗:

![Screenshot 2024-07-21 at 1 48 34 PM](https://github.com/user-attachments/assets/6219edf6-72b1-4224-ad01-b7cfcab67926)
![Screenshot 2024-07-21 at 1 47 54 PM](https://github.com/user-attachments/assets/7976574a-3a0c-470c-a8a0-f4354c7ab4ec)

### Custom colors 💅:

![Screenshot 2024-07-21 at 1 49 16 PM](https://github.com/user-attachments/assets/61d4318f-13a2-4473-8dd9-a8cec97d0160)

## Installation 🔥:

`npm install react-custom-tours`
`pnpm install react-custom-tours`
`yarn add react-custom-tours`

## Features 💫:

- Easy to install in any application (installation time up to 10 minutes);
- Full customization;
- Light/dark mode support out of the box;
- Adaptable to all screen sizes;
- Keyboard control support;
- Animations and smoothness out of the box;
- Can be connected to any components. Also, modal windows with closing on the mousedown event will work, since this event has a stopPropagation listener;

## The gist 👩‍💻:

```javascript
import React from 'react';
import { TipsProvider, useTips } from 'react-custom-tours/dist/app/main';

function App() {
  const { setShow } = useTips(); // you should use this hook inside the provider

  // you can start showing tooltips when rendering the component, or add playback conditions
  // useEffect(() => {
  //     setShow(true);
  // }, []);

  return (
    <div>
      <button onClick={() => setShow(true)}>Show tips!</button>
      <div id="tip-block">
        <h3>First block with tip!</h3>
      </div>

      <p id="tip-text">Text with tip!</p>
    </div>
  );
}

function Main() {
  <TipsProvider
    tips={[
      {
        idx: 1, // decent number of tip playback
        nodeId: 'tip-block', // block with tip id
        title: 'First block tip title!', // tip title (optional key)
        text: 'First block tip text!', // tip text
      },
      {
        idx: 2,
        nodeId: 'tip-text',
        text: 'Text block tip text!',
      },
    ]}
    theme="dark" // light is default (optional)
    primaryColor="#0dcaf0" // your app primary color (optional)
    tooltipBorderColor="#ffc107" // any color of your choice to highlight the block outline (optional)
    escapeToClose // adding closing tour using escape keydown (optional)
    isHiddenClose={true} // hide the close tour button until the last step (optional, default = false) (added in v1.3.8)
  >
    <App />
  </TipsProvider>;
}
```

## Projects that use this library 👍:

- [Merlin Clone](https://merlinclone.com/ru)
- [Quick Offer](https://job-searcher.ru)
