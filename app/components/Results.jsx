import * as React from 'react'
export default class Results extends React.Component {
    render() {
        return (
            <div>
                <pre>
                    {JSON.stringify(this.props.results, null, 2)}
                </pre>
            </div>
        )
    }
}