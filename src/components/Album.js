import React, { Component } from 'react';
import albumData from './../data/albums.js';
import PlayerBar from './PlayerBar';

class Album extends Component{
    constructor(props) {
        super(props);

    const album = albumData.find ( album => {
        return album.slug === this.props.match.params.slug
    });

    this.state ={
        album: album,
        currentSong: album.songs[0],
        currentTime: 0,
        duration: album.songs[0].duration,
        volume: 0.5,
        isPlaying: false,
        onHover: false
     };

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;
    }

    componentDidMount() {
     this.eventListeners = {
         timeupdate: e => {
             this.setState({ currentTime: this.audioElement.currentTime });
         },
         durationChange: e => {
             this.setState({ duration: this.audioElement.duration });
         },
         volumeChange: e => { 
             this.setState({ volume: this.audioElement.volume });
         }
     };
     this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.addEventListener('durationchange', this.eventListeners.durationChange);
     this.audioElement.addEventListener('volumechange', this.eventListeners.volumeChange);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationChange);
        this.audioElement.removeEventListener('volumechange', this.eventListeners.volumeChange);
    }

    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true });
    }

    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
    }

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
    }
  
   onHover(song) {
       this.setState({ hoveredSong: song });
     }

   offHover(song) {
       this.setState({ hoveredSong: null });
   }

   playPauseButtons(song, index) {
    if (this.state.hoveredSong === song) {
        if (this.state.currentSong === song) {
            if (this.state.isPlaying === song) {
                return <span className="icon ion-md-pause"></span>;
            } else {
                return <span className="icon ion-md-play-circle"></span>
            }
         }
         return <span className="icon ion-md-play-circle"></span>
        } 
     else if(this.state.isPlaying && this.state.currentSong === song){
            return <span className="icon ion-md-pause"></span>;
     }
    return index + 1;
    }

    formatTime(time) {
    if (isNaN(time)) {
        return "-:--";
      }
      let secs = Math.floor(time % 60);
      return Math.floor(time/60) + ":" + (secs < 10 ? "0" : '') + secs;
    }
    

    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
            if (!isSameSong) { this.setSong(song); }
            this.play();
        }
     }

     handlePreviousClick() {
         const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
         const newIndex = Math.max(0, currentIndex - 1);
         const newSong = this.state.album.songs[newIndex];
         this.setSong(newSong);
         this.play();
     }

     handleNextClick(index) {
        let newIndex;
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song)
        if (currentIndex + 1 >= this.state.album.songs.length) { 
           newIndex = 0;
        } else {
             newIndex = currentIndex + 1;
        }
         const newSong = this.state.album.songs[newIndex];
         this.setSong(newSong);
         this.play();

     }

     handleTimeChange(e) {
         const newTime = this.audioElement.duration * e.target.value;
         this.audioElement.currentTime = newTime;
         this.setState({ currentTime: newTime });
     }

     handleVolumeChange(e) {
        this.audioElement.volume = e.target.value;
    }


    render() {
        return (
          <section className="album mdl-grid">
            <div className="album-cover mdl-cell mdl-cell--6-col">
            <img className="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
            </div>
            <section className="mdl-cell mdl-cell--6-col">
            <div className="album-details">
            <h1 className="album-text">{this.state.album.title}</h1>
            <h2 className="artist-text">{this.state.album.artist}</h2>
            <div className="release-text">{this.state.album.releaseInfo}</div>
           </div>
           <section className="song-table">
           <table id="song-list" className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp" align="center">
            <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
            </colgroup>
            <tbody>
            {
               this.state.album.songs.map( (song, index) => 
               <tr key={index} onClick={() => this.handleSongClick(song)} onMouseEnter = {() => this.onHover(song)} onMouseLeave = {() => this.offHover(song)} >
                <td>{this.playPauseButtons(song, index)}</td>
                <td>{song.title}</td>
                <td>{this.formatTime(song.duration)}</td>
               </tr>
            )
           }
           </tbody>
           </table>
           </section>
           <PlayerBar 
                isPlaying={this.state.isPlaying}
                currentSong={this.state.currentSong}
                currentTime={this.audioElement.currentTime}
                currentVolume={this.audioElement.currentVolume}
                duration={this.audioElement.duration}
                handleSongClick={() => {this.handleSongClick(this.state.currentSong)}} 
                handlePrevClick={() => this.handlePreviousClick()}
                handleNextClick={() => this.handleNextClick()}
                handleTimeChange={(e) => this.handleTimeChange(e)}
                handleVolumeChange={(e) => this.handleVolumeChange(e)}
                formatTime={(time) => this.formatTime(time)}
                />
           </section>
        </section>
        );
    }
}

export default Album;