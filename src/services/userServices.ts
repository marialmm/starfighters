import axios from "axios";

import { userRepository } from "../repositories/userRepository.js";

async function getUserStars(userName: string) {
    const URL = `https://api.github.com/users/${userName}/repos`;
    const { data: userData } = await axios.get(URL);
    let stars = 0;
    userData.forEach((user: { stargazers_count: number }) => {
        stars += user.stargazers_count;
    });
    return { stars };
}

async function getUserInfo(username: string) {
    const userRows = await userRepository.getUserByName(username);
    let user: { username: string; wins: number; losses: number; draws: number };
    if (userRows.length === 0) {
        user = await userRepository.insertNewUser(username);
    } else {
        user = userRows[0];
    }

    return user;
}

async function getRanking() {
    const ranking = await userRepository.getUsers();

    ranking.forEach((user: { id: number }) => delete user.id);

    return { fighters: ranking };
}

export const userServices: {
    getUserStars: Function;
    getUserInfo: Function;
    getRanking: Function;
} = {
    getUserStars,
    getUserInfo,
    getRanking,
};
