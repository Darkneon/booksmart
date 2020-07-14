import {Rect} from "../geometry";

export function renderHighlight(shape: Rect, { className = '', color= '#000', opacity = 0.2 } = {}) {
    const highlight = document.createElement('div');

    highlight.classList.add('ext-highlight');

    if (className) {
        highlight.classList.add(className);
    }

    highlight.style.zIndex = Number.MAX_SAFE_INTEGER.toString();
    highlight.style.backgroundColor = color;
    highlight.style.position = 'fixed';
    highlight.style.opacity = opacity.toString();
    highlight.style.left = `${shape.left}px`;
    highlight.style.top = `${shape.top}px`;
    highlight.style.width = shape.width() + 'px';
    highlight.style.height = shape.height() + 'px';
    highlight.style.cursor = 'text';

    document.body.appendChild(highlight);
}

export function removeHighlight() {
    document.querySelectorAll('.ext-highlight').forEach(h => h.remove());
}