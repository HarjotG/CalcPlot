import { Graph } from './Graph.js';
import katex from 'katex';
import { Expression } from './Expression.js';

const canvas = <HTMLCanvasElement>document.getElementById("c1");

let scale = 1/100; // the scale to draw the graph at
const dx = 1; // the resolution of the graph

(<HTMLInputElement>document.getElementById('function')).value = "x^2"; // set the default value for the function as x

let graph = new Graph(canvas, scale, dx);

let expressions:Expression[] = [];
expressions.length = 3;

canvas.addEventListener('wheel', function(event) {
    graph.rescale(event.deltaY/50);
    graph.drawExpressions(expressions);
});

window.addEventListener('resize', function() {
    graph.resize();
    graph.drawExpressions(expressions);
}); // resize the canvas when the window is resized

document.getElementById("Plot")?.addEventListener("click", function(){
    let func = (<HTMLInputElement>document.getElementById('function')).value;
    expressions[0] = new Expression(func);
    graph.drawExpressions(expressions);
    katex.render(func, <HTMLElement>document.getElementById('katex'));
});

document.getElementById("Clear")?.addEventListener("click", function(){
    graph.clearPlot();
    expressions = [];
});

document.getElementById("Derivative")?.addEventListener("click", function(){
    expressions[1] = expressions[0].derivative();
    graph.drawExpressions(expressions);
});
