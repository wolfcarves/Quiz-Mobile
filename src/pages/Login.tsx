import { IonButton, IonContent, IonHeader, IonImg, IonItem, IonLoading, IonNavLink, IonPage, IonRouterLink, IonRouterOutlet, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect, useContext } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Login.css';
import { useHistory } from 'react-router';

import { myApi } from '../api/api';
import { UserContext } from '../App';

const Login: React.FC = () => {
    const api = myApi;
    const history = useHistory();

    const [emailVal, setEmailVal] = useState('');
    const [passVal, setPassVal] = useState('');
    const [opacity, setOpacity] = useState(false);

    const { userLogged, setUserLogged } = React.useContext(UserContext);

    function handleLogin() {
        const formData = new FormData();

        formData.append('email', emailVal);
        formData.append('pass', passVal);

        fetch(`${api}login.php`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                const res = data;

                localStorage.setItem('userId', res.userId);

                if (res.response == '1') {
                    setTimeout(() => {
                        setUserLogged(true);
                        redirect();
                    }, 3000)
                } else {
                    setTimeout(() => {
                        invalidCred();
                    }, 3000)
                }
            })
            .catch(err => console.log(err))
    }

    function redirect() {
        history.push('/classes');
    }

    function invalidCred() {
        setOpacity(prevVal => !prevVal);

        setTimeout(() => {
            setOpacity(prevVal => !prevVal);
        }, 5000)
    }

    return (
        <IonPage>
            <IonContent>
                <div className="w-100 h-100 d-flex flex-column overflow-hidden" style={{ backgroundColor: '#1E304D' }}>
                    <div className="top-container d-flex flex-column">
                        <h1>Sign in to your Account</h1>
                        <span className='text-danger' style={{ opacity: opacity == false ? '0' : '1' }}>Invalid credentials</span>
                    </div>

                    <div className='form p-3 my-auto text-white'>
                        <h1 className='main-clr mt-5'>Login</h1>

                        <div>
                            <div>
                                <input type="email" className='form-control input' placeholder='Email' onChange={(e) => setEmailVal(e.target.value)} />
                            </div>

                            <div>
                                <input type="password" className='form-control input' placeholder='Password' onChange={(e) => setPassVal(e.target.value)} />
                            </div>

                            <div>
                                <div className='text-end py-3 text-primary'>Forgot password?</div>
                            </div>
                        </div>

                        <div className='buttons'>
                            <IonButton id="open-loading" onClick={handleLogin} className='login-btn w-100 button-style'>
                                Login
                            </IonButton>

                            <div>Dont have an account?</div>

                            <IonButton onClick={() => { history.push('/signup') }} fill="outline" className='signup-btn w-100 button-style'>
                                Create new account
                            </IonButton>
                        </div>
                    </div>
                </div>

                <IonLoading trigger="open-loading" message="Logging In" duration={3000} spinner="circles" />
            </IonContent>
        </IonPage>

    );
};

export default Login;