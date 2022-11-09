import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { getPhotos } from './services/unsplashService';
import { Card } from './components/Card';
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
      >
        <WrapperCard>
          {data.map(pic => (
            <Card url={'https://images.unsplash.com/photo-1666346166820-67cc5ccdd678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNDk3OTh8MHwxfHJhbmRvbXx8fHx8fHx8fDE2Njc5Nzk2NDg&ixlib=rb-4.0.3&q=80&w=400'} key={pic.id} description={pic.alt_description} />
          ))}
        </WrapperCard>
      </InfiniteScroll>
    </LandingPage>
  );
}

export default App;
