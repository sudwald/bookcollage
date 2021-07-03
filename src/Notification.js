import React from 'react'
import './Notification.css'

export class Notification extends React.Component {
    render() {
        return (
            <div>
                <p className='notification' style={this.props.notificationStyle}>{this.props.notificationText}</p>
            </div>
        )
    }
}