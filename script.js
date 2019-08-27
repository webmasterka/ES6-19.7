class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        };
        this.running = false;
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);

    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
        this.print();
    }

    print() {

    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.running) return;
        this.calculate();

    }

    calculate() {
        const times = this.state.times;
        times.miliseconds += 1;
        if (times.miliseconds >= 100) {
            times.seconds += 1;
            times.miliseconds = 0;
        }
        if (times.seconds >= 60) {
            times.minutes += 1;
            times.seconds = 0;
        }
        this.setState({ times });
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    render() {

        return (
            <div className="container">
                <nav className="controls">
                    <a className="buttonstart" href="#" onClick={this.start}>
                        Start
                    </a>
                    <a className="buttonstop" href="#" onClick={this.stop}>
                        Stop
                    </a>
                    <a className="buttonreset" href="#" onClick={this.reset}>
                        Reset
                    </a>
                </nav>
                <div className="stopwatch">
                    {this.format(this.state.times)}
                </div>
                <div className="results"></div>
            </div>
        );
    }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

const app = document.getElementById('app')
ReactDOM.render(<Stopwatch />, app);