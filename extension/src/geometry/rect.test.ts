import {Rect} from "./rect";

describe ('Rect.contains()', () => {
    test('box is fully container then return true', () => {
        const box = new Rect({top: 0, left: 0, right: 10, bottom: 10});
        const page = new Rect({top: 0, left: 0, right: 100, bottom: 100});

        expect(page.contains(box)).toEqual(true);
    });

    test('box is NOT fully container then return false', () => {
        const box = new Rect({top: 0, left: 0, right: 200, bottom: 10});
        const page = new Rect({top: 0, left: 0, right: 100, bottom: 100});

        expect(page.contains(box)).toEqual(false);
    });
});

describe ('Rect.width()', () => {
    test('returns the correct width', () => {
        const box = new Rect({top: 0, left: 0, right: 10, bottom: 10});
        expect(box.width()).toEqual(10);
    });
});

describe ('Rect.height()', () => {
    test('returns the correct width', () => {
        const box = new Rect({top: 10, left: 0, right: 10, bottom: 30});
        expect(box.height()).toEqual(20);
    });
});