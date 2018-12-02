import React from 'react';
import {
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Audio, Video, LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';

class PlaylistItem {
  constructor(name, uri) {
    this.name = name;
    this.uri = uri;
  }
}

const PLAYLIST = [
  new PlaylistItem(
    'Beethoven - Fur Elise',
    'http://russprince.com/hobbies/files/13%20Beethoven%20-%20Fur%20Elise.mp3'
  )
];
const DISABLED_OPACITY = 0.5;
const LOADING_STRING = '... loading ...';
const BUFFERING_STRING = '...buffering...';

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.playbackInstance = null;
    this.state = {
      showVideo: false,
      playbackInstanceName: LOADING_STRING,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
    };
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }
    const source = { uri: PLAYLIST[this.index].uri };
    const initialStatus = {
      shouldPlay: playing
    };
    const { sound } = await Audio.Sound.createAsync(
      source,
      initialStatus,
      this._onPlaybackStatusUpdate
    );
    this.playbackInstance = sound;
    this._updateScreenForLoading(false);
  }

  _mountVideo = component => {
    this._video = component;
    this._loadNewPlaybackInstance(false);
  };

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        showVideo: false,
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true,
      });
    } else {
      this.setState({
        playbackInstanceName: PLAYLIST[this.index].name,
        isLoading: false,
      });
    }
  }

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
      });
    } else if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
  };

  _onLoadStart = () => {
    console.log('ON LOAD START');
  };

  _onLoad = status => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  _onError = error => {
    console.log(`ON ERROR : ${error}`);
  };

  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true);

    this._loadNewPlaybackInstance(playing);
  }

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  _onSeekSliderValueChange = value => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.playbackInstance != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.playbackInstanceDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        this.playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return this.state.playbackInstancePosition / this.state.playbackInstanceDuration;
    }
    return 0;
  }

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return '';
  }


  render() {
    console.log(this.state);

    return (

      <View style={styles.container}>
      <View style={styles.transparentContainer} />
        <View style={styles.pullIcon}>
          <Ionicons name="ios-arrow-down" size={32} color="black" />
        </View>
      <LinearGradient
          colors={['#414345', '#000']}
          style={styles.backgroundStyle}
      >
        <View style={styles.playerContainer}>
           <Image
             style={styles.imageStyle}
             source={{ uri: 'https://images.unsplash.com/photo-1541627845349-e6d337eadafa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eed9ac5a86b07bdb3b4df6d8d4f402b6&auto=format&fit=crop&w=500&q=60' }}
           />
           <Text style={styles.chapterLabel}> Chapter 3 </Text>
           <Text style={[styles.chapterLabel, styles.subtext]}> The Path of Yeshua </Text>
        </View>
        <View>
          <Video
            ref={this._mountVideo}
            style={{ opacity: this.state.showVideo ? 1.0 : 0.0, }}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onError={this._onError}
            onFullscreenUpdate={this._onFullscreenUpdate}
            onReadyForDisplay={this._onReadyForDisplay}
          />
        </View>
        <View
          style={[
            styles.buttonContainer,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
            }
          ]}
        >

          <TouchableWithoutFeedback
            onPress={this._onPlayPausePressed}
            disabled={this.state.isLoading}
          >
              {this.state.isPlaying ?
                <Ionicons name="ios-pause" size={120} color="white" /> :
                <Ionicons name="ios-play" size={120} color="white" />}
          </TouchableWithoutFeedback>
        </View>
        <View
          style={[
            styles.playbackContainer,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
            },
          ]}
        >
          <Slider
            style={styles.playbackSlider}
            value={this._getSeekSliderPosition()}
            onValueChange={this._onSeekSliderValueChange}
            onSlidingComplete={this._onSeekSliderSlidingComplete}
            disabled={this.state.isLoading}
          />
          <View style={styles.timestampRow}>
            <Text style={styles.buffering}>
              {this.state.isBuffering ? BUFFERING_STRING : ''}
            </Text>
            <Text style={styles.timestamp}>
              {this._getTimestamp()}
            </Text>
          </View>
        </View>

        {this.state.showVideo ? (
          <View />
        ) : null}

          </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  playbackContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  playbackSlider: {
    alignSelf: 'stretch',
  },
  timestampRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    minHeight: 20,
  },

  buffering: {
    textAlign: 'left',
    paddingLeft: 20,
    color: 'white',
    fontFamily: 'lato-regular'
  },
  timestamp: {
    textAlign: 'right',
    paddingRight: 20,
    color: 'white',
    fontFamily: 'lato-regular'
  },
  buttonContainer: {
    flex: 0.3,
    position: 'relative',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  transparentContainer: {
    flex: 0.08,
    backgroundColor: 'transparent',
  },
  pullIcon: {
    alignItems: 'center'
  },
  playerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backgroundStyle: {
    flex: 1,
  },
  imageStyle: {
    height: 250,
    width: 250,
  },
  chapterLabel: {
    fontSize: 40,
    fontFamily: 'lato-black',
    textAlign: 'center',
    color: 'white',
    paddingTop: 10
  },
  subtext: {
    fontSize: 20,
    fontFamily: 'lato-regular'
  },

});
