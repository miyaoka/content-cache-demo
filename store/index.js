export const state = () => ({
  key: { key: null, d: null }
})
export const getters = {
  key: (state) => () => state.key
}
export const mutations = {
  setKey(state, payload) {
    state.key = {
      key: payload,
      d: new Date()
    }
  }
}
