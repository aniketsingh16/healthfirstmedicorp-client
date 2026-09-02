import React, { Component } from 'react';

import moment from 'moment';

class CountDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: null,
            minutes: null,
            hours: null,
            days: null,
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const { time, format } = this.props;
            const then = moment(time, format);
            const now = moment();
            const countdown = moment(then - now);
            const days = countdown.format('D');
            const hours = countdown.format('HH');
            const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');
            this.setState({ days, hours, minutes, seconds });
        }, 1000);
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    render() {
        const { hours, minutes, seconds } = this.state;
        return (
            <>
                <div className="ps-countdown">
                    <div className="ps-countdown__block ps-countdown__hours">
                        <div className="ps-countdown__number">
                            <span className="first">
                                {typeof hours === 'string'
                                    ? hours.slice(0, 1)
                                    : '0'}
                            </span>
                            <span className="last">
                                {' '}
                                {typeof hours === 'string'
                                    ? hours.slice(-1)
                                    : '0'}
                            </span>
                        </div>
                        <div className="ps-countdown__ref">Hours</div>
                    </div>
                    <div className="ps-countdown__block ps-countdown__minutes">
                        <div className="ps-countdown__number">
                            <span className="first">
                                {typeof minutes === 'string'
                                    ? minutes.slice(0, 1)
                                    : '0'}
                            </span>
                            <span className="last">
                                {' '}
                                {typeof minutes === 'string'
                                    ? minutes.slice(-1)
                                    : '0'}
                            </span>
                        </div>
                        <div className="ps-countdown__ref">Mins</div>
                    </div>
                    <div className="ps-countdown__block ps-countdown__seconds">
                        <div className="ps-countdown__number">
                            <span className="first">
                                {typeof seconds === 'string'
                                    ? seconds.slice(0, 1)
                                    : '0'}
                            </span>
                            <span className="last">
                                {typeof seconds === 'string'
                                    ? seconds.slice(-1)
                                    : '0'}
                            </span>
                        </div>
                        <div className="ps-countdown__ref">Secs</div>
                    </div>
                </div>
            </>
        );
    }
}

export default CountDown;
