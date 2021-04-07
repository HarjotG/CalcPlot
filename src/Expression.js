import { parse, derivative } from 'mathjs';
export class Expression {
    constructor(expression, color, root) {
        if (typeof root != "undefined") {
            this.root = root; // if root node was specified, use it
        }
        else {
            this.root = parse(expression);
        }
        this.expr = this.root.compile();
        this.color = color;
    }
    evaluate(x) {
        return this.expr.evaluate({ x: x });
    }
    derivative() {
        return new Expression("", "#228B22", derivative(this.root, "x")); // make new Expression from derivative
    }
    left_riemann(a, b, count) {
        let points = [];
        let dx = (b - a) / count;
        for (let i = 0; i < count; i++) {
            points[3 * i] = { x: (i * dx) + a, y: 0 };
            points[3 * i + 1] = { x: (i * dx) + a, y: this.evaluate((i * dx) + a) };
            points[3 * i + 2] = { x: (i * dx) + a + dx, y: this.evaluate((i * dx) + a) };
        }
        points[points.length] = { x: b, y: 0 };
        return points;
    }
    right_riemann(a, b, count) {
        let points = [];
        let dx = (b - a) / count;
        for (let i = 0; i < count; i++) {
            points[3 * i] = { x: (i * dx) + a, y: 0 };
            points[3 * i + 1] = { x: (i * dx) + a, y: this.evaluate((i * dx) + a + dx) };
            points[3 * i + 2] = { x: (i * dx) + a + dx, y: this.evaluate((i * dx) + a + dx) };
        }
        points[points.length] = { x: b, y: 0 };
        return points;
    }
    mid_riemann(a, b, count) {
        let points = [];
        let dx = (b - a) / count;
        for (let i = 0; i < count; i++) {
            points[3 * i] = { x: (i * dx) + a, y: 0 };
            points[3 * i + 1] = { x: (i * dx) + a, y: this.evaluate((i * dx) + a + dx / 2) };
            points[3 * i + 2] = { x: (i * dx) + a + dx, y: this.evaluate((i * dx) + a + dx / 2) };
        }
        points[points.length] = { x: b, y: 0 };
        return points;
    }
}
