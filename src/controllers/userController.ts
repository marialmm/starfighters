import { Request, Response } from "express";
import { userServices } from "../services/userServices.js";

export async function getRanking(req : Request, res : Response){
    const fighters = await userServices.getRanking();

    res.send(fighters);
}