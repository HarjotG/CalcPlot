export class Graph {
    constructor(canvas, scale, dx) {
        this.canvas = canvas;
        this.scale = scale;
        this.gridscale = scale;
        this.dx = dx;
        this.resize();
    }
    drawExpressions(expressions) {
        this.clearPlot();
        expressions.forEach((expr) => {
            this.drawExpression(expr);
        }); // draw each expression
    }
    clearPlot() {
        let ctx = this.canvas.getContext("2d");
        ctx.clearRect(-ctx.canvas.width / 2, -ctx.canvas.height / 2, ctx.canvas.width, ctx.canvas.height);
        this.drawGrid();
    }
    resize() {
        let ctx = this.canvas.getContext("2d");
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
        this.drawGrid();
    }
    rescale(scale_d) {
        if (this.scale + scale_d * this.scale > 0) {
            this.scale += scale_d * this.scale;
            this.gridscale += scale_d * this.gridscale;
            console.log(this.scale);
            this.drawGrid();
        }
    }
    drawExpression(expr) {
        let ctx = this.canvas.getContext("2d");
        let prevss = ctx.strokeStyle;
        ctx.strokeStyle = "#FF0000";
        ctx.beginPath(); // reset the canvas pen
        for (let i = -ctx.canvas.width / 2; i < ctx.canvas.width / 2; i += this.dx) {
            let x_0 = i * this.scale;
            let x_1 = (i + this.dx) * this.scale;
            let y_0 = expr.evaluate(x_0);
            let y_1 = expr.evaluate(x_1);
            // draw each line segment
            if (Math.abs(y_0) < ctx.canvas.height / 2 && Math.abs(y_1) < ctx.canvas.height / 2) {
                ctx.moveTo(x_0 / this.scale, -y_0 / this.scale);
                ctx.lineTo((x_1 / this.scale), -y_1 / this.scale);
            }
            ctx.lineWidth = 5;
        }
        ctx.stroke();
        ctx.strokeStyle = prevss;
    }
    drawGrid() {
        let ctx = this.canvas.getContext("2d");
        if (1 / this.gridscale < 35) {
            this.gridscale *= 1 / 5;
        }
        else if (1 / this.gridscale > 250) {
            this.gridscale *= 5;
        }
        // draw vertical lines starting from center
        for (let i = 0; i < ctx.canvas.width / 2; i += (1 / this.gridscale)) {
            if (i == 0) {
                ctx.beginPath();
                ctx.lineWidth = 4;
            }
            else {
                ctx.beginPath();
                ctx.lineWidth = 1;
            }
            ctx.moveTo(i, -ctx.canvas.height / 2);
            ctx.lineTo(i, ctx.canvas.height / 2);
            ctx.moveTo(-i, -ctx.canvas.height / 2);
            ctx.lineTo(-i, ctx.canvas.height / 2);
            ctx.stroke();
        }
        // draw horizontal lines startig from center
        for (let i = 0; i < ctx.canvas.height / 2; i += (1 / this.gridscale)) {
            if (i == 0) {
                ctx.beginPath();
                ctx.lineWidth = 4;
            }
            else {
                ctx.beginPath();
                ctx.lineWidth = 1;
            }
            ctx.moveTo(-ctx.canvas.width / 2, i);
            ctx.lineTo(ctx.canvas.width / 2, i);
            ctx.moveTo(-ctx.canvas.width / 2, -i);
            ctx.lineTo(ctx.canvas.width / 2, -i);
            ctx.stroke();
        }
        ctx.font = "16px Arial";
        // write numbers for scale on x-axis
        for (let i = 0; i < ctx.canvas.width / 2; i += (1 / this.gridscale)) {
            ctx.fillText('' + Math.round((i * this.scale) * 10000) / 10000, i, +20);
            ctx.fillText('' + Math.round((-i * this.scale) * 10000) / 10000, -i, +20);
        }
        // write numbers for scale on y-axis
        for (let i = 0; i < ctx.canvas.height / 2; i += (1 / this.gridscale)) {
            ctx.fillText('' + Math.round((i * this.scale) * 10000) / 10000, -20, i);
            ctx.fillText('' + Math.round((-i * this.scale) * 10000) / 10000, -20, -i);
        }
    }
}
