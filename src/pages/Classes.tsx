import { IonButton, IonContent, IonHeader, IonPage, IonRouterLink, IonTabBar, IonNavLink, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Link } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import React, { useContext } from 'react';

const classes: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <div className='position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>
                    {/* Card Row */}
                    <Link to="/view" className='d-flex w-100 bg-dark rounded mb-1 text-decoration-none' style={{ height: '8rem' }}>
                        <span className='text-white m-auto'>Class</span>
                    </Link>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default classes;
