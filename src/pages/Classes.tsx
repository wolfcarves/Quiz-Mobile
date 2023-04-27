import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Link } from 'react-router-dom';


const Classes: React.FC = () => {

    const refresh = (event: CustomEvent) => {
        window.location.reload();
        event.detail.complete();
    }

    return (
        <IonPage>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <div className='position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>
                    <Link to="/view" className='d-flex w-100 bg-dark rounded mb-1 text-decoration-none' style={{ height: '8rem' }}>
                        <span className='text-white m-auto'>ClassSample</span>
                    </Link>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Classes;
