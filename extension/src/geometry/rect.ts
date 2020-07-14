import {Point} from "./point";

interface CornerRect {
    left: number;
    top: number;
    right: number;
    bottom: number;
}



interface XYRect {
    x: number;
    y: number;
    width: number;
    height: number;
}

function isCornerRect(x: any): x is CornerRect {
    return (x as CornerRect).left != undefined;
}

function isXYRect(x: any): x is XYRect {
    return (x as XYRect).x != undefined;
}



export class Rect {
    public  left: number = 0;
    public  top: number = 0;
    public  right: number = 0;
    public  bottom: number = 0;

    constructor(rect : CornerRect | XYRect | Point) {
        if (isXYRect(rect)) {
            const {x, y, width, height} = rect;
            this.left = x;
            this.top = y;
            this.right = x + width;
            this.bottom = y + height;
        } else if (isCornerRect(rect)) {
            const {left, top, right, bottom} = rect;
            this.left = left;
            this.top = top;
            this.right = right;
            this.bottom = bottom;
        } else {
            const {x, y} = rect;
            this.left = x;
            this.top = y;
            this.right = x;
            this.bottom = y;
        }
    }

    contains(rect: Rect): boolean {
        return this.left <= rect.left
            && this.right >= rect.right
            && this.top <= rect.top
            && this.bottom >= rect.bottom;
    }

    overlaps(rects: Rect | Rect[]): boolean {
        if (!Array.isArray(rects)) {
            rects = [rects];
        }

        for (let rect of rects) {
            const overlap = this.left < rect.left + rect.width() &&
                this.left + this.width() > rect.left &&
                this.top < rect.top + rect.height() &&
                this.top + this.height() > rect.top;

            if (overlap) {
                return true;
            }
        }

        return false;
    }


    width(): number {
        return Math.abs(this.left - this.right);
    }

    height(): number {
        return Math.abs(this.top - this.bottom);
    }

    toString() {
        return JSON.stringify(this, null, 4);
    }
}

export const ZeroRect = new Rect({ top: 0, left: 0, right: 0, bottom: 0 });