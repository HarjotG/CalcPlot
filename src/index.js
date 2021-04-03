var _a, _b, _c, _d;
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
let points = [];
let mouse_down_flag = false; // keep track of whether mouse is clicked down
let lastX = 0; // keep track of where the last mouse move was
let lastY = 0;
canvas.addEventListener('wheel', function (event) {
    graph.rescale(event.deltaY / 50, lastX - canvas.getBoundingClientRect().left, lastY - canvas.getBoundingClientRect().top);
    graph.drawExpressions(expressions);
    graph.draw_points(points);
});
canvas.addEventListener('mousemove', function (event) {
    if (mouse_down_flag) {
        graph.move_center(event.clientX - lastX, event.clientY - lastY);
        graph.drawExpressions(expressions);
        graph.draw_points(points);
    }
    lastX = event.clientX;
    lastY = event.clientY;
});
canvas.addEventListener('mousedown', function (event) {
    mouse_down_flag = true;
    lastX = event.clientX;
    lastY = event.clientY;
});
canvas.addEventListener('mouseup', function (event) {
    mouse_down_flag = false;
    lastX = event.clientX;
    lastY = event.clientY;
});
window.addEventListener('resize', function () {
    graph.resize();
    graph.drawExpressions(expressions);
    graph.draw_points(points);
}); // resize the canvas when the window is resized
(_a = document.getElementById("Plot")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    let func = document.getElementById('function').value;
    expressions[0] = new Expression(func);
    graph.drawExpressions(expressions);
    points = [];
    katex.render(func, document.getElementById('katex'));
});
(_b = document.getElementById("Clear")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    graph.clearPlot();
    expressions = [];
    points = [];
});
(_c = document.getElementById("Derivative")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () {
    expressions[1] = expressions[0].derivative();
    graph.drawExpressions(expressions);
    graph.draw_points(points);
});
(_d = document.getElementById("Riemann")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", function () {
    points = expressions[0].mid_riemann(-5, 5, 8);
    graph.draw_points(points);
});
