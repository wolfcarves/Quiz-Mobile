import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

import { BsCheckLg } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { IconContext } from 'react-icons/lib';


const Inbox: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <div className='position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>
                    <div className='d-flex align-items-center px-2 w-100 bg-dark rounded mb-1' style={{ height: '3rem' }}>
                        <div className='d-flex'>
                            <div className='bg-white rounded-circle' style={{ width: '2rem', height: '2rem' }}></div>
                            <span className='text-white ms-2 my-auto'>Mr. Morales</span>
                        </div>

                        <div className='ms-auto'>
                            <button className='bg-transparent px-2 text-white' style={{ borderRight: '1px solid #fff' }}>
                                <IconContext.Provider value={{ size: '1.3em', color: '#fff' }}>
                                    <BsCheckLg />
                                </IconContext.Provider>
                            </button>
                            <button className='bg-transparent px-2'>
                                <IconContext.Provider value={{ size: '1.3em', color: '#fff' }}>
                                    <IoMdClose />
                                </IconContext.Provider>
                            </button>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage> 
    );
};

export default Inbox;
