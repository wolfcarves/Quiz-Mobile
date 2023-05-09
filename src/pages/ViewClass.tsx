import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonLoading, IonPage, IonRefresher, IonRefresherContent, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { myApi } from '../api/api';

import { UserContext } from '../App';

import './Default.css';
import { AiOutlineSetting } from 'react-icons/ai';
import { IoMdReturnLeft } from 'react-icons/io';

const refresh = (event: CustomEvent) => {
    window.location.reload();
    event.detail.complete();
}

const ViewClass: React.FC = () => {
    const history = useHistory();
    const { userLogged, setUserLogged } = React.useContext(UserContext);
    const [studentClass, setStudentClass] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    const classId = new URLSearchParams(useLocation().search).get('classid');

    useEffect(() => {
        setUserLogged(true);
    }, [])

    const api = myApi;

    useEffect(() => {
        const formData = new FormData();

        let userId = localStorage.getItem('userId');

        formData.append('studentId', String(userId));
        formData.append('classId', String(classId));

        fetch(`${api}view-class.php`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                setStudentClass(data);
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        const formData = new FormData();

        let userId = localStorage.getItem('userId');

        formData.append('classId', String(classId));

        fetch(`${api}render-quizzes.php`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                setQuizzes(data);
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <IonPage>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <div className='main-container position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>

                    {studentClass.map((item: any, index) => (
                        <div key={index}>
                            <div className='d-flex justify-content-between align-items-center py-2 px-2'>
                                <button onClick={(e) => { history.goBack() }} className='bg-transparent'><IoMdReturnLeft className='pe-2 fs-1' />Back</button>

                                <button className='p-2 rounded bg-transparent fs-3'>
                                    <AiOutlineSetting className='d-flex' />
                                </button>
                            </div>

                            <div className='main-clr rounded py-2 px-2'>
                                <h3 className='m-0 text-center'>{item.className}</h3>
                            </div>
                        </div>
                    ))}
                    <div className='px-3 mt-2 oveflow-auto'>

                        <div>
                            {quizzes
                                .sort((a: any, b: any) => b.quizId - a.quizId)
                                .map((item: any, index) => (
                                    <div key={index} className='mb-3'>
                                        <div className='rounded-pill border border-primary p-2'>

                                            <div className='d-flex align-items-center justify-content-between'>
                                                <span style={{ fontSize: '0.9em' }}>{item.quizName}</span>
                                                <button onClick={(e) => { history.push(`/viewquiz?quizid=${item.quizId}`) }} className='rounded-pill px-3 py-1 main-bg-clr' style={{ fontSize: '0.9em' }}>Take</button>
                                            </div>

                                        </div>

                                        <div className='text-center'>
                                            <i style={{ fontSize: '0.8em' }}>{item.quizDateCreated}</i>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>



                </div>
            </IonContent>
        </IonPage>
    );
};

export default ViewClass;

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
