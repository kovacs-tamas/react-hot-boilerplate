import React, {Component} from 'react';
import StationPerspective from './StationPerspective';
import {Screen} from './DataSource';
import TeaserSelect from './TeaserSelect';
export default class Station extends Component {

    constructor(props) {
        super(props);

        this.state = {
            perspectives: props.perspectives,
            station: props.station
        };
    }

    render()
    {
        return(
            <div className="station">
                <div className="title">
                    <h4 style={{padding : 0, margin: 0}}> {this.props.station.title}</h4>
                </div>

                <div className="teaser-select">
                {Screen.perspectives.map(perspective => {
                    return <TeaserSelect
                        key={perspective.title}
                        station={this.props.station}
                        perspective={perspective} />
                })}
                </div>

                <div className="videos">

                    {this.state.perspectives.map(perspective => {

                        let existingStation = perspective.stations.filter(station => {
                            if (station.id === this.state.station.id)
                            {
                                return station;
                            }
                        });

                        const videos = (existingStation.length) ? existingStation[0].videos : [];

                        return <StationPerspective
                            key={perspective.title}
                            id={perspective.title + this.state.station.id}
                            videos={videos} />
                    })}

                </div>
            </div>
        );
    }
};