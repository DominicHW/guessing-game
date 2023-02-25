import { useEffect, useState } from "react";
import QuestionCard from "../components/questionCard";
import { IAnswerData, IQuestionData } from "../components/types";
import { _getQuestion, _submitAnswer } from './api/index';

import { Spin } from 'antd';
import ResultsCard from "../components/resultsCard";

const HomePage = () => {
    const [questionData, setQuestionData] = useState<IQuestionData>(null);
    const [endGame, setEndGame] = useState<boolean>(false);
    const [result, setResult] = useState<number>(0);
    
    useEffect(() => {
        getNewQuestion();
    },[]);

    const getNewQuestion = async () => {
        await _getQuestion()
            .then(data => setQuestionData(data))
            .catch((err) => {
                console.error("Error getting question data:", err);
            })
    }

    const onSubmit = async (submittedAnswer:IAnswerData) => {
        if (submittedAnswer.answer) {
            const response = await _submitAnswer(submittedAnswer.imageUrl, submittedAnswer.answer);

            response.endGame && setEndGame(true);
            setResult(response.numberCorrectAnswers);

            return await getNewQuestion();
        }
    }

    const onRefresh = async () => {
        setEndGame(false);
        return await getNewQuestion();
    }

    return <div style={{display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <h2>Guessing Game</h2>
        <h5>Select which film/tv show each character is from</h5>
        {endGame ? <ResultsCard result={result} refresh={onRefresh} /> 
            : questionData
                ? <QuestionCard
                    questionData={questionData}
                    onSubmit={onSubmit} />
                : <Spin size="large" />}
    </div>;
}

export default HomePage;