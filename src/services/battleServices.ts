import { battleRepository } from "../repositories/battleRepository.js";
import { userServices } from "./userServices.js";

async function createBattle(firstUser: string, secondUser: string) {
    const firstUserStars = await userServices.getUserStars(firstUser);
    const secondUserStars = await userServices.getUserStars(secondUser);
    const firstUserInfo = await userServices.getUserInfo(firstUser);
    const secondUserInfo = await userServices.getUserInfo(secondUser);

    if (firstUserStars.stars > secondUserStars.stars) {
        await battleRepository.insertWin(firstUser, firstUserInfo.wins);
        await battleRepository.insertLoss(secondUser, secondUserInfo.losses);
        return {
            winner: firstUser,
            loser: secondUser,
            draw: false,
        };
    } else if (firstUserStars.stars < secondUserStars.stars) {
        await battleRepository.insertWin(secondUser, secondUserInfo.wins);
        await battleRepository.insertLoss(firstUser, firstUserInfo.losses);
        return {
            winner: secondUser,
            loser: firstUser,
            draw: false,
        };
    } else {
        await battleRepository.insertDraw(firstUser, firstUserInfo.draws);
        await battleRepository.insertDraw(secondUser, secondUserInfo.draws);
        return {
            winner: null,
            loser: null,
            draw: true,
        };
    }
}

export const battleServices: { createBattle: Function } = {
    createBattle,
};
