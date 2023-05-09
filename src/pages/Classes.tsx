import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Link, useHistory } from 'react-router-dom';
import { myApi } from '../api/api';

import './Themes.css';
import { UserContext } from '../App';

const refresh = (event: CustomEvent) => {
    window.location.reload();
    event.detail.complete();
}

const Classes: React.FC = () => {
    const history = useHistory();
    const { userLogged, setUserLogged } = React.useContext(UserContext);
    const [studentClass, setStudentClass] = useState([]);

    useEffect(() => {
        setUserLogged(true);
    }, [])

    const api = myApi;

    useEffect(() => {

        const formData = new FormData();

        let userId = localStorage.getItem('userId');

        formData.append('studentId', String(userId));

        fetch(`${api}render-classes.php`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                setStudentClass(data);
            })
            .catch(err => console.log(err))
    }, [])

    function ViewClass(classId: any) {
        history.push(`/viewclass?classid=${classId}`);
    }

    return (
        <IonPage>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <div className='main-container position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>
                    {studentClass.map((item: any, index) => (
                        <div onClick={(e) => { ViewClass(item.classId) }} key={index} className='d-flex w-100 mb-1 text-decoration-none' style={{ height: '8rem' }}>
                            <div className={`rounded p-2 ${item.classTheme}`}>
                                <div className='d-flex flex-column'>
                                    <span className='text-white'>{item.className}</span>
                                    <span className='text-white' style={{ fontSize: '3.5vw' }}>{item.classOwner}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Classes;

/*
<div className='d-flex w-100 mb-1 text-decoration-none' style={{ height: '8rem' }}>
    <div className='theme1 rounded p-2'>
        <div className='d-flex flex-column'>
            <span className='text-white'>ClassSample</span>
            <span className='text-white' style={{fontSize: '3.5vw'}}>Mr. Rodel</span>
        </div>
    </div>
</div>
*/
