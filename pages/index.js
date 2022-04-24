import ArrowRightIcon from "../components/icons/arrow-right-icon";
import Link from "next/link";
import styles from "../styles/Home.module.css"
import InfoIcon from "../components/icons/info-icon";
import BlinkingDot from "../components/home/blinking-dot";
import Head from "next/head";

export default function Home() {
    return <section className={styles.top}>
        <Head>
            <title>GamePick - Home</title>
        </Head>
        <div>
            <h1>Game recommendations, <span className={styles.purple}>unleashed</span><BlinkingDot /></h1>
            <div className={styles.buttons}>
                <div className={styles.div2}>
                    <Link href="/how-it-works">
                        <div className={styles.button}>
                            <p>How it works</p>
                            <InfoIcon/>
                        </div>
                    </Link>
                    <Link href="/analytics">
                        <div className={styles.button}>
                            <p>Explore</p>
                            <ArrowRightIcon/>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </section>
}
