const { createApolloFetch } = require('apollo-fetch')
const fs = require('fs-extra')
const path = require('path')
const express = require('express')
require('dotenv').config()

const query = fs.readFileSync(
  path.resolve(__dirname, '../apollo/queries/getIssues.gql'),
  'utf8'
)
const defaultOptions = {
  path: 'contents.json'
}

const apolloFetch = createApolloFetch({
  uri: 'https://api.github.com/graphql'
})

apolloFetch.use(({ request, options }, next) => {
  options.headers = {
    ...options.headers,
    authorization: `Bearer ${process.env.GH_READONLY_TOKEN}`
  }
  next()
})

const fetchContents = async () => {
  try {
    let totalNodes = []
    let endCursor = null
    let hasNextPage = false
    do {
      const { data } = await apolloFetch({
        query,
        variables: {
          repoOwner: process.env.GH_REPO_OWNER,
          repoName: process.env.GH_REPO_NAME,
          fetchIssuePerPage: 100,
          endCursor: endCursor
        }
      })

      const { totalCount, nodes, pageInfo, append } = data.repository.issues
      endCursor = pageInfo.endCursor
      hasNextPage = pageInfo.hasNextPage
      totalNodes = [...totalNodes, ...nodes]

      console.log(`fetching... ${totalNodes.length}/${totalCount}`)
    } while (hasNextPage)

    return totalNodes
  } catch (err) {
    console.error(err)
  }
}

module.exports = async function contentsModule(moduleOptions) {
  const options = {
    ...defaultOptions,
    ...this.options.contents,
    ...moduleOptions
  }

  const contents = await fetchContents()

  this.options.build.plugins.push({
    apply(compiler) {
      compiler.plugin('emit', (compilation, cb) => {
        const json = JSON.stringify(contents)
        compilation.assets[options.path] = {
          source: () => json,
          size: () => json.length
        }
        cb()
      })
    }
  })

  this.options.generate.routes = [
    {
      route: '/',
      payload: contents
    },
    ...contents.map((content, i, ary) => ({
      route: `posts/${content.number}`,
      payload: {
        prev: ary[i - 1],
        data: content,
        next: ary[i + 1]
      }
    }))
  ]

  this.addPlugin({
    src: path.resolve(__dirname, '../plugins/requestContents.js'),
    options
  })

  this.nuxt.hook('build:before', (builder) => {
    console.log('starting build content')
    const isStatic = builder.isStatic

    if (isStatic) {
      // Add content API when running `nuxt generate`
      this.nuxt.hook('build:done', (generator) => {
        if (isStatic) {
          console.log('opening server connection')
          const app = express()
          app.use(express.static('dist'))
          const server = app.listen(process.env.PORT || 3000)

          this.nuxt.hook('generate:done', () => {
            console.log('closing server connection')
            server.close()
          })
        }
      })
    }

    this.requireModule(['@nuxtjs/axios'])
  })
}
