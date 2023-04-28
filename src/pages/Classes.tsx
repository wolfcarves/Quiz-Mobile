import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonRefresher, IonRefresherContent, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { Link } from 'react-router-dom';
import { myApi } from '../api/api';

import './Themes.css';

const Classes: React.FC = () => {
    const api = myApi;

    const refresh = (event: CustomEvent) => {
        window.location.reload();
        event.detail.complete();
    }

    const renderClasses = () => {
        const formData = new FormData();

        let userId = localStorage.getItem('userId');

        formData.append('userId', String(userId));

        fetch(`${api}render-classes.php`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                const res = data;

                for (let i = 0; i < res.length; i++) {

                    let content = `<a onclick="viewClass" class='d-flex w-100 mb-1 text-decoration-none' style='height: 8rem;'>
                                        <div class='${res.theme} rounded p-2'>
                                            <div class='d-flex flex-column'>
                                                <span class='text-white'>${res.className}</span>
                                                <span class='text-white' style='font-size: 3.5vw;'>${res.classOwner}</span>
                                            </div>
                                        </div>
                                    </a>`;

                    const container = document.querySelector('.main-container');

                    if (container) container.innerHTML = content;
                }
            })
            .catch(err => console.log(err))
    }

    renderClasses();

    return (
        <IonPage>
            <IonContent>
                <IonRefresher slot="fixed" onIonRefresh={refresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                <div className='main-container position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>
                    {/* Where Classes Display */}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Classes;

/*
<a className='d-flex w-100 mb-1 text-decoration-none' style={{ height: '8rem' }}>
    <div className='theme1 rounded p-2'>
        <div className='d-flex flex-column'>
            <span className='text-white'>ClassSample</span>
            <span className='text-white' style={{fontSize: '3.5vw'}}>Mr. Rodel</span>
        </div>
    </div>
</a>
*/
