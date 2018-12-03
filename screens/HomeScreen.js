import React, { Component } from 'react';
import {
  Platform, ScrollView, StyleSheet, Text, FlatList, View, ImageBackground, TouchableWithoutFeedback, } from 'react-native';
import { Icon } from 'expo';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import PlayerFooter from '../components/PlayerFooter';
import SectionLabel from '../components/SectionLabel';
import TextBlock from '../components/TextBlock';
import HorizontalCommentaries from '../components/HorizontalCommentaries';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'THE WAY OF LOVE',
  };

  _onPressButton() {
    this.props.navigation.navigate('Modal');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={[styles.container, styles.contentContainer]}>

          <SectionLabel labelText={'DAILY QUOTE'} />
          <TextBlock />

          <SectionLabel labelText={'NEXT CHAPTER'} />

          <TouchableWithoutFeedback onPress={this._onPressButton.bind(this)}>
            <View style={styles.nextChapter}>
              <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1541627845349-e6d337eadafa?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=eed9ac5a86b07bdb3b4df6d8d4f402b6&auto=format&fit=crop&w=500&q=60' }}
                style={styles.image}
              >
                <Icon.Ionicons
                  name="ios-play" size={80} color="white" style={styles.chapterPlay}
                />
                <Text style={styles.chapterLabel}>
                  Chapter 3
                </Text>
                <Text style={[styles.chapterLabel, styles.subtext]}>
                  The Path of Yeshua
                </Text>
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>

          <SectionLabel labelText={'COMMENTARIES'} />
          <HorizontalCommentaries />

        </ScrollView>
        <View><PlayerFooter /></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  nextChapter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  image: {
    flexGrow: 1,
    width: 335,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  chapterPlay: {
    marginTop: 20,
  },
  chapterLabel: {
    fontSize: 22,
    fontFamily: 'lato-black',
    textAlign: 'center',
    color: 'white',
  },
  subtext: {
    fontSize: 16,
    marginBottom: 18,
    fontFamily: 'lato-regular',
  }
});
