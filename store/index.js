export const state = () => ({
  contents: []
})
export const getters = {
  getByNumber: (state) => (num) => {
    const i = state.contents.findIndex((item) => item.number === num)
    return {
      data: state.contents[i],
      prev: state.contents[i - 1],
      next: state.contents[i + 1]
    }
  }
}
export const mutations = {
  setContents(state, payload) {
    console.log('store')
    state.contents = payload
  }
}
