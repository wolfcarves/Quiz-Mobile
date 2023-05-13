import React, { useContext, useEffect, useState } from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { UserContext } from '../App';
import { useHistory, useLocation } from 'react-router';
import { myApi } from '../api/api';


const profile: React.FC = () => {
    const api = myApi;

    let userId: any = localStorage.getItem('userId');

    const history = useHistory();
    const location = useLocation();
    const { userLogged, setUserLogged } = React.useContext(UserContext);
    const [studentInfo, setStudentInfo] = useState([]);

    useEffect(() => {
        setUserLogged(true);
    }, [])

    function logout() {
        localStorage.removeItem('userId');
        setUserLogged(false);
        history.push('/');
        window.location.reload();
    }

    useEffect(() => {
        const formData = new FormData();

        formData.append('userId', userId);

        fetch(`${api}profile.php`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                setStudentInfo(data);
            })
            .catch(err => console.log(err))
    }, [])

    //Verify session
    useEffect(() => {
        if (!userId) {
            history.push('/');
            setUserLogged(false);
        }

    }, [location.pathname])

    return (
        <IonPage>
            <IonContent>
                {studentInfo.map((item: any, index) => (
                    <div key={index} className='position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>
                        <div className='d-flex flex-column align-items-center py-3'>
                            <div className='bg-dark rounded-circle' style={{ width: '7rem', aspectRatio: '1' }}></div>
                            <h4 className="text-white mt-2 display-6">{item.studentName}</h4>
                        </div>
                        <div>
                            <h3 style={{ color: '#F26E1D' }}>My Info</h3>

                            <div className='mt-4'>
                                <div>
                                    <label className='text-white'>Full name</label>
                                    <input type="text" className='input form-control py-2 mb-3 bg-transparent text-white'
                                        style={{ border: '0', borderBottom: '1px solid #fff' }} placeholder='Name' disabled value={item.studentName} />
                                </div>

                                <div>
                                    <label className='text-white'>Registered Email</label>
                                    <input type="text" className='input form-control py-2 mb-3 bg-transparent text-white'
                                        style={{ border: '0', borderBottom: '1px solid #fff' }} placeholder='Name' disabled value={item.studentEmail} />
                                </div>

                                <div className='mt-auto'>
                                    <IonButton onClick={logout} color={'danger'} className='w-100 button-style'>
                                        Logout
                                    </IonButton>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </IonContent>
        </IonPage>
    );
};

export default profile;
