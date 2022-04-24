import {Fragment} from "react";
import Header from "./header";
import background from "../../public/background.jpg"
import Head from "next/head";

export default function Layout(props) {
    return <Fragment>
        <Head>
            <title>GamePick</title>
            <link rel="shortcut icon" href="/favicon.png" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
            height: "100vh",
            width: "100%",
            backgroundImage: `url(${background.src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "center"
        }}></div>
        <Header />
        {props.children}
    </Fragment>
}