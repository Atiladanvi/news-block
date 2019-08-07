import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const localApi = {

  loadCategories: function () {
    return Vue.http.get('./news-categories.json')
  },

  loadNews: function (category = '') {
    return Vue.http.get(`./news-${category}.json`)
  }

}

export default localApi
