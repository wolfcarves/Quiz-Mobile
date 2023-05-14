import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonLoading, IonPage, IonRefresher, IonRefresherContent, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { myApi } from '../api/api';

import { UserContext } from '../App';

import './Default.css';
import { AiOutlineSetting } from 'react-icons/ai';
import { IoMdReturnLeft } from 'react-icons/io';

const ViewQuiz: React.FC = () => {
    const history = useHistory();
    const { userLogged, setUserLogged } = React.useContext(UserContext);
    const [studentClass, setStudentClass] = useState([]);
    const [quiz, setQuiz] = useState([]);

    const quizId = new URLSearchParams(useLocation().search).get('quizid');

    useEffect(() => {
        setUserLogged(true);
    }, [location.pathname])

    const api = myApi;

    useEffect(() => {
        const formData = new FormData();

        let userId = localStorage.getItem('userId');

        formData.append('quizId', String(quizId));

        fetch(`${api}view-quiz.php`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                setQuiz(data);
            })
            .catch(err => console.log(err))
    }, [])

    const [btnText, setBtnText] = useState('');
    const [disable, setDisable] = useState(false);
    const [activate, setActivate] = useState(1);

    window.addEventListener('message', function (event) {
        if (event.data === 'updateData') {
            setActivate(prev => prev + 1);
        }
    });

    function verifyQuiz() {
        const newFormData = new FormData();

        let userId = localStorage.getItem('userId');

        newFormData.append('studentId', String(userId));
        newFormData.append('quizId', String(quizId));

        fetch(`${api}verify-quiz.php`, {
            method: 'POST',
            body: newFormData
        })
            .then(res => res.text())
            .then(data => {

                if (data == 'Start Answering') {
                    setBtnText('Start Answering');
                    setDisable(false);
                } else if (data == 'End') {
                    setBtnText('You miss it');
                    setDisable(true);
                } else {
                    setBtnText(data ? data : 'empty');
                    setDisable(true);
                }
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        setInterval(() => {
            verifyQuiz();
        },100)
    }, [activate])

    return (
        <IonPage>
            <IonContent>
                <div className='main-container d-flex flex-column h-100 position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>

                    <div className='p-2'>
                        <button onClick={(e) => {
                            history.goBack()
                        }} className='bg-transparent'><IoMdReturnLeft className='pe-2 fs-1' />Back</button>
                    </div>

                    {quiz.map((item: any, index) => (
                        <div key={index} className='d-flex flex-column h-100 rounded p-2' style={{ fontSize: '0.9em' }}>
                            <div className='text-center py-4 main-clr'>
                                <h1>{item.quizName}</h1>
                            </div>

                            <div className='mb-3 main-clr'>
                                <span>Quiz Details</span>
                            </div>

                            <div>
                                <span>Date Posted : {item.quizDateCreated} </span>
                            </div>

                            <div>
                                <span>Until : {item.quizAvailability}</span>
                            </div>

                            <div>
                                <span>Items : {item.quizLength}</span>
                            </div>

                            <div className='mt-auto mb-3'>

                                <button id="submitBtn"
                                    onClick={() => history.push(`/TakeQuiz?quizid=${quizId}`)}
                                    disabled={disable} className={`w-100 ${disable == true ? 'main-bg-clr-50 text-white' : 'main-bg-clr'}`} style={{ height: '3rem', borderRadius: '15px' }}>
                                    {btnText}{(btnText == 'Start Answering') ? '' : (String(btnText) == 'Score is hidden' || 'End') ? '' : "/" + item.quizLength}
                                </button>

                            </div>

                            <IonLoading trigger="submitBtn" message="Loading Quiz" duration={500} spinner="circles" />
                        </div>
                    ))}

                </div>
            </IonContent>
        </IonPage>
    );
};

export default ViewQuiz;