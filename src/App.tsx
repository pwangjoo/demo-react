import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import firebaseConfig from './firebase.json';

function App() {
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const [disabled, setDisabled] = useState(false);
  const [blob, setBlob] = useState<any>(null);
  const [image, setImage] = useState('');
  const onChange = (e: any)=> {
    const _blob = e?.target?.files?.[0];
    if (_blob) {
      const url = URL.createObjectURL(_blob);
      setImage(url);
      setBlob(_blob);
    } else setImage('');
  };
  const onSubmit = async (e: any)=> {
    setDisabled(true);
    e.preventDefault();
    if (blob) {
      const storage = getStorage();
      const storageRef = ref(storage, blob.name);
      const result = await uploadBytes(storageRef, blob)
        .catch((err: any)=> console.log(err));
      if (result) {
        logEvent(analytics, 'share', { content_type: 'image', item_id: blob.name });
        console.log('Success!')
      };
    } else console.log('No image!');
    setDisabled(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        {!image ? 
          <img src={logo} className="App-logo" alt="logo" />
          : <img src={image} className="App-preview" alt="preview" />
        }
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <form onSubmit={onSubmit}>
          <input type='file' accept='image/*' onChange={onChange} />
          &nbsp;&nbsp;
          <input type='submit' disabled={disabled} />
        </form>
        {/* <br />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
