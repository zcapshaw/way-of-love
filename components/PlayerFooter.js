import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo';


class PlayerFooter extends React.Component {

	_onPressExpandButton() {
		this.props.navigation.navigate('Modal');
	}

	_onPressPlayButton() {
		this.props.dispatch({
			type: 'PLAY_PAUSE'
		});
	}

	render() {
		if (!this.props.isEngaged) {
			return <View />;
		}

		return (
			<View style={[styles.playerFooter]}>
				<LinearGradient
					colors={['#414345', '#232526']}
					style={styles.footerBackground}
				>
					<TouchableWithoutFeedback onPress={this._onPressExpandButton.bind(this)}>
						<View style={styles.footerIcon}>
							<Ionicons name="ios-arrow-up" size={32} color="white" />
						</View>
					</TouchableWithoutFeedback>

					<Text style={{ color: 'white', fontSize: 16 }}>0:34/4:24</Text>

					<TouchableWithoutFeedback onPress={() => this._onPressPlayButton()}>
						<View style={styles.footerIcon}>
							{this.props.isPlaying ?
							<Ionicons name="ios-pause" size={40} color="white" /> :
							<Ionicons name="ios-play" size={40} color="white" />}
						</View>
					</TouchableWithoutFeedback>
				</LinearGradient>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return { isPlaying: state.isPlaying, isEngaged: state.isEngaged };
};

const playerState = connect(
	mapStateToProps,
)(PlayerFooter);

const styles = StyleSheet.create({
	playerFooter: {
		//display: 'flex',
		//flex: 1,
		//position: 'absolute',
		right: 0,
		left: 0,
		bottom: 0,
		height: 50
	},
	footerBackground: {
		//display: 'flex',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	footerIcon: {
		paddingHorizontal: 25,
	},
});

export default withNavigation(playerState);
