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

describe ('Rect.overlap()', () => {
    const box = new Rect({top: 0, left: 0, right: 200, bottom: 10});

    test('no rect', () => {
        expect(box.overlaps([])).toEqual(false);
    });

    test('one rect - no overlap', () => {
        const rect = new Rect({top: box.bottom * 2, ...box});
        expect(box.overlaps(rect)).toEqual(true);
    });

    test('multiple rect - no overlap', () => {
        const rects = [
            new Rect({top: box.bottom * 2, ...box}),
            new Rect({left: box.right * 2, ...box})
        ];
        expect(box.overlaps(rects)).toEqual(true);
    });

    test('one rect', () => {
        const rect = new Rect({top: box.top - box.bottom / 2, left: 0, right: 10, bottom: 30});
        expect(box.overlaps(rect)).toEqual(true);
    });

    test('multiple rects', () => {
        const boxes = [
            new Rect({top: box.bottom * 2, left: 0, right: 10, bottom: 30}),
            new Rect({top: box.top - box.bottom / 2, left: 0, right: 10, bottom: 30}),
        ];

        expect(box.overlaps(boxes)).toEqual(true);
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

