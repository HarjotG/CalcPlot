import math, {compile, parse, derivative, MathExpression, abs, MathNode} from 'mathjs'

export class Expression {
    private root:math.MathNode;         // the expression tree
    private expr:math.EvalFunction;     // the compiled expression

    constructor(expression:MathExpression, root?:MathNode) {
        if(typeof root != "undefined") {
            this.root = root;   // if root node was specified, use it
        } else {
            this.root = parse(expression);
        }
        this.expr = this.root.compile();
    }

    evaluate(x:number):number {
        return this.expr.evaluate({x:x});
    }

    derivative():Expression {
        return new Expression("", derivative(this.root, "x"));  // make new Expression from derivative
    }
}