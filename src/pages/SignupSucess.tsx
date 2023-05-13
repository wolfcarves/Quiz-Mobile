import { IonButton, IonCheckbox, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { useHistory } from 'react-router';

import './SignupSucess.css';

const SignupSucess: React.FC = () => {
    const history = useHistory();

    return (
        <IonPage>
            <IonContent>
                <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: '#1E304D' }}>
                    <div className='d-flex flex-column  text-center'>
                        <div>
                            <IoMdCheckmarkCircle className='text-success' style={{ fontSize: '4em' }} />
                        </div>
                        <h3 className='mt-3'>Signup Successfully</h3>
                    </div>

                    <IonButton className='login-link mt-4' onClick={(e) => {history.push('/login')}}>
                        Login
                    </IonButton>

                </div>
            </IonContent>
        </IonPage>
    );
};

export default SignupSucess;
