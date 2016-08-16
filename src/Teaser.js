import React, {Component} from 'react';

export default class Teaser extends Component {

    render()
    {
        return(<div className="teaser">Teaser: {this.props.video.title}</div>);
    }
}