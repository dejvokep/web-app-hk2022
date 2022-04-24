import classes from "../../styles/GameItem.module.css"
import BuyIcon from "../icons/buy-icon";
import SearchIcon from "../icons/search-icon";
import ClipboardIcon from "../icons/clipboard-icon";
import {useEffect, useState} from "react";
import CheckIcon from "../icons/check-icon";

export default function GameItem(props) {
    const [check, setCheck] = useState(false)

    useEffect(() => {
        if (!check)
            return

        const timeout = setTimeout(() => {
            setCheck(false);
        }, 1500);

        return () => {
            clearTimeout(timeout);
        }
    }, [check])

    function copy() {
        navigator.clipboard.writeText(props.game.id).then(() => {
            setCheck(true);
        })
    }

    return <div className={classes.content}>
        {props.phrase && <div className={classes.badge}>
            <p>{props.phrase}</p>
        </div>}
        <h1 className={classes.gameName}>{props.game.name}</h1>
        <div className={classes.buttons}>
            <button className={classes.button} onClick={copy}>
                {check ? <CheckIcon color="green" /> : <ClipboardIcon />}
            </button>
            {!props.purchased && <button className={classes.button}>
                <a href={"https://google.com/search?q=buy+" + encodeURIComponent(props.game.name)} target="_blank"
                   rel="noreferrer">
                    <BuyIcon />
                </a>
            </button>}
            <button className={classes.button}>
                <a href={"https://google.com/search?q=" + encodeURIComponent(props.game.name)} target="_blank"
                   rel="noreferrer">
                    <SearchIcon />
                </a>
            </button>
        </div>
    </div>
}