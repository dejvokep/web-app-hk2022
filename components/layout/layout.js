import {Fragment} from "react";
import Header from "./header";
import background from "../../public/background.jpg"
import Head from "next/head";

export default function Layout(props) {
    return <Fragment>
        <Head>
            <title>GamePick</title>
            <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <div style={{
            position: "fixed",
            top: 0,
            height: "100vh",
            width: "100vw",
            zIndex: -1,
            backgroundImage: `url(${background.src})`,
            backgroundSize: "cover"
        }}></div>
        <Header />
        {props.children}
    </Fragment>
}