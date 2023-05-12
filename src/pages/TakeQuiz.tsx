import React, { useState, useEffect } from 'react';
import { IonAlert, IonButton, IonContent, IonHeader, IonIcon, IonLoading, IonPage, IonRefresher, IonRefresherContent, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
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
    const [answer, setAnswer] = useState([]);
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
                setQuestion(data);
            })
            .catch(err => console.log(err))

    }, [])

    function select() { //This function is for adding background color to selected answer
        const inputs = document.querySelectorAll<HTMLInputElement>('input[type="radio"]');

        inputs.forEach(input => {
            const parent = input.parentElement;
            if (parent) parent.style.backgroundColor = 'transparent';
        })

        inputs.forEach(input => {
            if (input.checked == true) {
                const parent = input.parentElement;
                if (parent) parent.style.backgroundColor = '#32a852';
            }
        })
    }

    let answersArr: any = [];

    function getAnswers() {
        const inputs = document.querySelectorAll<HTMLInputElement>('input[type="radio"]');

        answersArr = [];

        inputs.forEach((input, index) => {
            if (input.checked == true) {
                answersArr.push(input.value);
            }
        })
        setAnswer(answersArr);
    }

    const [disable, setDisable] = useState(true);

    function validateAnswers() {
        getAnswers();
        if (answersArr.length != question.length) {
            setDisable(true);
            return;
        } else {
            setDisable(false)
        }
    }

    function submitQuizForm() {
        const formData = new FormData();

        let userId = localStorage.getItem('userId');

        formData.append('userId', String(userId));
        formData.append('quizId', String(quizId));
        formData.append('questionArray', JSON.stringify(question));
        formData.append('answerArray', JSON.stringify(answer));

        validateAnswers();

        fetch(`${api}submit-answer.php`, {
            method: 'POST',
            body: formData
        })
            .catch(err => console.log(err))
    }

    return (
        <IonPage>
            <IonContent>
                <div className='main-container d-flex flex-column h-100 position-absolute top-0 bottom-0 w-100 p-2 overflow-auto' style={{ backgroundColor: '#1E304D' }}>

                    <div className='text-center'>
                        {question.map((question: any, questionIndex) => (
                            <div key={questionIndex} className='border rounded rounded p-2 mt-3 mb-4'>

                                <div>
                                    {question.question}
                                </div>

                                <input type="hidden" name={`question${question.questionId}`} value={question.questionId} />

                                <div className='d-flex flex-column mt-4'>
                                    {question.choice.map((choice: any, choiceIndex: any) => (
                                        <label key={choiceIndex} className='border py-1 px-2 rounded mb-2' onClick={() => {
                                            select();
                                            validateAnswers();
                                        }}>
                                            <input type="radio" name={`choice${question.questionId}`} className='d-none' value={choice} />
                                            {choice}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='mt-auto mb-2'>
                        <button onClick={() => {
                            submitQuizForm();
                            history.goBack();
                            window.postMessage('updateData', window.location.origin);
                            // setTimeout(() => {
                            //     window.location.reload();
                            // }, 20)
                        }} className='main-bg-clr w-100' style={{ height: '3rem', borderRadius: '15px' }} disabled={disable}>Submit</button>
                    </div>
                </div>


            </IonContent>
        </IonPage>
    );
};

export default TakeQuiz;