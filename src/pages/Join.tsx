import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

import { BsCheckLg } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { IconContext } from 'react-icons/lib';

import './login.css'

const Join: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <div className='position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>
                    <input type="email" className='input form-control py-2 mt-2 mb-3 bg-transparent text-white'
                        style={{ border: '0', borderBottom: '1px solid #fff' }} placeholder='Search Class ID' />

                    <div>
                        <a href="#" className='btn w-100 rounded text-white py-2' style={{ backgroundColor: '#F26E1D' }}>Search</a>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Join;
