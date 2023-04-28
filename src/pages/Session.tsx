import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import React, { useState, useContext, createContext } from 'react';

export interface SessionContextData {
    userId: number,
    setUserId: (userId: number) => void
}

export const defaultState = {
    userId: 0,
    setUserId: () => {}
}

export const SessionContext = React.createContext<SessionContextData>(defaultState);


const Session: React.FC = () => {

    const [userId, setUserId] = useState(0); 

    const contextValue: SessionContextData = {
        userId,
        setUserId
    }

    return (
        <>

        </>
    );
};

export default Session;
