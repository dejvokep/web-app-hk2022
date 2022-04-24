import styles from "../../styles/GameList.module.css";
import GameItem from "./game-item";

const COLORS = ["purple", "purple", "purple", "purple", "purple"]

export default function GameList(props) {
    let place = -1;

    return <ul className={styles.list}>
        {props.games.map((game, index) => {
            place += 1;
            return <li key={index}><GameItem key={index} game={props.getGame ? props.getGame(game) : game} phrase={props.getBadge ? props.getBadge(game) : props.phrases ? "#" + (place + 1) + ": " + props.phrases[place] : undefined} purchased={props.purchased} color={COLORS[place]} place={place} /></li>
        })}
    </ul>
}