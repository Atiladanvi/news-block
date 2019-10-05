import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const api = process.env.VUE_APP_MOKA_NEWS_URI


const ClientMokaNewsRequest = function (uri) {
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
