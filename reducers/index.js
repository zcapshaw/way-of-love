import { combineReducers } from 'redux';
import chapterList from './ChaptersListReducer';
import isPlaying from './PlayerPlayingReducer';
import isEngaged from './PlayerEngagedReducer';
import loadedAudio from './LoadedAudioReducer';

export default combineReducers({
  isEngaged,
  isPlaying,
  loadedAudio,
  //chapterList,
});
