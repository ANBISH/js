import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)
    const imageElement = createElement({
        tagName: 'img',
        attributes: {
            src: fighter.source,
            alt: fighter.name
        },
        className: 'fighter-preview___image'
    });
    fighterElement.appendChild(imageElement);

    const nameElement = createElement({
        tagName: 'div',
        innerText: fighter.name,
        className: 'fighter-preview___name'
    });
    fighterElement.appendChild(nameElement);

    const healthElement = createElement({
        tagName: 'div',
        innerText: `Health: ${fighter.health}`,
        className: 'fighter-preview___health'
    });
    fighterElement.appendChild(healthElement);

    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
