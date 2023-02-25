import { useState } from 'react';
import { Button, Image, Card, Col, Row } from 'antd';

import { _submitAnswer } from '../../pages/api';
import { IQuestionData, IAnswerData } from '../types';

import styles from './index.module.css';

interface IQuestionCardProps {
    questionData: IQuestionData;
    onSubmit: (answer:IAnswerData) => void;
}

const QuestionCard = (props: IQuestionCardProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string>(null);
    const { questionData, onSubmit } = props;

    return <Card title={`Question ${questionData.currentQuestionNumber}`} style={{width: '75%', minWidth: '500px'}}>
        <Image src={questionData.imageUrl} width={"100%"}/>

        <Row gutter={[16, 16]} className={styles.answerWrapper}>
            {questionData.answers.map((answer: string, index: number) => {
                return <Col span={6} key={`column-${index}`}>
                    <Card hoverable onClick={() => setSelectedAnswer(answer)} key={`answer-card-${index}`}>
                        {answer}
                    </Card>
                </Col>
            })}
        </Row>
        

        {selectedAnswer && <p>Current Selected Answer: {selectedAnswer}</p>}
        <Button 
            type="primary" 
            size='large' 
            disabled={selectedAnswer ? false : true} 
            className={styles.fullWidth}
            onClick={() => {
                onSubmit({
                    imageUrl: questionData.imageUrl, 
                    answer: selectedAnswer
                });
                setSelectedAnswer(null);
            }}>
                Submit
        </Button>
    </Card>
}

export default QuestionCard;