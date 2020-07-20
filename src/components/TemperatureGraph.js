import React from 'react';

class TemperatureGraph extends React.Component {
    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate(prevprops) {
        if (prevprops.dailyTime[0].dt !== this.props.dailyTime[0].dt) {
            this.updateCanvas()
        }
    }

    updateCanvas() {

        const currentTime = [];

        if (this.props) {
            for (let i = 0; i < 24; i++) {
                currentTime.push(this.props.dailyTime[i])
            }
        }

        const startPointY = 110 - currentTime[0].temp * 2.5;
        let time = (time) => {
            return (
                new Date(time * 1000).getHours()
            )
        }

        const ctx = this.refs.canvas.getContext('2d');
        this.refs.canvas.width = 1280;
        this.refs.canvas.height = 160;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;

        // График
        ctx.beginPath();
        ctx.moveTo(12, 138);
        ctx.lineTo(1268, 138);
        ctx.stroke();

        for (let i = 68; i < 1200; i = i + 224) {
            currentTime.map(d => time(d.dt) % 4 === 0
                ? (ctx.beginPath(),
                    ctx.moveTo(i, 138),
                    ctx.lineTo(i, 134),
                    ctx.stroke())
                : (null));
        }

        // контур графика

        ctx.beginPath();
        ctx.moveTo(12, startPointY);
        let a = 24
        currentTime.map(d => {
            ctx.lineTo(a, 110 - d.temp * 2.5);
            a = a + 54
        })
        ctx.stroke();

        // заливка графика

        ctx.beginPath();
        ctx.moveTo(12, 138);
        let b = 12;
        currentTime.map(d => {
            ctx.lineTo(b, 110 - d.temp * 2.5);
            b = b + 54.5
        })
        ctx.lineTo(1268, 138);
        ctx.closePath();
        ctx.fillStyle = "#fff"
        ctx.globalAlpha = 0.3;
        ctx.fill();

        //  время суток

        ctx.font = "14px verdana";
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#fff";
        let i = 0;
        currentTime.map(d => time(d.dt) % 4 === 0 ? (ctx.fillText(time(d.dt), 60 + i, 154), ctx.fillText(Math.ceil(d.temp) + '°', 60 + i, (100 - d.temp * 2.5)), i = i + 224) : null);

        // пунктирная линия

        ctx.beginPath();
        ctx.setLineDash([5, 2]);
        ctx.moveTo(12, 110);
        ctx.lineTo(1268, 110);
        ctx.stroke();

        // --------------

    }
    render() {
        return (
            <canvas ref="canvas" />
        );
    }
}

export default TemperatureGraph;