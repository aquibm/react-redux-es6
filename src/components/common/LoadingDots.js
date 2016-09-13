import React, {PropTypes} from 'react';

class LoadingDots extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            frame: 1
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({ // eslint-disable-line react/no-did-mount-set-state
                frame: this.state.frame + 1
            });

        }, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let numberOfDots = this.state.frame % (this.props.dots + 2);
        let dots = Array(numberOfDots).join('.');

        return (
            <span {...this.props}>{dots}&nbsp;</span>
        );
    }
}

LoadingDots.defaultProps = {
    interval: 350,
    dots: 3
};

LoadingDots.propTypes = {
    interval: PropTypes.number,
    dots: PropTypes.number
};

export default LoadingDots;