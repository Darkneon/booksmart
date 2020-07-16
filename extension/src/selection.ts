import {removeHighlight} from "./ui";
import * as stateManager from "./state-management";

const state = stateManager.getState();

export function clearPreviousSelection() {
    if (state.hasSelection) {
        removeHighlight();
        stateManager.selectionRemoved();
    }
}

export function startSelection(e: MouseEvent) {
    if (state.hasSelection) {
        clearPreviousSelection();
        stateManager.selectionStarted(e.clientX, e.clientY);
    }
}

export function endSelection(e: MouseEvent) {
    stateManager.selectionEnded(e.clientX, e.clientY, window.getSelection().toString());
}

export function isValidSelection() {
    const selectionText = window.getSelection().toString();
    return  selectionText.length > 50;
}