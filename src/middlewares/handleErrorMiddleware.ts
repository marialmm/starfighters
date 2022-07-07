import { Request, Response, NextFunction, request, response } from "express";

export async function handleError(error, req : Request, res : Response, next : NextFunction) {
    console.log(error);
    if(error.type === "notFound" || error.response.status === 404) {
        res.sendStatus(404)
    } else {
        res.sendStatus(500);
    }
}