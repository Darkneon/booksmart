import {Point, Rect} from "../geometry";

export function computeNearestPoints(zones: Rect[], destination: Point): Point[] {
    let closestPoints = [];
    let computed = {};
    for (let zone of zones) {
        let dist = Infinity;
        const corners = [
            [zone.left, zone.top],
            [zone.right, zone.top],
            [zone.left, zone.bottom],
            [zone.right, zone.bottom],
        ];

        for (let corner of corners) {
            const [x, y] = corner;
            const key = `${x}-${y}`;
            dist = Math.pow(destination.x - x, 2) + Math.pow(destination.y - y, 2);
            if (!computed[key]) {
                computed[key] = true;
                closestPoints.push([dist, { x, y }]);
            }
        }
    }

    return closestPoints.sort((x, y) => x[0] - y[0]).map(x => x[1]);
}
