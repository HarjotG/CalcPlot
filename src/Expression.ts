import math, {compile, parse, derivative, MathExpression, MathNode} from 'mathjs'
import {Point} from './Graph'

export class Expression {
    private root:math.MathNode;         // the expression tree
    private expr:math.EvalFunction;     // the compiled expression
    public color:string;               // color to render expression in

    constructor(expression:MathExpression, color:string, root?:MathNode) {
        if(typeof root != "undefined") {
            this.root = root;   // if root node was specified, use it
        } else {
            this.root = parse(expression);
        }
        this.expr = this.root.compile();
        this.color = color;
    }

    evaluate(x:number):number {
        return this.expr.evaluate({x:x});
    }

    derivative():Expression {
        return new Expression("", "#228B22", derivative(this.root, "x"));  // make new Expression from derivative
    }

    left_riemann(a:number, b:number, count:number):Point[] {
        let points:Point[] = [];
        let dx = (b-a)/count;
        for(let i = 0; i < count; i++) {
            points[3*i] = {x:(i*dx)+a, y:0};
            points[3*i+1] = {x:(i*dx)+a, y:this.evaluate((i*dx)+a)};
            points[3*i+2] = {x:(i*dx)+a+dx, y:this.evaluate((i*dx)+a)};
        }
        points[points.length] = {x:b, y:0};
        return points;
    }

    right_riemann(a:number, b:number, count:number):Point[] {
        let points:Point[] = [];
        let dx = (b-a)/count;
        for(let i = 0; i < count; i++) {
            points[3*i] = {x:(i*dx)+a, y:0};
            points[3*i+1] = {x:(i*dx)+a, y:this.evaluate((i*dx)+a+dx)};
            points[3*i+2] = {x:(i*dx)+a+dx, y:this.evaluate((i*dx)+a+dx)};
        }
        points[points.length] = {x:b, y:0};
        return points;
    }

    mid_riemann(a:number, b:number, count:number):Point[] {
        let points:Point[] = [];
        let dx = (b-a)/count;
        for(let i = 0; i < count; i++) {
            points[3*i] = {x:(i*dx)+a, y:0};
            points[3*i+1] = {x:(i*dx)+a, y:this.evaluate((i*dx)+a+dx/2)};
            points[3*i+2] = {x:(i*dx)+a+dx, y:this.evaluate((i*dx)+a+dx/2)};
        }
        points[points.length] = {x:b, y:0};
        return points;
    }
}