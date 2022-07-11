import { Request, Response } from "express";
import { Fighters } from "../repositories/userRepository.js";
import { userServices } from "../services/userServices.js";

export async function getRanking(req : Request, res : Response){
    const fighters: Fighters[] = await userServices.getRanking();

    res.send(fighters);
}