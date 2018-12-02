export default (state = false, action) => {
	switch (action.type) {
		case 'PLAY_PAUSE':
			return !state;
		default:
			return state;
	}
};
