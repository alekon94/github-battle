import * as React from 'react';

class Hover extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            hovering: 'hello'
        }

        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }
    mouseOver() {
        this.setState({ hovering: 'bye' })
    }
    mouseOut() {
        this.setState({ hovering: 'bye-bye' })
    }
    render() {
        return (
            <div
                onMouseOver={this.mouseOver}
                onMouseOut={this.mouseOut}
            >
                {this.props.children(this.state.hovering)}
            </div>
        )
    }
}
function Info(props) {
    return (
        <p>{props.hovering}</p>
    )
}
export default function Look() {
    return (
        <Hover>
            {(hovering) => <Info hovering={hovering} />}
        </Hover>
    )
}