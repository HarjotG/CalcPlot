var _a, _b;
import { Graph } from './Graph.js';
import katex from 'katex';
import { Expression } from './Expression.js';
const canvas = document.getElementById("c1");
let scale = 1 / 100; // the scale to draw the graph at
const dx = 1; // the resolution of the graph
document.getElementById('function').value = "x^2"; // set the default value for the function as x^2
document.getElementById('riemann_a').value = "-2"; // set the default value for the function as x^2
document.getElementById('riemann_b').value = "2"; // set the default value for the function as x^2
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
    graph.clearPlot();
    expressions = [];
    points = [];
    let func = document.getElementById('function').value;
    expressions[0] = new Expression(func, "#FF0000");
    graph.drawExpressions(expressions);
    points = [];
    katex.render(func, document.getElementById('katex'));
});
(_b = document.getElementById("Derivative")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    expressions[1] = expressions[0].derivative();
    graph.drawExpressions(expressions);
    graph.draw_points(points);
});
let slider = document.getElementById('riemann_n');
if (slider) {
    slider.oninput = function () {
        var _a;
        graph.clearPlot();
        graph.drawExpressions(expressions);
        let a = parseInt(document.getElementById('riemann_a').value, 10);
        let b = parseInt(document.getElementById('riemann_b').value, 10);
        let n = parseInt((_a = slider) === null || _a === void 0 ? void 0 : _a.value, 10);
        points = expressions[0].left_riemann(a, b, n);
        graph.draw_points(points);
    };
}
