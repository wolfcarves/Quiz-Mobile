import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

import { BsCheckLg } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { IconContext } from 'react-icons/lib';
import { myApi } from '../api/api';

import { UserContext } from '../App';

const Join: React.FC = () => {
    const { userLogged, setUserLogged } = React.useContext(UserContext);
    const [classUnqid, setClassUniqid] = useState('');

    const api = myApi;

    let userId = localStorage.getItem('userId');

    useEffect(() => {
        setUserLogged(true);
    }, [])

    function joinClass() {
        const formData = new FormData();

        formData.append('studentId', String(userId));
        formData.append('classUniqueId', classUnqid);

        fetch(`${api}join.php`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err))
    }

    return (
        <IonPage>
            <IonContent>
                <div className='position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>
                    <div>
                        <h1 className='my-3'>Join Class</h1>
                    </div>

                    <input type="email" className='input form-control py-2 mt-2 mb-3 bg-transparent text-white'
                        style={{ border: '0', borderBottom: '1px solid #fff' }} placeholder='Search Class ID' onChange={(e) => { setClassUniqid(e.target.value) }} />

                    <div>
                        <button onClick={joinClass} className='btn w-100 text-white py-2' style={{ backgroundColor: '#F26E1D' }}>Search</button>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Join;
