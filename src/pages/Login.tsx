import { IonButton, IonContent, IonHeader, IonImg, IonItem, IonNavLink, IonPage, IonRouterLink, IonRouterOutlet, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Login.css';

const Login: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <div className="w-100 h-100 d-flex flex-column overflow-hidden" style={{ backgroundColor: '#1E304D' }}>
                    <div className="top-container">
                        <h1>Sign in to your Account</h1>
                    </div>

                    <div className='form p-3 my-auto text-white'>
                        <h1 className='main-clr mt-5'>Login</h1>

                        <div>
                            <div>
                                <input type="email" className='form-control input' placeholder='Email' />
                            </div>

                            <div>
                                <input type="password" className='form-control input' placeholder='Password' />
                            </div>

                            <div>
                                <div className='text-end py-3 text-primary'>Forgot password?</div>
                            </div>
                        </div>

                        <div className='buttons'>
                            <IonButton routerLink={'/classes'} className='login-btn w-100 button-style'>
                                Login
                            </IonButton>

                            <div>Dont have an account?</div>

                            <IonButton routerLink={'/signup'} fill="outline" className='signup-btn w-100 button-style'>
                                Create new account
                            </IonButton>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>

    );
};

export default Login;

//className='btn w-100 mt-4 rounded text-white py-2' style={{ backgroundColor: '#F26E1D' }}
