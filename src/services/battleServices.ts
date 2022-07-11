import { battleRepository } from "../repositories/battleRepository.js";
import { Fighters } from "../repositories/userRepository.js";
import { userServices } from "./userServices.js";

async function createBattle(firstUser: string, secondUser: string) {
    const firstUserStars: number = await userServices.getUserStars(firstUser);
    const secondUserStars: number = await userServices.getUserStars(secondUser);
    const firstUserInfo: Fighters = await userServices.getUserInfo(firstUser);
    const secondUserInfo: Fighters = await userServices.getUserInfo(secondUser);

    if (firstUserStars > secondUserStars) {
        await battleRepository.insertWin(firstUser, firstUserInfo.wins);
        await battleRepository.insertLoss(secondUser, secondUserInfo.losses);
        return {
            winner: firstUser,
            loser: secondUser,
            draw: false,
        };
    } else if (firstUserStars < secondUserStars) {
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

interface BattleServices{
    createBattle: Function
}

export const battleServices: BattleServices = {
    createBattle,
};
