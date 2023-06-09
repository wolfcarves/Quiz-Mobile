import React from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

import { BsCheckLg } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { IconContext } from 'react-icons/lib';
import { myApi } from '../api/api';
import { useEffect, useState } from 'react';

import './Default.css';
import { UserContext } from '../App';

const refresh = (event: CustomEvent) => {
    window.location.reload();
    event.detail.complete();
}

const Inbox: React.FC = () => {
    const { userLogged, setUserLogged } = React.useContext(UserContext);

    useEffect(() => {
        setUserLogged(true);
    }, [])

    const api = myApi;

    const [invitationData, setInvitationData] = useState([]);
    const [acceptInviteData, setAcceptInviteData] = useState([]);
    const [classId, setClassId] = useState();

    useEffect(() => {
        const renderFormData = new FormData();

        let userId = localStorage.getItem('userId');

        renderFormData.append('userId', String(userId));

        fetch(`${api}render-invitations.php`, {
            method: 'POST',
            body: renderFormData
        })
            .then(response => response.json())
            .then(data => {
                setInvitationData(data);
            })
            .catch(err => console.log(err))
    }, [])


    const acceptInvite = (event: React.MouseEvent<HTMLButtonElement>) => {
        const acceptFormData = new FormData();
        const acceptBtn = event.target as HTMLElement;
        const parent = acceptBtn.parentElement as HTMLElement;
        const grandParent = parent.parentElement;
        const classUniqueId = grandParent?.dataset.classUniqueId
        if (grandParent) grandParent.remove();

        let userId = localStorage.getItem('userId');

        acceptFormData.append('studentId', String(userId));
        acceptFormData.append('classUniqueId', String(classUniqueId));

        fetch(`${api}accept-invitation.php`, {
            method: 'POST',
            body: acceptFormData
        })
            .then(response => response.text())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err))
    }

    const declineInvite = (event: React.MouseEvent<HTMLButtonElement>) => {
        const declineBtn = event.target as HTMLElement;
        const parent = declineBtn.parentElement as HTMLElement;
        const grandParent = parent.parentElement;
        const classUniqueId = grandParent?.dataset.classUniqueId
        if (grandParent) grandParent.remove();

        const declineForm = new FormData();

        let userId = localStorage.getItem('userId');
        
        declineForm.append('studentId', String(userId));
        declineForm.append('classUniqueId', String(classUniqueId));

        fetch(`${api}decline-invitation.php`, {
            method: 'POST',
            body: declineForm
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
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <div className='main-container position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D', fontSize: '3.5vw' }}>
                    {invitationData.map((item: any, index) => (
                        <div key={index} className='d-flex flex-column p-2 w-100 rounded mb-2 border shadow-lg blur-bg' data-class-unique-id={item.classUniqueId} >
                            <div>
                                <div className='d-flex'>
                                    <div className='border rounded-circle' style={{ width: '2rem', height: '2rem', background: `url('src/uploads/avatar.png')`, backgroundSize: 'cover' }}></div>
                                    <span className='text-white ms-2 my-auto overflow-hidden text-nowrap' style={{ fontSize: '3.7vw', width: '50vw', textOverflow: 'ellipsis' }}>{item.classOwner}</span>
                                </div>
                            </div>

                            <div>
                                <div className="px-1 py-3">
                                    <div className="">{item.classOwner} is inviting you to {item.className}</div>
                                    <div className="mt-3">{item.dateSent}</div>
                                </div>
                            </div>

                            <div className='d-flex ms-auto'>
                                <button onClick={(e) => {
                                    setClassId(item.classId)
                                    acceptInvite(e);
                                }} className='rounded px-2 py-1 text-white' style={{ background: '#F26E1D' }}>
                                    Accept
                                </button>

                                <button onClick={(e) => {
                                    setClassId(item.classId)
                                    declineInvite(e);
                                }} className='rounded ms-2 px-2 py-1 text-white bg-danger' style={{ background: '#F26E1D' }}>
                                    Decline
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Inbox;

/*
<div className='d-flex align-items-center ps-2 w-100 bg-dark rounded mb-1' style={{ height: '3rem' }}>
    <div className='d-flex'>
        <div className='bg-white rounded-circle' style={{ width: '2rem', height: '2rem' }}></div>
        <span className='text-white ms-2 my-auto overflow-hidden text-nowrap' style={{fontSize: '3.7vw', width: '50vw', textOverflow: 'ellipsis'}}>Mr. Moralesawdalwikdawdawdhaodwi</span>
    </div>

    <div className='d-flex w-25 ms-auto'>
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
*/