import {Rect} from "../geometry";
import {computePositionBestFit} from "../spatial";

export const POPUP_ELEMENT_ID = 'ext';

const form = () => `
    <div id="ext">
        <input placeholder="tags..." />
        <textarea id="note" placeholder="notes..." style="display: block"></textarea>
        <button id="ext-cancel-button">cancel</button>
        <button id="ext-save-button">save</button>
     </div>
`;

export function renderPopup({state, onSaved, onCancelled, onMouseDownClicked}) {
    const container = document.createElement('div');

    container.id = POPUP_ELEMENT_ID;
    container.innerHTML = form();
    container.style.position = 'fixed';
    container.style.visibility = 'hidden';
    container.style.zIndex = '99999';

    document.body.appendChild(container);


    const mouseStart = { x: state.selectionStartX, y: state.selectionStartY };
    const mouseEnd = { x: state.selectionEndX, y: state.selectionEndY };
    const popupWidget = new Rect({
        top: 0,
        left: 0,
        right: container.getBoundingClientRect().width,
        bottom: container.getBoundingClientRect().height
    });
    const viewport = new Rect({
        top: 0,
        left: 0,
        right: window.innerWidth,
        bottom: window.innerHeight
    });
    const position = computePositionBestFit({ mouseStart, mouseEnd, popupWidget, viewport });

    container.style.left = `${position.x}px`;
    container.style.top = `${position.y}px`;
    container.style.visibility = 'visible';

    document.getElementById('ext-save-button').addEventListener('click', onSaved);
    document.getElementById('ext-cancel-button').addEventListener('click', onCancelled);

    document.getElementById('note').addEventListener('mousedown', onMouseDownClicked);

    return container;
}

export function removePopup() {
    document.getElementById(POPUP_ELEMENT_ID).remove();
}