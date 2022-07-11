import connection from "../config/db.js";

export interface Fighters {
    id: number;
    username: string;
    wins: number;
    losses: number;
    draws: number;
}

async function insertNewUser(username: string) {
    await connection.query(
        `INSERT INTO fighters ("username", "wins", "losses", "draws")
        VALUES ($1, 0, 0, 0)`,
        [username]
    );

    return {username, wins: 0, losses: 0, draws: 0};
}

async function getUserByName(username: string) {
    const { rows } = await connection.query<Fighters>(
        `SELECT * FROM fighters
        WHERE username = $1`,
        [username]
    );

    return rows;
}

async function getUsers(){
    const {rows} = await connection.query<Fighters>(
        `SELECT * FROM fighters
        ORDER BY wins DESC, draws DESC`
    );

    return rows;
}

export const userRepository: {
    insertNewUser: Function,
    getUserByName: Function,
    getUsers: Function
} = {
    insertNewUser,
    getUserByName,
    getUsers
};
