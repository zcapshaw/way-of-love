import React, { Component } from 'react';
import { Image, StyleSheet, Text, SectionList,
			TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import PlayerFooter from '../components/PlayerFooter';
import SectionLabel from '../components/SectionLabel';
import data from '../constants/CommentariesList.json';

class CommentariesScreen extends Component {
	static navigationOptions = {
		title: 'COMMENTARIES',
	};

	constructor(props) {
		super(props);
		this.state = {
			data, //grabs data from CommentariesList.json
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

	render() {
		console.log(this.props.loadedAudio);
		return (
			<View style={styles.container}>
				<View style={styles.sectionListContainer}>
					<SectionList
						sections={this.state.data}
						stickySectionHeadersEnabled={false}
						renderSectionHeader={({ section }) =>
						<SectionLabel labelText={section.title} />}

						renderItem={({ item }) =>
							<TouchableOpacity onPress={() => this._onPressItem(item)}>
								<View style={[styles.sectionListContainer, styles.contentContainer]}>
									<Image style={styles.image} source={{ uri: item.image }} />
									<View style={styles.content}>
										<View style={styles.contentHeader}>
											<Text style={styles.name}>{item.name}</Text>
											<Text style={styles.subtext}>{item.subtext}</Text>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						}

						keyExtractor={(item, index) => index.toString()}
					/>
				</View>

				<View><PlayerFooter /></View>

			</View>
		);
	}
}

/*This is essentially used for testing, as this screen doesn't
need to access the store*/
const mapStateToProps = (state) => {
	return { loadedAudio: state.loadedAudio };
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	sectionListContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-start',
		backgroundColor: '#fff',
	},
	contentContainer: {
		paddingVertical: 12,
	},
	content: {
		marginLeft: 16,
		flex: 1,
	},
	contentHeader: {
		flexDirection: 'column',
		justifyContent: 'space-between',
		marginBottom: 6
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
	image: {
		width: 80,
		height: 60,
		borderRadius: 5,
		marginLeft: 25,
	},
	name: {
		fontSize: 16,
		fontFamily: 'lato-black',
	},
	subtext: {
		fontSize: 14,
		fontFamily: 'lato-regular',
		paddingTop: 5,
	},
});

export default connect(mapStateToProps)(CommentariesScreen);
