import classes from "../../styles/Header.module.css";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Header() {
    const path = useRouter().asPath;

    return <header className={classes.menu}>
        <div className={classes.webTitle}>
            <h1><Link href="/">GAMEPICK</Link></h1>
        </div>
        <div className={classes.optionBox}>
            <div className={classes.options}>
                <Link href="/">
                    <a className={classes.option + ` ${path === "/" ? classes.active : ""}`}>Home</a>
                </Link>
                <Link href="/how-it-works">
                    <a className={classes.option + ` ${path.startsWith("/how-it-works") ? classes.active : ""}`}>How it works</a>
                </Link>
                <Link href="/analytics">
                    <a className={classes.option + ` ${path.startsWith("/analytics") ? classes.active : ""}`}>My analytics</a>
                </Link>
            </div>
        </div>
    </header>
}