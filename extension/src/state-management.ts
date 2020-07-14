let state = {
    visible: false,
    $container: null,
    mouseX: 0,
    mouseY: 0,
    selectionStartX: 0,
    selectionStartY: 0,
    selectionEndX: 0,
    selectionEndY: 0,
    hasSelection: false
};

export function getState() {
    return state;
}

export function mouseMoved(x, y) {
    state.mouseX = x;
    state.mouseY = y;
}

export function popupRendered(container) {
    state.$container = container;
    state.visible = true;
}

export function popupRemoved() {
    state.visible = false;
    state.hasSelection = false;
}

export function selectionStarted(x, y) {
    state.selectionStartX = x;
    state.selectionStartY = y;
}

export function selectionAdded() {
    state.hasSelection = true;
}

export function selectionRemoved() {
    state.hasSelection = false;
}

export function selectionEnded(x, y) {
    state.selectionEndX = x;
    state.selectionEndY = y;
}