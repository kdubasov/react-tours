# React-tips
`🎉 A library for creating step-by-step hints in your applications`

---------

![preview](https://github.com/user-attachments/assets/5a29e1ec-dd68-4de0-b233-36fa112f14d2)
![light-tt](https://github.com/user-attachments/assets/b7664ff2-6bfa-41e1-aad9-8d3c08dae7e0)
![dark-tt](https://github.com/user-attachments/assets/80f9d7ae-ed87-4bf4-931d-051251f095e1)
![custom-colors](https://github.com/user-attachments/assets/50acbfc2-0908-4055-834e-cc4dcec5fe6d)


## Installation

---------
`npm install --save react-tips`
`yarn add react-tips`

## Features

---------
- Easy to install in any application (installation time up to 10 minutes)
- Full customization
- Light/dark mode support out of the box
- Adaptable to all screen sizes
- Keyboard control support
- Animations and smoothness out of the box

## The gist

---------

```javascript
    import React from 'react';
    import { Provider, useTips } from 'react-tips';
    
    function App(){
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
        <Provider 
          tips={[
            {
              idx: 1, // decent number of tip playback
              nodeId: 'tip-block', // block with tip id
              title: 'First block tip title!', // tip title (optional key)
              text: 'First block tip text!' // tip text
            },
            {
              idx: 2,
              nodeId: 'tip-text',
              text: 'Text block tip text!'
            },
          ]}
          theme="dark" // light is default (optional)
          primaryColor="#0dcaf0" // your app primary color (optional)
          tooltipBorderColor="#ffc107" // any color of your choice to highlight the block outline (optional)
          escapeToClose // adding closing tour using escape keydown (optional)
        >
          <App />
        </Provider>
    }
```
