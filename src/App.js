import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { getPhotos } from './services/unsplashService';
import { Card } from './components/Card';
import { Loading } from './components/Loading';
import './App.css';

const LandingPage = styled.div`
  padding: 10vh;
  display: flex;
  justify-content:center;
  align-items: center;
  min-height: 100vh;
  background: #212121;
  font-family: sans-serif;
`;

const WrapperCard = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 45px;
  margin: 0 auto;
`;

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    const result = await getPhotos();
    setData([...data, ...result]);
  }

  console.log("data: ", data);

  return (
    <LandingPage>
      <InfiniteScroll
        dataLength={data.length}
        next={loadPhotos}
        hasMore={true}
        loader={<Loading />}
      >
        <WrapperCard>
          {data.map(pic => (
            <Card url={pic.urls.small} key={pic.id} caption={pic.description} />
          ))}
        </WrapperCard>
      </InfiniteScroll>
    </LandingPage>
  );
}

export default App;
