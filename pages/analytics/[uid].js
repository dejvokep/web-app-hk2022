import {getInfo} from "../../data/user";
import styles from "../../styles/UserPage.module.css"
import GameList from "../../components/games/game-list";
import reactStringReplace from "react-string-replace";
import {useRef, useState} from "react";
import {PieChart} from "react-minimal-pie-chart";
import TagIcon from "../../components/icons/tag-icon";
import Head from "next/head";

const GAME_BADGE_PHRASES = [
    ["top pick 🎀", "the best pick 🔔", "the best for you 🥇", "king of the hill 💎"],
    ["matches your taste 🍕", "matches your interests 🏆", "buy immediately 🛒"],
    ["strong recommendation 🎮", "absolutely recommended 👓"],
    ["guaranteed satisfaction ✨", "tailored for you 👌"],
    ["something for you 📌", "you will like it 👍"]
]
const WELCOME_PHRASES = [
    "Welcome back, {name}!", "Hey, {name}!", "Great day, {name}!", "Hi, {name}!"
]

export default function UserPage(props) {
    const [purchases, setPurchases] = useState(props.purchases);

    function getGame(obj) {
        return obj.game;
    }

    function getBadge(obj) {
        return new Date(obj.time).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    function sort(event) {
        const value = event.target.value;
        setPurchases(state => {
            const list = [...state]
            if (value === "name-1")
                list.sort((a, b) => a.game.name.localeCompare(b.game.name));
            else if (value === "name-2")
                list.sort((a, b) => b.game.name.localeCompare(a.game.name));
            else if (value === "time-1")
                list.sort((a, b) => a.time.localeCompare(b.time));
            else
                list.sort((a, b) => b.time.localeCompare(a.time));
            return list;
        });
    }

    return (
        <section className={styles.page}>
            <Head>
                <title>GamePick - My Analytics</title>
            </Head>
            <div>
                <div className={styles.header}>
                    <h1>{reactStringReplace(props.welcomePhrase, "{name}", () => <span
                        key={props.name} className={styles.purple}>{props.name}</span>)}</h1>
                    <p><i>ID: {props.uid}</i></p>
                </div>
                <div>
                    <h2 className={styles.subTitle}>Recommendations ✨</h2>
                    <GameList games={props.recommendations} phrases={props.gameBadgePhrases}/>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.subTitle}>Purchased 🛒</h2>
                    <div className={styles.selectBox}>
                        <select className={styles.select} onChange={sort}>
                            <option value="name-1">Sort by name A-Z</option>
                            <option value="name-2">Sort by name Z-A</option>
                            <option value="time-1">Sort by time 0-1</option>
                            <option value="time-2">Sort by time 1-0</option>
                        </select>
                    </div>

                    <GameList games={purchases} getGame={getGame} getBadge={getBadge} purchased={true}/>
                </div>
                <div className={styles.section}>
                    <h2 className={styles.subTitle}>Categories 📊</h2>
                    {props.categories && props.categories.length > 0 ? <div className={styles.chart}>
                        <div className={styles.piechart}>
                            <PieChart
                                label={({dataEntry}) => `${Math.round(dataEntry.percentage)} %`} data={props.categories}
                            />
                        </div>
                        <div className={styles.legendBox}>
                            <p>Legend:</p>
                            <div className={styles.legendFlex}>
                                {props.categories.map(category => {
                                    return <p key={category.title} className={styles.legend} style={{
                                        color: category.color
                                    }}><TagIcon/> {category.title} ({category.value})</p>
                                })}
                            </div>
                        </div>
                    </div> : <p className={styles.nothing}>No purchases made.</p>}
                </div>
            </div>
        </section>
    )
}

function random(length) {
    return Math.floor(Math.random() * length)
}

export async function getServerSideProps(context) {
    const gameBadgePhrases = []
    for (let i = 0; i < GAME_BADGE_PHRASES.length; i++)
        gameBadgePhrases.push(GAME_BADGE_PHRASES[i][random(GAME_BADGE_PHRASES[i].length)])

    const info = await getInfo(context.params.uid)
    if (!info) {
        return {
            notFound: true
        }
    }

    const purchases = info.purchases;

    const categoryPurchases = {}

    purchases.sort((a, b) => a.game.name.localeCompare(b.game.name))

    purchases.forEach(purchase => {
        const cat = purchase.game.category;
        if (!categoryPurchases[cat]) {
            categoryPurchases[cat] = 1;
            return
        }

        categoryPurchases[cat] = categoryPurchases[cat] + 1
    });

    const categories = []
    for (const cat in categoryPurchases) {
        const share = categoryPurchases[cat];
        categories.push({
            title: cat,
            value: share,
            color: "#" + (Math.floor(Math.random() * 16777215).toString(16) + "000000").substring(0, 6)
        })
    }

    return {
        props: {
            gameBadgePhrases: gameBadgePhrases,
            welcomePhrase: WELCOME_PHRASES[random(WELCOME_PHRASES.length)],
            ...info,
            categories: categories
        }
    }
}