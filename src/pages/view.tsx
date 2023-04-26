import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

const view: React.FC = () => {
    return (
        <div className='position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>
            <div className='bg-dark border border-2 rounded p-3'>
                <h1 style={{ color: '#F26E1D' }}>Classname</h1>
                <span className='text-white'>Mr. Morales A. De Poles</span>
            </div>
        </div>
    );
};

export default view;
