// ----- Controls -----

class Controls extends React.Component {
    static propTypes = {
        className: React.PropTypes.string.isRequired,
        buttons: React.PropTypes.array.isRequired
    }

    render() {
        return (
            <nav className="controls">
                {this.props.buttons.map((button, index) => {
                        return (
                            <a href={'#'} onClick={() => button.action()} className={this.props.className} key={index}>{button.text}</a>
                        )
                })}
            </nav>
        )
    }

};

// ----- App -----

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Stopwatch />
            </div>
        )
    }
};


// ----- Stopwatch -----

class Stopwatch extends React.Component {
    constructor() {
        super();

        this.intervalId = null;
        this.state = {
            running: false,
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        }

    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }   
        })
    }

    pad0(value) {
            let result = value.toString();
            return result.length < 2 ? '0' + result : result;
    }

    format(times) {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
    }

    start() {
        if (!this.state.running) {
            this.setState({
                running: true
            })
            this.intervalId = setInterval(() => this.calculate(), 10);
        }
    }

    calculate() {
        if (!this.state.running) return;
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

        this.setState({
            times
        })
    }

    stop() {
        this.setState({
            running: false
        })
        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    render() {
        const formatedTime = this.format(this.state.times);
        const buttons = [
            {text: "Start", action: this.start.bind(this)},
            {text: "Stop", action: this.stop.bind(this)},
            {text: "Reset", action: this.reset.bind(this)}
        ]
        return (
            <div>
                <Controls className="buttons" buttons={buttons}/>
                <div className="stopwatch">{formatedTime}</div>
            </div>
        )
    }

}

// ----- rendering -----

const app = <App />;
ReactDOM.render(app, document.getElementById('app'));