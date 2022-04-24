export async function getInfo(uid) {
    const user = await getUserInfo(uid)
    if (!user)
        return undefined;


    const recommended = await Promise.all((await getRecommendations(uid)).map(async uid => {
        const info = await getGameInfo(uid);
        return {
            id: uid,
            ...info
        }
    }))

    if (!user.purchases)
        user.purchases = []

    const purchased = await Promise.all(user.purchases.map(async purchase => {
        const uid = purchase.game, time = purchase.time;
        const info = await getGameInfo(uid);
        return {
            game: {
                id: uid,
                ...info
            },
            time: time
        }
    }))

    return {
        uid: uid,
        name: user.name,
        recommendations: recommended,
        purchases: purchased
    }
}

export async function getRecommendations(uid) {
    return (await fetch(process.env.FIREBASE_RECOMMENDATIONS + "?orderBy=\"$key\"&equalTo=\"" + encodeURIComponent(uid) + "\"").then(response => response.json()))[uid]
}

export async function getUserInfo(uid) {
    return (await fetch(process.env.FIREBASE_USERS + "?orderBy=\"$key\"&equalTo=\"" + encodeURIComponent(uid) + "\"").then(response => response.json()))[uid]
}

export async function getGameInfo(uid) {
    return (await fetch(process.env.FIREBASE_GAMES + "?orderBy=\"$key\"&equalTo=\"" + encodeURIComponent(uid) + "\"").then(response => response.json()))[uid];
}