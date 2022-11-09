import React, { useState, useEffect } from 'react';
import { getPhotos } from './services/unsplashService';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadPhotos();
  }, [])

  const loadPhotos = async () => {
    const result = await getPhotos();
    setData([...data, ...result]);
  }

  console.log("data: ", data);

  return (
    <div className="App">
      {data.map(pic => (
        <image src={pic.urls.small} />
      ))}
    </div>
  );
}

export default App;
