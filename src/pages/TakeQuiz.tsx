import React, { useState, useEffect } from 'react';
import { IonButton, IonContent, IonHeader, IonIcon, IonLoading, IonPage, IonRefresher, IonRefresherContent, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { myApi } from '../api/api';

import { UserContext } from '../App';

import './Default.css';
import { AiOutlineSetting } from 'react-icons/ai';
import { IoMdReturnLeft } from 'react-icons/io';

const TakeQuiz: React.FC = () => {
    const history = useHistory();
    const { userLogged, setUserLogged } = React.useContext(UserContext);
    const [studentClass, setStudentClass] = useState([]);
    const [question, setQuestion] = useState([]);

    const quizId = new URLSearchParams(useLocation().search).get('quizid');

    useEffect(() => {
        setUserLogged(false);
    }, [])

    const api = myApi;

    useEffect(() => {
        const formData = new FormData();

        let userId = localStorage.getItem('userId');

        formData.append('quizId', String(quizId));

        fetch(`${api}render-questions.php`, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setQuestion(data);
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <IonPage>
            <IonContent>
                <div className='main-container d-flex flex-column h-100 position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>

                    <div>

                        {question.map((question: any, questionIndex) => (
                            <div key={questionIndex} className='border rounded rounded p-2 mt-3 mb-4'>
                                <div>
                                    {question.question}
                                </div>

                                <div className='mt-4'>
                                    {question.choice.map((choice: any, choiceIndex: any) => (
                                        <div key={choiceIndex} className='border py-1 px-2 rounded mb-2'>
                                            <input type="radio" name="ans1" id="choice1" />
                                            <label htmlFor='choice1'>{choice}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>




                    <div className='mt-auto mb-2'>
                        <button id="open-loading" onClick={(e) => { history.push('/TakeQuiz') }} className='main-bg-clr w-100' style={{ height: '3rem', borderRadius: '15px' }}>Submit</button>
                    </div>

                </div>
            </IonContent>
        </IonPage>
    );
};

export default TakeQuiz;