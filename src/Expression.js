import { parse, derivative } from 'mathjs';
export class Expression {
    constructor(expression, root) {
        if (typeof root != "undefined") {
            this.root = root; // if root node was specified, use it
        }
        else {
            this.root = parse(expression);
        }
        this.expr = this.root.compile();
    }
    evaluate(x) {
        return this.expr.evaluate({ x: x });
    }
    derivative() {
        return new Expression("", derivative(this.root, "x")); // make new Expression from derivative
    }
}
