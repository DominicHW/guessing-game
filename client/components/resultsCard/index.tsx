import styles from './index.module.css';
import { Button, Card} from 'antd';

interface IResultsCardProps {
    result: number;
    refresh: () => void;
}

const generateMessage = (result:number):string => {
    if (result > 7) {
        return "Awesome job!"
    } else if (5 < result && result < 8 ) {
        return "Great work!"
    } else {
        return "Nice try!"
    }
}

const ResultsCard = (props: IResultsCardProps) => {
    const {result, refresh} = props;

    return <Card className={styles.resultsCard}>
        <h3>{generateMessage(result)} You answered {result} questions correctly.</h3>
        <Button
            type="primary"
            size='large'
            className={styles.fullWidth}
            onClick={refresh}>
            Start New Game
        </Button>
    </Card>
}

export default ResultsCard;