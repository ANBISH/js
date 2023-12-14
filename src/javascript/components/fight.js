import controls from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
        const fightDuration = 5000;
        setTimeout(() => {
            const winner = determineWinner(firstFighter, secondFighter);
            resolve(winner);
        }, fightDuration);
    });
}

function determineWinner(firstFighter, secondFighter) {
    const random = Math.random();

    if (random < 0.5) {
        return firstFighter;
    } else {
        return secondFighter;
    }
}

export function getDamage(attacker, defender) {
    // return damage
    const blockPower = getBlockPower(defender);
    const hitPower = getHitPower(attacker);

    const damage = Math.max(0, hitPower - blockPower);

    return damage;
}

export function getHitPower(fighter) {
    // return hit power
    const criticalHitChance = Math.random() + 1;
    return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
    // return block power
    const dodgeChance = Math.random() + 1;
    return fighter.protection * dodgeChance;
}
