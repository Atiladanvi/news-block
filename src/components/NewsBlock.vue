<!--suppress CssInvalidFunction, CssUnknownProperty, CssInvalidPropertyValue, CssUnusedSymbol, JSUnresolvedVariable -->
<template>
  <section id="noticias">
    <div class="container">
      <h1 class="text-center">Notícias</h1>
      <hr />
      <div class="col-lg-12">
        <div class="d-flex justify-content-center">
          <b-form-group
            class="mb-1"
            label="Quero mostrar aos meus usuários ao vivo as principais manchetes de notícias: <code>https://newsapi.org/</code>"
          >
            <b-form-select
              v-model="selected"
              :options="categories"
              size="lg"
              class="mt-3 d-lg-none"
            >
            </b-form-select>
            <b-form-radio-group
              id="btnradios2"
              buttons
              button-variant="outline-primary"
              size="md"
              class="d-none d-lg-block"
              v-model="selected"
              :options="categories"
              name="radioBtnOutline"
            />
          </b-form-group>
        </div>
      </div>
      <transition name="slide-fade">
        <div v-if="show" class="row">
          <div class="col-sm-12 col-md-12 px-1 pt-3 col-lg-6 featcard">
            <div
              id="featured"
              class="carousel slide carousel-fade"
              data-ride="carousel"
            >
              <div class="carousel-inner">
                <b-carousel
                  id="carousel1"
                  style="text-shadow: 1px 1px 2px #333;"
                  controls
                  indicators
                  img-blank-color="blue"
                  :interval="12000"
                  img-width="1024"
                  img-height="480"
                >
                  <div v-for="(item, index) in items" v-bind:key="index">
                    <b-carousel-slide
                      href="item.urlToImage"
                      :text="item.description"
                      :caption="labelLink(item.url ,item.title)"
                      :img-src="item.urlToImage"
                      style="height: 301px"
                    >
                    </b-carousel-slide>
                  </div>
                </b-carousel>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-sm-12 mt-3 d-lg-block">
            <div class="row">
              <div
                v-for="(item, index) in items"
                v-bind:key="index"
                class="col-lg-6 col-sm-6 pt-0 px-1 pb-2"
              >
                <div class="card bg-dark text-white">
                  <img
                    style="height: 145px"
                    class="card-img img-fluid"
                    :src="item.urlToImage"
                    alt=""
                  />
                  <div class="card-img-overlay linkfeat d-flex">
                    <a
                      target="_blank"
                      :href="item.url"
                      class="align-self-end card-link  text-white"
                    >
                      <h6 class="card-title">{{ item.title }}</h6>
                      <small class="text-muted">{{item.author}}</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mx-0">
            <div v-for="(item, index) in more" v-bind:key="index" class="col-lg-3 col-sm-6 p-1 py-0">
              <div class="card bg-dark text-white">
                <img
                  style="height: 145px"
                  class="card-img img-fluid"
                  :src="item.urlToImage"
                  alt=""
                />
                <div class="card-img-overlay linkfeat d-flex">
                  <a
                    target="_blank"
                    :href="item.url"
                    class="align-self-end card-link text-white"
                  >
                    <p class="card-title">{{ item.title }}</p>
                    <small class="text-muted">{{item.author}}</small>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <span class="font-weight-bold">Exibindo {{items.length+more.length}} de {{articles.length}} notícias</span>
      <div class="d-flex mb-4 justify-content-center">
        <b-button @click="addMore()" variant="outline-primary">Carregar mais notícias</b-button>
        <b-button v-if="more.length > 0" @click="more = []" class="mx-2" variant="outline-danger">Limpar grid</b-button>
      </div>
    </div>
  </section>
</template>

