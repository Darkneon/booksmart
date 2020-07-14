import {Point, Rect} from "../geometry";
import {computeDraggingDirection, DraggingDirection} from "../mouse";
import {computeNearestPoints} from "./compute-nearest-points";

type ComputePositionBestFitArgs = {
    mouseStart: Point, mouseEnd: Point, popupWidget: Rect, viewport: Rect;
}
export function computePositionBestFit({mouseStart, mouseEnd, popupWidget, viewport}: ComputePositionBestFitArgs): Point {
    const draggingDirection = computeDraggingDirection(mouseStart, mouseEnd);
    const cornerTiles = cornerTilesOn3x3Grid(draggingDirection);

    const selectionSegments = Array.from(window.getSelection().getRangeAt(0).getClientRects()).map(x => new Rect(x));
    const nearestPoints = computeNearestPoints(selectionSegments, mouseEnd);

    for (let point of nearestPoints) {
        const positions = extandTilesAroundPoint(point, cornerTiles, popupWidget, draggingDirection);
        for (let position of positions) {
            const bestFit = !position.overlaps(selectionSegments) && viewport.contains(position);
            if (bestFit) {
                const {left: x, top: y} = position;
                return {x, y};
            }
        }
    }

    return mouseEnd;
}

export function extandTilesAroundPoint(center: Point, placements: Point[] = [], exterior: Rect, draggingDirection: DraggingDirection): Rect[] {
    const result = [];

    for (let placement of placements) {
        const direction = `${draggingDirection.vertical}-${draggingDirection.horizontal}`;

        let left: number, top: number;
        switch (direction) {
            case 'top-left':
                left = center.x + exterior.width() * placement.x;
                top =  center.y + exterior.height() * placement.y;
                break;
            case 'top-right':
                left = center.x + exterior.width() * (placement.x - 1);
                top =  center.y + exterior.height() * placement.y;
                break;
            case 'bottom-left':
                left = center.x + exterior.width() * placement.x;
                top =  center.y + exterior.height() * (placement.y - 1);
                break;
            case 'bottom-right':
                left = center.x + exterior.width() * (placement.x - 1);
                top =  center.y +  exterior.height() * (placement.y - 1);
        }

        let right = left + exterior.width();
        let bottom = top + exterior.height();
        result.push(new Rect({left, top, right, bottom}));
    }

    return result;
}

export function cornerTilesOn3x3Grid(draggingDirection: DraggingDirection): Point[] {
    const direction = `${draggingDirection.vertical}-${draggingDirection.horizontal}`;

    switch (direction) {
        case 'top-left': return [{x: 0, y: -1}, {x: -1, y: 0}, {x: -1, y: -1}];
        case 'top-right': return [{x: 1, y: -1}, {x: 1, y: 0}, {x: 0, y: -1}];
        case 'top-unchanged': return [{x: -1, y: 0}, {x: 1, y: 1}, {x: 0, y: 1}];

        case 'bottom-left': return [{x: 0, y: 1}, {x: -1, y: 0}, {x: -1, y: 1}];
        case 'bottom-right': return [{x: 1, y: 1}, {x: 0, y: 1}, {x: 1, y: 0}];
        case 'bottom-unchanged': return [{x: 0, y: 1}, {x: 1, y: 0}, {x: -1, y: 0}];

        case 'unchanged-left': return [{x: -1, y: 0}, {x: -1, y: -1}, {x: 0, y: -1}];
        case 'unchanged-right': return [{x: 1, y: 0}, {x: 1, y: -1}, {x: 0, y: -1}];
    }
}

