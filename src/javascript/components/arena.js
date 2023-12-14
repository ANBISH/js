import createElement from '../helpers/domHelper';
import { createFighterImage } from './fighterPreview';

function createFighter(fighter, position) {
    const imgElement = createFighterImage(fighter);
    const positionClassName = position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
    const fighterElement = createElement({
        tagName: 'div',
        className: `arena___fighter ${positionClassName}`
    });

    fighterElement.append(imgElement);
    return fighterElement;
}

function createFighters(firstFighter, secondFighter) {
    const battleField = createElement({ tagName: 'div', className: `arena___battlefield` });
    const firstFighterElement = createFighter(firstFighter, 'left');
    const secondFighterElement = createFighter(secondFighter, 'right');

    battleField.append(firstFighterElement, secondFighterElement);
    return battleField;
}

function createHealthIndicator(fighter, position) {
    const { name } = fighter;
    const container = createElement({ tagName: 'div', className: 'arena___fighter-indicator' });
    const fighterName = createElement({ tagName: 'span', className: 'arena___fighter-name' });
    const indicator = createElement({ tagName: 'div', className: 'arena___health-indicator' });
    const bar = createElement({
        tagName: 'div',
        className: 'arena___health-bar',
        attributes: { id: `${position}-fighter-indicator` }
    });

    fighterName.innerText = name;
    indicator.append(bar);
    container.append(fighterName, indicator);

    return container;
}

function createHealthIndicators(leftFighter, rightFighter) {
    const healthIndicators = createElement({ tagName: 'div', className: 'arena___fight-status' });
    const versusSign = createElement({ tagName: 'div', className: 'arena___versus-sign' });
    const leftFighterIndicator = createHealthIndicator(leftFighter, 'left');
    const rightFighterIndicator = createHealthIndicator(rightFighter, 'right');

    healthIndicators.append(leftFighterIndicator, versusSign, rightFighterIndicator);
    return healthIndicators;
}

function createArena(selectedFighters) {
    const arena = createElement({ tagName: 'div', className: 'arena___root' });
    const healthIndicators = createHealthIndicators(...selectedFighters);
    const fighters = createFighters(...selectedFighters);

    arena.append(healthIndicators, fighters);
    return arena;
}

export function showWinnerModal(winner) {
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'modal-wrapper';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    const winnerText = document.createElement('p');
    winnerText.innerText = `Winner: ${winner.name}`;
    modalContent.appendChild(winnerText);

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', () => {
        modalWrapper.remove();
    });
    modalContent.appendChild(closeButton);

    modalWrapper.appendChild(modalContent);
    document.body.appendChild(modalWrapper);
}

export default function renderArena(selectedFighters) {
    const root = document.getElementById('root');
    const arena = createArena(selectedFighters);

    root.innerHTML = '';
    root.append(arena);

    // todo:
    // - start the fight
    // - when fight is finished show winner
    const healthBar1 = document.getElementById('health-bar-1');
    const healthBar2 = document.getElementById('health-bar-2');
    fight(selectedFighters[0], selectedFighters[1], (winner) => {
        showWinnerModal(winner);

        healthBar1.style.width = `${selectedFighters[0].health}%`;
        healthBar2.style.width = `${selectedFighters[1].health}%`;
    });

}
