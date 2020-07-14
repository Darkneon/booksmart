import * as stateManager from './state-management';
import {POPUP_ELEMENT_ID} from "./ui";
import {showWidget} from "./widget";
import {endSelection, isValidSelection, startSelection} from "./selection";

//--
// Extension entry point
//--

let state = stateManager.getState();

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mouseup', onMouseUp);

function onMouseMove(e: MouseEvent) {
    stateManager.mouseMoved(e.clientX, e.clientY);
}

function onMouseDown(e: MouseEvent) {
    if (clickedOnWidget(e)) { return; }

    startSelection(e);
}

function onMouseUp(e: MouseEvent) {
    if (clickedOnWidget(e)) { return; }

    endSelection(e);

    const show = !state.visible && isValidSelection();
    if (show) {
        showWidget();
    }
}

function clickedOnWidget(e: MouseEvent) {
    return !!e.composedPath().find(target => target['id'] === POPUP_ELEMENT_ID);
}
