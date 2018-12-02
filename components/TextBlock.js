import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class TextBlock extends Component {
    render() {
      return (

        /* need to refactor this to pass in quote data */

        <View style={styles.containerStyle}>
          <Text style={styles.textStyle}>
            It is written that in the last days
            the earth will tremble at the goodness
            of God. So then I ask you, what kind of
            goodness would make you weak in the knees
            with gratitude and awe?
            {'\n'}― Ted Dekker
          </Text>
        </View>
      );
    }
}

const styles = {
  containerStyle: {
    alignItems: 'flex-start',
    marginVertical: 10,
    backgroundColor: '#2E2D2B',
  },
  textStyle: {
    fontSize: 17,
    fontFamily: 'lato-regular',
    color: 'white',
    lineHeight: 24,
    textAlign: 'left',
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
};
