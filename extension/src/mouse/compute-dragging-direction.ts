import { Point } from "../geometry";

export type HorizontalDirection = 'left' | 'right' | 'unchanged';
export type VerticalDirection = 'top' | 'bottom' | 'unchanged';

export type DraggingDirection = {
    horizontal: HorizontalDirection,
    vertical: VerticalDirection
}

export function computeDraggingDirection(start: Point, end: Point): DraggingDirection {
    // calculate whether we are dragging left or right
    const towardsLeft = end.x < start.x;
    const towardsRight = end.x > start.x;
    const horizontal = towardsLeft ? 'left' : towardsRight ? 'right' : 'unchanged';

    // calculate whether we are dragging top or bottom
    const towardsTop = end.y < start.y;
    const towardsBottom = end.y > start.y;
    const vertical = towardsTop ? 'top' : towardsBottom ? 'bottom' : 'unchanged';

    return { horizontal, vertical };
}
