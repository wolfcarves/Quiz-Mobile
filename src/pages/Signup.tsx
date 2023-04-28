import { IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './login.css';
import './Signup.css';
import { useHistory } from 'react-router';

const Signup: React.FC = () => {
    const history = useHistory();

    return (
        <IonPage>
            <IonContent>
                <div className="w-100 h-100 d-flex flex-column p-2" style={{ backgroundColor: '#1E304D' }}>
                    <div>
                        <IonButton routerDirection='back' onClick={history.goBack}
                            className='back-btn'>
                            Back to login
                        </IonButton>
                    </div>

                    <div className='mt-auto'>
                        <div className='p-2 mb-3 justify-self-end'>
                            <h1 className='main-clr'>Signup</h1>

                            <input type="text" className='input form-control' placeholder='Full Name' />
                            <input type="email" className='input form-control' placeholder='Email' />
                            <input type="password" className='input form-control' placeholder='Password' />
                            <input type="password" className='input form-control' placeholder='Confirm Password' />
                        </div>

                        <div className='buttons p-2'>
                            <IonButton routerLink={'/classes'} className='login-btn w-100 button-style'>
                                Signup
                            </IonButton>
                        </div>

                        <div className='p-2'>
                            <IonCheckbox labelPlacement='end'>
                                I agree to the terms and conditions
                            </IonCheckbox>
                        </div>
                    </div>

                </div>
            </IonContent>
        </IonPage>
    );
};

export default Signup;
