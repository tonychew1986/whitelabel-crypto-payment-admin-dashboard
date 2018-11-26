const initialState = {
  homeState: ""
}

export default(state = initialState, payload) => {
    switch (payload.type) {
        case 'SET_HOME_STATE':
            return {
                ...state,
                homeState: payload.homeState
            }
        default:
            return state;
    }
};
