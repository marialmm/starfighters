import connection from "./../config/db.js";

async function insertWin(username: string, wins: number) {
    await connection.query(
        `UPDATE fighters
        SET wins = $1
        WHERE username = $2`,
        [wins + 1, username]
    );
}

async function insertDraw(username: string, draws: number) {
    await connection.query(
        `UPDATE fighters
        SET draws = $1
        WHERE username = $2`,
        [draws + 1, username]
    );
}

async function insertLoss(username: string, losses: number) {
    await connection.query(
        `UPDATE fighters
        SET losses = $1
        WHERE username = $2`,
        [losses + 1, username]
    );
}

export const battleRepository: {
    insertWin: Function;
    insertDraw: Function;
    insertLoss: Function;
} = {
    insertWin,
    insertDraw,
    insertLoss,
};
