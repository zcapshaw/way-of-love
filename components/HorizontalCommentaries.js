import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ImageBackground
} from 'react-native';

export default class HorizontalCommentaries extends Component {

  _renderItem = ({ item }) => (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1534608176107-b67f671733b3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2eaaaa01848d4a9c31b21a3b9165af6f&auto=format&fit=crop&w=1052&q=80' }}
      style={styles.item}
    >
      <Text style={styles.itemText}>{item.key}</Text>
    </ImageBackground>
  );

  render() {
    return (
      <View style={[styles.contentContainer, styles.commentariesContainer]}>
        <FlatList
          data={[
            { key: 'First\nCore Truth' },
            { key: 'Second\nCore Truth' },
            { key: 'Third\nCore Truth' },
            { key: 'Fourth\nCore Truth' },
            { key: 'Fifth\nCore Truth' },
        ]}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  commentariesContainer: {
    flex: 1,
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
  },
});
