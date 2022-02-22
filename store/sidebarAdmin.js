
export const state = () => ({
	drawerStateAdmin: false
});

export const getters = {
	drawerStateAdmin(state) {
		return state.drawerStateAdmin
	}
};

export const mutations = {
	SET_DRAWER_ADMIN(state, data) {
		state.drawerStateAdmin = data;
	}
};

export const actions = {
	SET_DRAWER_ADMIN({ commit }, drawerStateAdmin) {
		commit("SET_DRAWER_ADMIN", drawerStateAdmin);
	},
};



