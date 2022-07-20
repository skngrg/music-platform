import { Card, Grid, IconButton } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { ITrack } from '../types/track';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { useRouter } from 'next/router';

import styles from '../styles/TrackItem.module.scss';
import { useActions } from '../hooks/useAction';

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    const router = useRouter();
    const { playTrack, pauseTrack, setActiveTrack } = useActions();

    const play = (e) => {
        e.stopPropagation();

        setActiveTrack(track);
        playTrack();
    }

    return (
        <Card className={styles.track} onClick={() => router.push(`/tracks/${track._id}`)}>
            <IconButton onClick={play}>
                {active ? <Pause /> : <PlayArrow />}
            </IconButton>
            <Image width={70} height={70} src={'http://localhost:5001/' + track.picture} alt="picture" />
            <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
                <div>{track.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
            </Grid>
            {active && <div>02:42 / 03:22</div>}
            <IconButton onClick={e => e.stopPropagation()} style={{ marginLeft: 'auto' }}>
                <Delete />
            </IconButton>
        </Card>
    )
}

export default TrackItem;