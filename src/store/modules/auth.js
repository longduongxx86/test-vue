const state = {
  auth: {
    isAuthenticated: true,
  },
};
const getters = {
  isAuthenticated: (state) => state.auth.isAuthenticated,
};
const mutations = {
  toogleAuthMutation(state) {
    state.auth.isAuthenticated = !state.auth.isAuthenticated;
  },
};

export default { state, getters, mutations };
