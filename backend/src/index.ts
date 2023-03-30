import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/api/teams", (req: Request, res: Response) => {
    const players: string[] = req.body.players;

    if (players.length < 2 || players.length > 10) {
        return res.status(400).send("Invalid number of players. Must be between 2 and 10.");
    }
    function shuffle(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffle(players);
    const shuffled = players;
    const mid = Math.ceil(shuffled.length / 2);

    const team1 = shuffled.slice(0, mid);
    const team2 = shuffled.slice(mid);

    res.json({ team1, team2 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
