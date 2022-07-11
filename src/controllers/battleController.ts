import { Request, Response } from "express";
import { battleServices } from "../services/battleServices.js";

interface BattleBody {
    firstUser: string;
    secondUser: string;
}

interface BattleResult {
    winner: string;
    loser: string;
    draw: boolean;
}

export async function sendBattle(req: Request, res: Response) {
    const { firstUser, secondUser }: BattleBody = req.body;

    const result: BattleResult = await battleServices.createBattle(firstUser, secondUser);

    res.status(201).send(result);
}
