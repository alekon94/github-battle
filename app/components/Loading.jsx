import * as React from 'react'
import PropTypes from 'prop-types'
const styles = {
    fontSize: "14px",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "20px",
    textAlign: "center",
};
class Delayed extends React.Component {
    state = {
        wait: false
    }
    componentDidMount() {
        this.timeout = window.setTimeout(() => {
            this.setState({
                wait: true
            })
        }, this.props.wait);
    }
    componentWillUnmount() {
        window.clearTimeout(this.timeout)
    }
    render() {
        return this.state.wait === true ? this.props.children : null
    }
}
Delayed.propTypes = {
    wait: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired
}
Delayed.defaultProps = {
    wait: 300
}

export default class Loading extends React.Component {
    state = {
        content: this.props.text
    }
    componentDidMount() {
        const { speed, text } = this.props
        this.interval = window.setInterval(() => {
            this.state.content === text + '...' ?
                this.setState({
                    content: text
                }) : this.setState(({ content }) => ({
                    content: content + '.'
                }))
        }, speed)
    }
    render() {
        const { content, style } = this.state
        return (
            <Delayed>
                <p style={styles}>{content}</p>

            </Delayed>
        )
    }
}

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
}
Loading.defaultProps = {
    text: "Loading",
    speed: 300
}