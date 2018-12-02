export default (state = false, action) => {
	switch (action.type) {
		case 'ENGAGED':
			return true;
		default:
			return state;
	}
};
