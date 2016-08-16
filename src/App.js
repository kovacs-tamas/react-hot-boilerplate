import React, {Component} from 'react';
import {Videos, Screen, Teasers} from './DataSource';
import VideoList from './VideoList';
import Teaser from './Teaser';
import Perspective from './Perspective';
import Station from './Station';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


export default class App extends Component {

    constructor(props) {
        super(props);

        this.screen = Screen;
        this.videos = {};
        for (var video of Videos) {
            this.videos[video.id] = video;
        }

        let usedVideos = [];
        this.screen.perspectives = this.screen.perspectives.map((perspective) => {

            perspective.stations = perspective.stations.map(station => {

                station.videos = station.videos.map(video => {
                    if (video in this.videos){
                        usedVideos.push(video);
                        return this.videos[video];
                    }
                    return  null;
                });

                return station;
            });

            return perspective;
        });

        this.videoList = Videos.filter( video => ( usedVideos.indexOf(video.id) === -1) );
    }

    render() {
        return (
            <div className="app">
                <div className="video-list">

                    <VideoList videos={this.videoList} id="videolist" />

                    <h2>Teasers</h2>
                    {Teasers.map(video => {
                        return <Teaser key={video.id} video={video}/>
                    })}

                    <button>+ add new teaser</button>

                </div>
                <div className="editor">

                    <div className="perspective-container">
                        {this.screen.perspectives.map(perspective => {
                            return <Perspective key={perspective.title} title={perspective.title}/>
                        })}
                    </div>

                    {this.screen.stations.map(station => {
                        return <Station
                                    key={station.id}
                                    station={station}
                                    perspectives={this.screen.perspectives}

                        />
                    })}

                </div>
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);