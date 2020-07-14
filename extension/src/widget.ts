
import * as stateManager from "./state-management";
import {
    renderHighlight,
    removeHighlight,
    renderPopup,
    removePopup
} from "./ui";
import {Rect} from "./geometry";

const state = stateManager.getState();

export function showWidget() {
    const container = renderPopup({ state, onSaved, onCancelled, onFocused });
    stateManager.popupRendered(container);
}

function onSaved() {
    removeHighlight();
    removePopup();
    stateManager.popupRemoved();
}

function onCancelled() {
    removeHighlight();
    removePopup();
    stateManager.popupRemoved();
}

function onFocused() {
    if (!state.hasSelection) {
        const browserClientRects = window.getSelection().getRangeAt(0).getClientRects();
        for (let i = 0; i < browserClientRects.length; i++) {
            renderHighlight(new Rect(browserClientRects.item(i)));
        }

        stateManager.selectionAdded();
    }
}