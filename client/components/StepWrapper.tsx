import { Card, Grid, Step, StepLabel, Stepper } from '@mui/material';
import { Container } from '@mui/system';
import React, { ReactNode } from 'react';

interface StepWrapperProps {
    activeStep: number;
    children: ReactNode;
};

const STEPS = ['Информация о треке', 'Загрузите обложку', 'Загрузите сам трек'];

const StepWrapper: React.FC<StepWrapperProps> = ({activeStep, children}) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
                {STEPS.map((step, index) => (
                    <Step
                        key={index}
                        completed={activeStep > index}
                    >
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Grid 
                container 
                justifyContent="center" 
                style={{ margin: '70px 0', height: 270 }}
            >
                <Card style={{ width: 600 }}>
                    {children}
                </Card>    
            </Grid>
        </Container>
    );
};

export default StepWrapper;