<script>
  import NewsAPI from "newsapi";
  const newsapi = new NewsAPI("15be616e163642d189f29e5a4915d79c");
  export default {
    name: "NewsBlock",
    data() {
      return {
        selected: "general",
        categories: [
          { text: "Geral", value: "general" },
          { text: "Negócios", value: "business" },
          { text: "Saúde", value: "health" },
          { text: "Esporte", value: "sports" },
          { text: "Tecnologia", value: "technology" },
          { text: "Ciência", value: "science" }
        ],
        items:    [],
        more:     [],
        articles: [],
        show: false
      };
    },
    methods: {
      setNews(category) {
        this.show = false;
        newsapi.v2
          .topHeadlines({
            sources: "",
            pageSize:100,
            q: "",
            category: category,
            language: "pt",
            country: "br"
          })
          .then(response => {
            this.items = [];
            this.more = [];
            this.articles = response.articles;
            for (let n = 0; n < 4; n++) {
              this.items.push(response.articles[n]);
            }
            this.show = true;
          });
      },
      addMore(){
        const i = this.more.length+4;
        for (let n = this.more.length ; n < i ; n++){
          if (this.articles[n+4]){
            this.more.push(this.articles[n+4]);
          }
        }
      },
      labelLink(link, title){
        return `<a href="${link}" target="_blank" class="card-link text-white"> ${title} </a>`
      }
    },
    mounted: function() {
      this.setNews("general");
    },
    watch: {
      selected: function() {
        this.setNews(this.selected);
      },
      more:function () {
        this.$nextTick(function () {
          window.scrollTo(0, document.body.scrollHeight);
        });
      }
    },
  };
</script>

<style>

  .news-slide .carousel-caption h3 {
    color: #ffffff !important;
  }

  .slide-fade-enter-active {
    transition: all .5s ease;
  }

  .slide-fade-leave-active {
    transition: all 1.0s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to {
    opacity: 0;
  }

  p, .card-title {
    font-size: small;
  }

  .carousel-caption h3{
    font-size: large;
  }

  .carousel-caption h3,
  .carousel-caption p {
    padding: 14px;
    background-color: #000000bf;
    color: white;
  }

  @media screen and (max-width: 500px) {
    .carousel-caption {
      padding: 14px;
      right: 0 !important;
      bottom: 23%;
      left: 0 !important;
    }
    h3,p{
      font-size: x-small !important;
    }
  }

  .carousel-inner {
    background: black;
    border-radius: 5px;
    border: 0.6px solid;
  }

  .w-100 {
    height: -webkit-fill-available !important;
    object-fit: cover !important;
  }

  .linkfeat {
    background: rgba(76, 76, 76, 0);
    background: -moz-linear-gradient(
      top,
      rgba(76, 76, 76, 0) 0%,
      rgba(48, 48, 48, 0.73) 49%,
      rgba(19, 19, 19, 1) 100%
    );
    background: -webkit-gradient(
      left top,
      left bottom,
      color-stop(0%, rgba(76, 76, 76, 0)),
      color-stop(49%, rgba(48, 48, 48, 0.73)),
      color-stop(100%, rgba(19, 19, 19, 1))
    );
    background: -webkit-linear-gradient(
      top,
      rgba(76, 76, 76, 0) 0%,
      rgba(48, 48, 48, 0.73) 49%,
      rgba(19, 19, 19, 1) 100%
    );
    background: -o-linear-gradient(
      top,
      rgba(76, 76, 76, 0) 0%,
      rgba(48, 48, 48, 0.73) 49%,
      rgba(19, 19, 19, 1) 100%
    );
    background: -ms-linear-gradient(
      top,
      rgba(76, 76, 76, 0) 0%,
      rgba(48, 48, 48, 0.73) 49%,
      rgba(19, 19, 19, 1) 100%
    );
    background: linear-gradient(
      to bottom,
      rgba(76, 76, 76, 0) 0%,
      rgba(48, 48, 48, 0.73) 49%,
      rgba(19, 19, 19, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4c4c4c', endColorstr='#131313', GradientType=0 );
  }

  @media scream and (max-width: 1500px) {
    .news-slide{
      height: 700px !important ;
    }
  }

</style>
