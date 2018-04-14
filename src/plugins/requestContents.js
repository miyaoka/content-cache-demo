const options = <%= JSON.stringify(options) %>

export default async ({ app, store }, inject) => {
  let data = []
  let loaded = false

  inject(options.injectName, {
    getData: async () => {
      if (loaded) return data
      try {
        data = (await app.$axios.get(`${options.publicPath}${options.path}`)).data
        loaded = true
        return data
      } catch (err) {
        console.log(err)
      }
    }
  })
}
