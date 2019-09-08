import NewsAPI from 'newsapi'
// noinspection ES6ModulesDependencies
const newsapi = new NewsAPI(process.env.VUE_APP_NEWS_API_TOKEN)

const newsApi = {

  loadCategories: function () {

    return new Promise(
      function(resolve) {
        const categories = {
          body: {
            data:  [
              { text: "Geral", value: "general" },
              { text: "Negócios", value: "business" },
              { text: "Saúde", value: "health" },
              { text: "Esporte", value: "sports" },
              { text: "Tecnologia", value: "technology" },
              { text: "Ciência", value: "science" }
            ]
          }
        };

        resolve(categories)

      });

  },

  loadNews: function (category = '') {

    return new Promise(
      function(resolve) {

        let response = {
          body: {}
        }

        return newsapi.v2
          .topHeadlines({
            sources: "",
            pageSize:30,
            q: "",
            category: category,
            language: "pt",
            country: "br"
          })
          .then(data => {
            response.body = data
            resolve(response)
          })

      });

  }

}

export default newsApi
