import { Request, Response } from "express";
import { battleServices } from "../services/battleServices.js";

export async function sendBattle(req: Request, res: Response) {
    const { firstUser, secondUser }: { firstUser: string; secondUser: string } =
        req.body;

    const result = await battleServices.createBattle(firstUser, secondUser);

    res.status(201).send(result);
}
