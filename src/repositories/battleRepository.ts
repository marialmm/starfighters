import connection from "./../config/db.js";
import { Fighters } from "./userRepository.js";

type insertResult = Partial<Fighters>;

async function insertWin({username, wins}: insertResult) {
    await connection.query(
        `UPDATE fighters
        SET wins = $1
        WHERE username = $2`,
        [wins + 1, username]
    );
}

async function insertDraw({username, draws}: insertResult) {
    await connection.query(
        `UPDATE fighters
        SET draws = $1
        WHERE username = $2`,
        [draws + 1, username]
    );
}

async function insertLoss({username, losses}: insertResult) {
    await connection.query(
        `UPDATE fighters
        SET losses = $1
        WHERE username = $2`,
        [losses + 1, username]
    );
}

interface BattleRepository{
    insertWin: Function;
    insertDraw: Function;
    insertLoss: Function;
}

export const battleRepository: BattleRepository = {
    insertWin,
    insertDraw,
    insertLoss,
};
