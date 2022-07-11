import axios from "axios";

import { Fighters, userRepository } from "../repositories/userRepository.js";

async function getUserStars(userName: string) {
    const URL = `https://api.github.com/users/${userName}/repos`;
    const { data: userData } = await axios.get(URL);
    let stars = 0;
    userData.forEach((user: { stargazers_count: number }) => {
        stars += user.stargazers_count;
    });
    return stars;
}

async function getUserInfo(username: string) {
    const userRows: Fighters[] = await userRepository.getUserByName(username);
    let user: Fighters;
    if (userRows.length === 0) {
        user = await userRepository.insertNewUser(username);
    } else {
        user = userRows[0];
    }

    return user;
}

async function getRanking() {
    const ranking: Fighters[] = await userRepository.getUsers();

    ranking.forEach((user: Fighters) => delete user.id);

    return { fighters: ranking };
}

interface UserServices{
    getUserStars: Function;
    getUserInfo: Function;
    getRanking: Function;
}

export const userServices: UserServices = {
    getUserStars,
    getUserInfo,
    getRanking,
};
