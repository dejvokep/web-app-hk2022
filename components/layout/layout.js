import {Fragment} from "react";
import Header from "./header";
import background from "../../public/background.jpg"
import Head from "next/head";
import styles from "../../styles/Background.module.css"

export default function Layout(props) {
    return <Fragment>
        <Head>
            <title>GamePick</title>
            <link rel="shortcut icon" href="/favicon.png" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div style={{backgroundImage: `url(${background.src})`}} className={styles.background} />
        <Header />
        {props.children}
    </Fragment>
}