export default function handle(req, res) {
    // Validate method
    if (req.method !== "GET") {
        res.status(405).json({
            error: "Invalid HTTP method!"
        });
        return;
    }

    // GET method
    const uid = req.body.uid;
    // If not provided
    if (!uid) {
        res.status(400).json({
            error: "No UID provided!"
        });
        return;
    }

    // DB return
    res.status(200).json({
        name: "Tommy",
        recommendations: [
            {
                name: "Forza Horizon 5",
                reason: "PURCHASES" // PURCHASES, VISITS, OTHER_USERS
            }
        ]
    });
}