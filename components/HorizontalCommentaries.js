import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import data from '../constants/CoreTruths.json';

class HorizontalCommentaries extends Component {
  constructor(props) {
		super(props);
		this.state = {
			data,
		};
	}

  //When an item is clicked, dispatch that items details to the reducer
  _onPressItem(item) {
    this.props.dispatch({
      type: 'LOAD_AUDIO',
      name: item.name,
      subtext: item.subtext,
      image: item.image,
      audio: item.audio,
    });
  //Activate the below line when we're ready to load store in new AudioPlayer
  //this.props.navigation.navigate('Modal');
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPressItem(item)}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.item}
      >
        <Text style={styles.itemText}>{item.shortname}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  render() {
    console.log(this.props.loadedAudio);
    return (
      <View style={styles.contentContainer}>
        <FlatList
          data={this.state.data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
	return { loadedAudio: state.loadedAudio };
};

export default connect(mapStateToProps)(HorizontalCommentaries);

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 20,
    flex: 1
  },
  item: {
    marginLeft: 20,
    padding: 10,
    width: 150,
    height: 120,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'lato-black',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
});
