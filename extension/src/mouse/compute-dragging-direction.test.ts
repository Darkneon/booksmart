import {computeDraggingDirection} from "./compute-dragging-direction";

describe ('calculateDraggingDirection()', () => {
    test('no drag', () => {
        const start = { x: 10, y: 0 };
        const end = { x: 10, y: 0 };
        const direction = computeDraggingDirection(start, end);
        expect(direction).toEqual({ horizontal: 'unchanged', vertical: 'unchanged' });
    });

    test('dragging from left to right', () => {
        const start = { x: 0, y: 0 };
        const end = { x: 10, y: 0 };
        const direction = computeDraggingDirection(start, end);
        expect(direction).toEqual({ horizontal: 'right', vertical: 'unchanged' });
    });

    test('dragging from left to right - negative', () => {
        const start = { x: -10, y: 0 };
        const end = { x: 0, y: 0 };
        const direction = computeDraggingDirection(start, end);
        expect(direction).toEqual({ horizontal: 'right', vertical: 'unchanged' });
    });

    test('dragging from right to left', () => {
        const start = { x: 10, y: 0 };
        const end = { x: 0, y: 0 };
        const direction = computeDraggingDirection(start, end);
        expect(direction).toEqual({ horizontal: 'left', vertical: 'unchanged' });
    });

    test('dragging from right to left - negative', () => {
        const start = { x: 0, y: 0 };
        const end = { x: -10, y: 0 };
        const direction = computeDraggingDirection(start, end);
        expect(direction).toEqual({ horizontal: 'left', vertical: 'unchanged' });
    });

    test('dragging from bottom to top', () => {
        const start = { x: 0, y: 10 };
        const end = { x: 0, y: 0 };
        const direction = computeDraggingDirection(start, end);
        expect(direction).toEqual({ horizontal: 'unchanged', vertical: 'top' });
    });

    test('dragging from bottom to top - negative', () => {
        const start = { x: 0, y: 0 };
        const end = { x: 0, y: -10 };
        const direction = computeDraggingDirection(start, end);
        expect(direction).toEqual({ horizontal: 'unchanged', vertical: 'top' });
    });

    test('dragging from top to bottom', () => {
        const start = { x: 0, y: 0 };
        const end = { x: 0, y: 10 };
        const direction = computeDraggingDirection(start, end);
        expect(direction).toEqual({ horizontal: 'unchanged', vertical: 'bottom' });
    });

    test('dragging from top to bottom - negative', () => {
        const start = { x: 0, y: -10 };
        const end = { x: 0, y: 0 };
        const direction = computeDraggingDirection(start, end);
        expect(direction).toEqual({ horizontal: 'unchanged', vertical: 'bottom' });
    });
});
