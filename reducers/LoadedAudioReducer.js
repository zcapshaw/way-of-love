export default (state = item, action) => {
	switch (action.type) {
		case 'LOAD_AUDIO': {
			const newAudio = { //Receives loaded audio information and updates store
				type: action.type,
				name: action.name,
				subtext: action.subtext,
				image: action.image,
				audio: action.audio,
				};
			return newAudio;
		}
		default:
			return state;
	}
};

const item = {
	type: 'LOAD_AUDIO',
	name: '',
	subtext: '',
	image: '',
	audio: '',
};
