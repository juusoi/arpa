import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import CustomError from "./util/CustomError";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/api/teams", (req: Request, res: Response, next: NextFunction) => {
    const players: string[] = req.body.players;

    if (players.length < 2 || players.length > 10) {
        return next(new CustomError("Invalid number of players. Must be between 2 and 10.", 400));
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

app.use("*", (req: Request, res: Response, next: NextFunction) => {
    next(new CustomError("Not Found", 404));
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ error: message });
});

export default app;