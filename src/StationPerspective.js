import React, {Component, PropTypes} from 'react';
import update from 'react/lib/update';
import Video from './Video';
import {DropTarget} from 'react-dnd';

export default class StationPerspective extends Component {

    constructor(props) {
        super(props);
        this.state = {videos: props.videos};
    }

    pushVideo(video) {
        this.setState(update(this.state, {
            videos: {
                $push: [ video ]
            }
        }));
    }

    removeVideo(index) {
        this.setState(update(this.state, {
            videos: {
                $splice: [
                    [index, 1]
                ]
            }
        }));
    }

    moveVideo(dragIndex, hoverIndex) {
        const { videos } = this.state;
        const dragVideo = videos[dragIndex];

        this.setState(update(this.state, {
            videos: {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragVideo]
                ]
            }
        }));
    }

    render() {
        const { videos } = this.state;
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;

        return connectDropTarget(
            <div className={"station-perspective " +
                ((isOver && !canDrop) ? 'drop-disabled' : '') +
                ((!isOver && canDrop) ? 'drop-possible' : '') +
                ((isOver && canDrop ) ? 'drop-enabled' : '')
            }>

                {
                    videos.map( (video, i) => {

                        if (video !== null) {
                            return (<Video
                                key={video.id}
                                id={video.id}
                                index={i}
                                video={video}
                                listId={this.props.id}
                                removeVideo={this.removeVideo.bind(this)}
                                moveVideo={this.moveVideo.bind(this)}
                            />);
                        }
                    })
                }

            </div>
        );
    }
}

const PerspectiveTarget = {
    drop(props, monitor, component ) {
        const { id } = props;
        const sourceObj = monitor.getItem();
        if ( id !== sourceObj.listId ) component.pushVideo(sourceObj.video);
        return {
            listId: id
        };
    }
}

export default DropTarget("VIDEO", PerspectiveTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
}))(StationPerspective);