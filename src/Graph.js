export class Graph {
    constructor(canvas, scale, dx) {
        this.canvas = canvas;
        this.scale = scale;
        this.gridscale = scale;
        this.dx = dx;
        this.cx = 0;
        this.cy = 0;
        this.resize();
    }
    drawExpressions(expressions) {
        let ctx = this.canvas.getContext("2d");
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
    rescale(scale_d, m_x, m_y) {
        if (this.scale + scale_d * this.scale > 0) {
            m_x -= this.canvas.width / 2;
            m_y -= this.canvas.height / 2;
            console.log(m_x);
            console.log(m_y);
            this.scale += scale_d * this.scale;
            this.gridscale += scale_d * this.gridscale;
            this.cx -= (this.cx - m_x) * scale_d;
            this.cy -= (this.cy - m_y) * scale_d;
            this.drawGrid();
        }
    }
    move_center(new_cx, new_cy) {
        this.cx += new_cx;
        this.cy += new_cy;
        this.drawGrid();
    }
    draw_points(points) {
        let ctx = this.canvas.getContext("2d");
        let prevss = ctx.strokeStyle;
        ctx.strokeStyle = "#0000AF";
        ctx.fillStyle = "rgba(135, 206, 235, 0.4)"; // light blue
        ctx.beginPath(); // reset the canvas pen
        for (let i = 1; i < points.length; i++) {
            let x1 = points[i - 1].x;
            let y1 = points[i - 1].y;
            let x2 = points[i].x;
            let y2 = points[i].y;
            ctx.moveTo((x1 + this.cx * this.scale) / this.scale, (-y1 + this.cy * this.scale) / this.scale);
            ctx.lineTo((x2 + this.cx * this.scale) / this.scale, (-y2 + this.cy * this.scale) / this.scale);
            if (i % 3 == 0) {
                ctx.fillRect((points[i - 2].x + this.cx * this.scale) / this.scale, (-points[i - 2].y + this.cy * this.scale) / this.scale, (points[i].x - points[i - 2].x) / this.scale, points[i - 2].y / this.scale);
                console.log("x: " + ((points[i - 2].x + this.cx * this.scale) / this.scale) + " y: " + ((-points[i - 2].y + this.cy * this.scale) / this.scale) + " w: " + ((points[i].x - points[i - 2].x) / this.scale) + " h: " + (points[i - 2].y / this.scale));
            }
        }
        ctx.stroke();
        ctx.strokeStyle = prevss;
    }
    drawExpression(expr) {
        let ctx = this.canvas.getContext("2d");
        let prevss = ctx.strokeStyle;
        ctx.strokeStyle = expr.color;
        ctx.beginPath(); // reset the canvas pen
        ctx.lineWidth = 5;
        for (let i = -ctx.canvas.width / 2 - this.cx; i < ctx.canvas.width / 2 - this.cx; i += this.dx) {
            let x_0 = i * this.scale;
            let x_1 = (i + this.dx) * this.scale;
            let y_0 = expr.evaluate(x_0);
            let y_1 = expr.evaluate(x_1);
            // draw each line segment
            if (Math.abs(y_0 - y_1) < ctx.canvas.height) {
                ctx.moveTo((x_0 + this.cx * this.scale) / this.scale, (-y_0 + this.cy * this.scale) / this.scale);
                ctx.lineTo(((x_1 + this.cx * this.scale) / this.scale), (-y_1 + this.cy * this.scale) / this.scale);
            }
        }
        ctx.stroke();
        ctx.strokeStyle = prevss;
    }
    drawGrid() {
        let ctx = this.canvas.getContext("2d");
        ctx.strokeStyle = "#000000";
        if (1 / this.gridscale < 35) {
            this.gridscale *= 1 / 5;
        }
        else if (1 / this.gridscale > 250) {
            this.gridscale *= 5;
        }
        ctx.font = "16px Arial";
        ctx.fillStyle = '#000000';
        // draw vertical lines to the right of center
        for (let i = this.cx; i < ctx.canvas.width / 2; i += (1 / this.gridscale)) {
            if (i == this.cx) {
                ctx.beginPath();
                ctx.lineWidth = 4;
            }
            else {
                ctx.beginPath();
                ctx.lineWidth = 1;
            }
            ctx.moveTo(i, -ctx.canvas.height / 2);
            ctx.lineTo(i, ctx.canvas.height / 2);
            ctx.fillText('' + Math.round(((i - this.cx) * this.scale) * 10000) / 10000, i, this.cy + 20);
            ctx.stroke();
        }
        // draw vertical lines to the left of center
        for (let i = this.cx; i > -ctx.canvas.width / 2; i -= (1 / this.gridscale)) {
            if (i == this.cx) {
                ctx.beginPath();
                ctx.lineWidth = 4;
            }
            else {
                ctx.beginPath();
                ctx.lineWidth = 1;
            }
            ctx.moveTo(i, -ctx.canvas.height / 2);
            ctx.lineTo(i, ctx.canvas.height / 2);
            ctx.fillText('' + Math.round(((i - this.cx) * this.scale) * 10000) / 10000, i, this.cy + 20);
            ctx.stroke();
        }
        // draw horizontal lines below the center
        for (let i = this.cy; i < ctx.canvas.height / 2; i += (1 / this.gridscale)) {
            if (i == this.cy) {
                ctx.beginPath();
                ctx.lineWidth = 4;
            }
            else {
                ctx.beginPath();
                ctx.lineWidth = 1;
            }
            ctx.moveTo(-ctx.canvas.width / 2, i);
            ctx.lineTo(ctx.canvas.width / 2, i);
            ctx.fillText('' + Math.round(((this.cy - i) * this.scale) * 10000) / 10000, this.cx - 20, i);
            ctx.stroke();
        }
        // draw horizontal lines above the center
        for (let i = this.cy; i > -ctx.canvas.height / 2; i -= (1 / this.gridscale)) {
            if (i == this.cy) {
                ctx.beginPath();
                ctx.lineWidth = 4;
            }
            else {
                ctx.beginPath();
                ctx.lineWidth = 1;
            }
            ctx.moveTo(-ctx.canvas.width / 2, i);
            ctx.lineTo(ctx.canvas.width / 2, i);
            ctx.fillText('' + Math.round(((this.cy - i) * this.scale) * 10000) / 10000, this.cx - 20, i);
            ctx.stroke();
        }
    }
}
