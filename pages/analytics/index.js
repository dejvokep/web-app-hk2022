import classes from "../../styles/UserSelectPage.module.css"
import ArrowRightIcon from "../../components/icons/arrow-right-icon";
import {useRef} from "react";
import {useRouter} from "next/router";
import Head from "next/head";

export default function UserSelectPage() {
    const uidRef = useRef(), router = useRouter();

    function redirect(event) {
        event.preventDefault();
        router.push("/analytics/" + uidRef.current.value);
    }

    return <section className={classes.page}>
        <Head>
            <title>GamePick - Provide your ID</title>
        </Head>
        <div className={classes.center}>
            <h1 className={classes.title}>Ready to <span className={classes.purple}>explore</span>?</h1>
            <p className={classes.subTitle}>Tons of game recommendations tailored and waiting just for you around the corner.</p>
            <form onSubmit={redirect} className={classes.form}>
                <input ref={uidRef} placeholder="Your ID" />
                <button className={classes.button}>
                    <ArrowRightIcon color="black" />
                </button>
            </form>
        </div>
    </section>;
}