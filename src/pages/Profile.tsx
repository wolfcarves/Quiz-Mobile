import { IonButton, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';


const profile: React.FC = () => {
    return (
        <div className='position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>
            <div className='d-flex flex-column align-items-center py-3'>
                <div className='bg-dark rounded-circle' style={{ width: '7rem', aspectRatio: '1' }}></div>
                <h4 className="text-white mt-2 display-6">Rodel Crisosto</h4>
            </div>

            <div>
                <h3 style={{ color: '#F26E1D' }}>My Info</h3>

                <div className='mt-3'>
                    <div>
                        <label className='text-white'>Full name</label>
                        <input type="text" className='input form-control py-2 mb-3 bg-transparent text-white'
                            style={{ border: '0', borderBottom: '1px solid #fff' }} placeholder='Name' disabled value="Rodel Crisosto" />
                    </div>

                    <div>
                        <label className='text-white'>Registered Email</label>
                        <input type="text" className='input form-control py-2 mb-3 bg-transparent text-white'
                            style={{ border: '0', borderBottom: '1px solid #fff' }} placeholder='Name' disabled value="rodel.crisosto7@gmail.com" />
                    </div>

                    <div>
                        <label className='text-white'>Total Classes</label>
                        <input type="text" className='input form-control py-2 mb-3 bg-transparent text-white'
                            style={{ border: '0', borderBottom: '1px solid #fff' }} placeholder='Name' disabled value="0" />
                    </div>
                </div>
            </div>


        </div>
    );
};

export default profile;
