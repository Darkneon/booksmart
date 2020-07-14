import {Rect} from "../geometry";
import { computeNearestPoints } from "./compute-nearest-points";

describe ('calculateClosesPoint()', () => {
    test('empty list of rects', () => {
        const point = {x: 20, y: 5};
        const closest = computeNearestPoints([], point);
        expect(closest).toEqual([]);
    });

    test('one rect', () => {
        const point = {x: 20, y: 5};
        const rects = [
            new Rect({top:  0, left: 0, right: 10, bottom: 10})
        ];

        const closest = computeNearestPoints(rects, point);
        expect(closest).toEqual([
            {x: 10, y: 0},
            {x: 10, y: 10},
            {x: 0, y: 0},
            {x: 0, y: 10},

        ]);
    });

    test('multiple rects', () => {
        const point = {x: -5, y: -5};
        const rects = [
            new Rect({top:  0, left: 0, right: 15, bottom: 15}),
            new Rect({top: 5, left: 5, right: 10, bottom: 10}),
        ];

        const closest = computeNearestPoints(rects, point);
        expect(closest).toEqual([
            {x: 0,  y: 0},
            {x: 5,  y: 5},
            {x: 10, y: 5},
            {x: 5,  y: 10},
            {x: 15, y: 0},
            {x: 0,  y: 15},
            {x: 10, y: 10},
            {x: 15, y: 15},
        ]);
    });

    test('unique points only', () => {
        const point = {x: 20, y: 5};
        const rects = [
            new Rect({top:  0, left: 0, right: 10, bottom: 10}),
            new Rect({top:  0, left: 0, right: 10, bottom: 10})
        ];

        const closest = computeNearestPoints(rects, point);
        expect(closest).toEqual([
            {x: 10, y: 0},
            {x: 10, y: 10},
            {x: 0, y: 0},
            {x: 0, y: 10},
        ]);
    });
});