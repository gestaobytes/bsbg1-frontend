
export const state = () => ({
	drawerState: false
});

export const getters = {
	drawerState(state) {
		return state.drawerState
	}
};

export const mutations = {
	SET_DRAWER(state, data) {
		state.drawerState = data;
	}
};

export const actions = {
	SET_DRAWER({ commit }, drawerState) {
		commit("SET_DRAWER", drawerState);
	},
};



