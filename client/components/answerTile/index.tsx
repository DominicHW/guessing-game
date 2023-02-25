import styles from './index.module.css';

interface IAnswerTileProps {
    answer: string;
}

const AnswerTile = (props: IAnswerTileProps) => {
    return <div className={styles.card}>
        {props.answer}
    </div>
}

export default AnswerTile;