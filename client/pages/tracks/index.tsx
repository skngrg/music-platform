import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useDispatch } from 'react-redux';
import { Grid, Card, Button, Box, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, searchTrack } from '../../store/actions-creators/track';

const Track = () => {
  const router = useRouter();
  const {tracks, error} = useTypedSelector(state => state.track);
  const [query, setQuery] = useState('');  
  const dispatch = useDispatch() as NextThunkDispatch;
  const [timer, setTimer] = useState(null);

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    if(timer) {
        clearTimeout(timer);
    }

    setTimer(setTimeout(async () => {
        await dispatch(await searchTrack(e.target.value))
    }, 500));
  }

  console.log('*** tracks', tracks);
  

  if (error) {
    return (
        <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    )
  }

  return (
    <MainLayout title="Список треков - музыкальная платформа">
        <Grid container justifyContent='center'>
            <Card style={{ width: 900 }}>
                <Box p={3}>
                    <Grid container justifyContent='space-between'>
                        <h1>Список треков</h1>
                        <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
                    </Grid>
                    <TextField fullWidth value={query} onChange={search} />
                    <TrackList tracks={tracks} />
                </Box>
            </Card>
        </Grid>
    </MainLayout>
  )
}

export default Track;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracks());

    return {
        props: {}
    }
});