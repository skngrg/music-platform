import { Button, Grid, TextField } from '@mui/material';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/track';

import axios from 'axios';
import { useInput } from '../../hooks/useInput';

const TrackPage = ({serverTrack}) => {
  const [track, setTrack] = useState<ITrack>(serverTrack);  
  const router = useRouter();

  const username = useInput('');
  const text = useInput('');

  const addComment = async () => {
    try {
        const response = await axios.post('http://localhost:5001/tracks/comment', {
            username: username.value,
            text: text.value,
            trackId: track._id
        });

        setTrack({...track, comments: [...track.comments, response.data]});
    } catch (e) {
        console.log(e);
    }
  }
    
  return (
    <MainLayout title={`Музыкальная платформа - ${track.name} - ${track.artist}`}>
        <Button 
            variant='outlined' 
            onClick={() => router.push('/tracks')}
            style={{ fontSize: 32 }}
        >
            К списку
        </Button>
        <Grid container style={{ margin: '20px 0' }}>
            <Image src={'http://localhost:5001/' + track.picture} width={200} height={200} alt='picture' />
            <div style={{ margin: 30 }}>
                <h1>Название трека - {track.name}</h1>
                <h1>Исполнитель - {track.artist}</h1>
                <h1>Прослушиваний - {track.listens}</h1>
            </div>
        </Grid>
        <h1>Слова в треке</h1>
        <p>{track.text}</p>
        <h1>Комментарии</h1>
        <Grid container>
            <TextField
                {...username}
                label="Ваше имя"
                fullWidth
            />
            <TextField
                {...text}
                label="Комментарий"
                fullWidth
                multiline
                rows={4}
            />
            <Button onClick={addComment}>Отправить</Button>
        </Grid>
        <>
            {track.comments.map(comment => (
                <>
                    <div>Автор - {comment.username}</div>
                    <div>Комментарий - {comment.text}</div>
                </>
            ))}
        </>
    </MainLayout>
  )
}

export default TrackPage;

export const getServerSideProps: GetServerSideProps = (async ({params}) => {
    const response = await axios.get('http://localhost:5001/tracks/' + params.id);
    return {
        props: {
            serverTrack: response.data
        }
    }
});