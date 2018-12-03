import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ImageBackground
} from 'react-native';
import data from '../constants/CoreTruths.json';

export default class HorizontalCommentaries extends Component {
  constructor(props) {
		super(props);
		this.state = {
			data,
		};
	}

  _renderItem = ({ item }) => (
    <ImageBackground
      source={{ uri: item.image }}
      style={styles.item}
    >
      <Text style={styles.itemText}>{item.shortname}</Text>
    </ImageBackground>
  );

  render() {
    console.log(this.state)
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
