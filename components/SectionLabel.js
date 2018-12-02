import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class SectionLabel extends Component {
  render() {
    return (
    <View style={styles.sectionLabelContainer}>
      <Text style={styles.sectionLabel}> {this.props.labelText} </Text>
    </View>
    );
  }
}

const styles = {
  sectionLabelContainer: {
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginTop: 15
  },
   sectionLabel: {
    fontSize: 12,
    fontFamily: 'lato-black',
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
};
