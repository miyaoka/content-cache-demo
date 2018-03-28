export default async ({ app, store }, inject) => {
  // store.commit('setContents', data)
  let data = []
  let loaded = false

  const getData = async () => {
    console.log('getData')
    if (loaded) return data
    try {
      data = (await app.$axios.get('/_nuxt/contents.json')).data
      loaded = true
      return data
    } catch (err) {
      console.log(err)
    }
  }

  inject('contents', {
    getAll: async () => await getData(),
    getByNumber: async (number) => {
      const d = await getData()
      const i = d.findIndex((item) => item.number === number)
      return {
        data: d[i],
        prev: d[i - 1],
        next: d[i + 1]
      }
    }
  })
}
