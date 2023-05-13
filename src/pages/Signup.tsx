import { IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Signup.css';
import { useHistory } from 'react-router';
import React, { useState } from 'react';

import { myApi } from '../api/api';


const Signup: React.FC = () => {
    const api = myApi;
    const history = useHistory();
    const [nameVal, setNameVal] = useState('');
    const [emailVal, setEmailVal] = useState('');
    const [passVal, setPassVal] = useState('');
    const [confirmPassVal, setConfirmPassVal] = useState('');
    const [opacity, setOpacity] = useState(false);
    const [error, setError] = useState('0');

    function handleSignup() {
        const formData = new FormData();

        formData.append('name', nameVal);
        formData.append('email', emailVal);
        formData.append('pass', passVal);
        formData.append('confirmPass', confirmPassVal);

        fetch(`${api}signup.php`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                if (data == '1') {
                    history.push('/signupsuccess');
                } else {
                    setError(data);
                    setOpacity(true);

                    setTimeout(() => {
                        setOpacity(false);
                    },3000)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <IonPage>
            <IonContent>
                <div className="w-100 h-100 d-flex flex-column" style={{ backgroundColor: '#1E304D' }}>
                    <div className="top-container d-flex flex-column">
                        <h1>Create Account</h1>
                        <span className='text-danger' style={{ opacity: opacity == false ? '0' : '1' }}>{error}</span>
                    </div>

                    <div className='mt-auto' style={{ background: '#18273f', borderTopRightRadius: '15px', borderTopLeftRadius: '15px' }}>
                        <div className='p-2 mb-3 justify-self-end mb-5'>
                            <h1 className='main-clr py-4'>Signup</h1>

                            <input type="text" className='input form-control' placeholder='Full Name' onChange={(e) => { setNameVal(e.target.value) }} />
                            <input type="email" className='input form-control' placeholder='Email' onChange={(e) => { setEmailVal(e.target.value) }} />
                            <input type="password" className='input form-control' placeholder='Password' onChange={(e) => { setPassVal(e.target.value) }} />
                            <input type="password" className='input form-control' placeholder='Confirm Password' onChange={(e) => { setConfirmPassVal(e.target.value) }} />
                        </div>

                        <div className='buttons p-2 mb-5'>
                            <IonButton onClick={handleSignup} className='login-btn w-100 button-style'>
                                Signup
                            </IonButton>
                            <IonButton routerDirection='back' onClick={history.goBack}
                                className='outline-btn w-100 button-style'
                                fill="outline">
                                Back to login
                            </IonButton>
                        </div>
                    </div>

                </div>
            </IonContent>
        </IonPage>
    );
};

export default Signup;
