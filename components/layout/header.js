import classes from "../../styles/Header.module.css";
import Link from "next/link";
import {useRouter} from "next/router";
import MenuIcon from "../icons/menu-icon";
import ArrowRightCircleIcon from "../icons/arrow-right-circle-icon";
import {useState} from "react";

export default function Header() {
    const [open, setOpen] = useState(false);
    const path = useRouter().asPath;

    function openMenu() {
        setOpen(true);
    }

    function closeMenu() {
        setOpen(false);
    }

    return <header className={classes.menu}>
        <div className={classes.webTitle}>
            <h1><Link href="/">GAMEPICK</Link></h1>
        </div>
        <div className={classes.mobileMenuMask} onClick={closeMenu} style={open ? {
            transform: "translateX(0)",
            opacity: .5
        } : {}} />
        <div className={classes.optionBox} style={open ? {
            transform: "translateX(0)"
        } : {}}>
            <div className={classes.mobileMenuBackButton} onClick={closeMenu}>
                <ArrowRightCircleIcon />
            </div>
            <div className={classes.options}>
                <Link href="/" onClick={closeMenu}>
                    <a className={classes.option + ` ${path === "/" ? classes.active : ""}`}>Home</a>
                </Link>
                <Link href="/how-it-works" onClick={closeMenu}>
                    <a className={classes.option + ` ${path.startsWith("/how-it-works") ? classes.active : ""}`}>How it works</a>
                </Link>
                <Link href="/analytics" onClick={closeMenu}>
                    <a className={classes.option + ` ${path.startsWith("/analytics") ? classes.active : ""}`}>My analytics</a>
                </Link>
            </div>
        </div>
        <div className={classes.mobileMenuButton} onClick={openMenu}>
            <MenuIcon color="black" />
        </div>
    </header>
}