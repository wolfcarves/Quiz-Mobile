import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';

import { BsCheckLg } from 'react-icons/bs'
import { IoMdClose } from 'react-icons/io'
import { IconContext } from 'react-icons/lib';
import { myApi } from '../api/api';

const Inbox: React.FC = () => {
    const api = myApi;

    const refresh = (event: CustomEvent) => {
        window.location.reload();
        event.detail.complete();
    }

    const renderInvitation = () => {
        const formData = new FormData();

        let userId = localStorage.getItem('userId');

        formData.append('userId', String(userId));

        fetch(`${api}render-invitations.php`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                const res = data;


                for (let i = 0; i < res.length; i++) {


                    let content = `<div class='d-flex align-items-center ps-2 w-100 bg-dark rounded mb-1' style="height: 3rem;">
                                        <div class='d-flex'>
                                            <div class='bg-white rounded-circle' style="height: 2rem; width: 2rem;"></div>
                                            <span class='text-white ms-2 my-auto overflow-hidden text-nowrap' style="font-size: 3.7vw; width: 50vw; text-overflow: ellipsis;">Mr. Moralesawdalwikdawdawdhaodwi</span>
                                        </div>
                                    
                                        <div class='d-flex w-25 ms-auto'>
                                            <button class='bg-transparent text-white' style="border-right: 1px solid #fff; font-size: 3.7vw;">
                                                
                                            </button>
                                            <button class='bg-transparent' style="font-size: 3.7vw;">
                                                <ion-icon name="close-circle-outline"></ion-icon>   
                                            </button>
                                        </div>
                                    </div>`;

                    const container = document.querySelector('.main-container');

                    if (container) container.innerHTML = content;
                }
            })
            .catch(err => console.log(err))
    }

    renderInvitation();


    return (
        <IonPage>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>

                <div className='main-container position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>

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