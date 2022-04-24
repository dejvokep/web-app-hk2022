import styles from "../styles/HowItWorksPage.module.css"

export default function HowItWorksPage() {
    return <section className={styles.top}>
        <div>
            <h1>How do we <span className={styles.purple}>compute</span> recommendations for you?</h1>
            <p>GamePick collects your relevant activity on the internet, which game you have viewed, how many times,
                when and what games have you downloaded, to product relevant recommendations for your next purchase.
                Data are analyzed using a deep learning technology with outstanding learning models.</p>
        </div>
    </section>;
}