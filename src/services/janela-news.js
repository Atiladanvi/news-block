import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const api = process.env.VUE_APP_JANELA_NEWS_URI
const key = process.env.VUE_APP_JANELA_NEWS_KEY


const ClientMokaNewsRequest = function (uri) {
  Vue.http.headers.common['JanelaNewsKey'] = key
  return Vue.http.get(uri)
}

const mokaNewsApi = {

  loadCategories: function () {
    return ClientMokaNewsRequest(`${api}/categories`)
  },

  loadNews: function (category = '') {
    return ClientMokaNewsRequest(`${api}/articles?category=${category}`)
  }

}

export default mokaNewsApi
