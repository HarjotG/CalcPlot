var _a, _b, _c;
import { Graph } from './Graph.js';
import katex from 'katex';
import { Expression } from './Expression.js';
const canvas = document.getElementById("c1");
let scale = 1 / 100; // the scale to draw the graph at
const dx = 1; // the resolution of the graph
document.getElementById('function').value = "x^2"; // set the default value for the function as x
let graph = new Graph(canvas, scale, dx);
let expressions = [];
expressions.length = 3;
canvas.addEventListener('wheel', function (event) {
    graph.rescale(event.deltaY / 50);
    graph.drawExpressions(expressions);
});
window.addEventListener('resize', function () {
    graph.resize();
    graph.drawExpressions(expressions);
}); // resize the canvas when the window is resized
(_a = document.getElementById("Plot")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    let func = document.getElementById('function').value;
    expressions[0] = new Expression(func);
    graph.drawExpressions(expressions);
    katex.render(func, document.getElementById('katex'));
});
(_b = document.getElementById("Clear")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    graph.clearPlot();
    expressions = [];
});
(_c = document.getElementById("Derivative")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    expressions[1] = expressions[0].derivative();
    graph.drawExpressions(expressions);
});
