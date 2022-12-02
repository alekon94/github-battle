import * as React from 'react'
export default function withHover(Component) {
    return class withHover extends React.Component {
        constructor(props) {
            super(props)

            this.state = {
                hovering: false
            }

            this.mouseOver = this.mouseOver.bind(this)
            this.mouseOut = this.mouseOut.bind(this)
        }
        mouseOver() {
            this.setState({ hovering: true })
        }
        mouseOut() {
            this.setState({ hovering: false })
        }
        render() {
            const props = {
                hovering: this.state.hovering,
                children: this.props.children,
                element: this.props.element
            }
            console.log(props)
            return (
                <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
                    <Component hovering={props.hovering} children={props.children} element={props.element} />

                </div>
            )
        }
    }

}