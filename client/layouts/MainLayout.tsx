import React, { ReactNode } from 'react';
import NavBar from '../components/NavBar';
import { Container } from '@mui/material';
import Player from '../components/Player';
import Head from 'next/head';

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({title, children, description, keywords}) => {
  return (
    <>
        <Head>
          <title>{title || 'Музыкальная площадка'}</title>
          <meta 
            name='description' 
            content={`Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым! ${description}`} 
          />
          <meta name='robots' content="index, follow" />
          <meta name='keywords' content={keywords} />
          <meta name='viewport' content="width=device-width, initial-scale=1" />
        </Head>
        <NavBar />
        <Container style={{ margin: '90px auto' }}>
            {children}
        </Container>
        <Player />
    </>
  )
}

export default MainLayout;
