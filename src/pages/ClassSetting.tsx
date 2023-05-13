import React, { useState, useEffect } from 'react';
import { IonButton, IonChip, IonContent, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Link, useHistory } from 'react-router-dom';
import { myApi } from '../api/api';

import './Default.css';
import './Themes.css';
import { UserContext } from '../App';
import { IoMdReturnLeft } from 'react-icons/io';
import { BsGlobeAmericas } from 'react-icons/bs';

const ClassSetting: React.FC = () => {
    const history = useHistory();

    const { userLogged, setUserLogged } = React.useContext(UserContext);
    useEffect(() => {
        setUserLogged(true);
    }, [])

    return (
        <IonPage>
            <IonContent>
                <div className='main-container position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>

                    <div className='d-flex flex-column h-100'>
                        <div className='d-flex justify-content-between align-items-center py-2 px-2'>
                            <button onClick={(e) => { history.goBack() }} className='bg-transparent'><IoMdReturnLeft className='pe-2 fs-1' />Back</button>
                        </div>

                        <div className='d-flex flex-column p-2 my-2'>
                            <h4 className='main-clr'>Class Code</h4>
                            <div className='d-flex'>
                                <div className='py-2'>1230182370127401247</div>
                                <IonChip outline={true} className='ms-2'>Copy</IonChip>
                            </div>
                        </div>

                        <div className='d-flex justify-content-center flex-column p-2 my-2'>
                            <h4 className='main-clr'>Class Privacy</h4>

                            <div className="d-flex align-items-center">
                                <span>Public</span>
                                <BsGlobeAmericas className='d-flex ms-2 mb-1' />
                            </div>
                        </div>

                        <div className='mt-auto'>
                            <IonButton color={'danger'} className='w-100 button-style'>
                                Leave Class
                            </IonButton>
                        </div>
                    </div>

                </div>
            </IonContent>
        </IonPage>
    );
};

export default ClassSetting;

