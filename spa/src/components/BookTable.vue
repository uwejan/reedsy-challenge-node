<template>
  <book-table-base
    :fields="fields"
    :items="books"
    :busy='isBusy'
    :table-header='tableHeader'
  >

    <template #title="row">
      <book-title
          :avatar="row.item.avatar"
          :title="row.item.title"
          :author="row.item.author"
      ></book-title>
    </template>



    <template #buy_on="row">
      <book-buy-on
      :buy-on="row.item.buy_on"
      ></book-buy-on>
    </template>

  </book-table-base>
</template>

<script>
import BookTitle from "@/components/BookTitle";
import BookTableBase from "@/components/BookTableBase";
import BookBuyOn from './BookBuyOn'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: "BookTable",
  components: {BookBuyOn, BookTableBase, BookTitle},
  computed:{
    ...mapGetters({
      books: 'books',
      //isBusy: 'isBusy'
    }),
    ...mapState({isBusy: 'isBusy'})

  },
  data() {
    return {
      tableHeader: 'Most popular Books of All time',
      arrow: "<",
      currentPage: 1,
      perPage: 5,
      fields: [
        {
          key: 'title',
          label: 'TITLE',
          sortable: false
        },
        {
          key: 'published',
          label: 'PUBLISHED',
          sortable: false
        },
        {
          key: 'rating',
          label: 'RATING',
          sortable: false,
          formatter: value => {
            return value + '/10'
          }
        },
        {
          key: 'buy_on',
          label: 'BUY ON',
          sortable: false,
        }
      ],
      items: [
        {
          "id": 0,
          "author": "Harriet Kub IV",
          "title": "Generic Rubber Cheese",
          "details": "Nihil a in voluptas sed harum sit quae quisquam quis ut dolor consequatur nulla vero voluptatem sit laboriosam est omnis hic ea tenetur omnis eos fugit beatae omnis atque voluptatem aut unde eos officia in earum iste doloremque est voluptatem dicta autem odio et quia consequatur quidem laborum velit nobis in quis possimus voluptate omnis odio exercitationem autem sapiente atque molestias sapiente fugiat error necessitatibus exercitationem consequatur eos dolore ut officia dicta voluptatem et distinctio voluptates similique blanditiis sed nulla voluptatum perferendis voluptatem recusandae labore dicta est consequuntur et repudiandae aut debitis aut ducimus dolorem et et laborum saepe rerum.",
          "avatar": "http://loremflickr.com/200/200/animals?57546",
          "genre": "Industrial",
          "rating": "9.2",
          "published": "2014",
          "buy_on": "Collins - Tremblay"
        },
        {
          "id": 1,
          "author": "Lois Christiansen",
          "title": "Handcrafted Steel Chips",
          "details": "Eos excepturi minima inventore et et aut molestiae iste nulla molestiae aut quidem eaque et voluptatem eveniet ducimus aut beatae repellendus autem ex tempora repudiandae sunt voluptas provident ut facilis blanditiis vel voluptatem ea aut repellendus dicta dolorem est necessitatibus voluptas eius architecto labore sunt et veniam rerum asperiores tenetur similique molestiae et aut possimus aut consectetur amet animi impedit harum quaerat sit libero possimus qui nihil distinctio aut enim itaque et occaecati et qui aut omnis exercitationem et vitae quia deserunt est eos ex ut dolor earum vel delectus eius eos quae aut qui cum eligendi distinctio eius cumque.",
          "avatar": "http://loremflickr.com/200/200/animals?35916",
          "genre": "Outdoors",
          "rating": "4.3",
          "published": "2020",
          "buy_on": "Nicolas, Tromp and Wiza"
        },
        {
          "id": 2,
          "author": "Leslie White",
          "title": "Generic Frozen Tuna",
          "details": "Aut dolores aut incidunt optio labore praesentium est magnam libero in ut enim et doloribus repudiandae quisquam necessitatibus incidunt itaque dolor dolorem perspiciatis magni autem quod libero quis ut voluptas ea at minima voluptas nulla sunt aut nihil cupiditate in sed totam corporis deleniti optio nobis sunt dicta cumque voluptatem et ut deserunt beatae nostrum ad voluptas atque excepturi expedita quia sint aut quia ut sit aspernatur nemo atque et ducimus aut fugit odit corrupti velit quia molestiae a nihil tenetur quae reprehenderit reiciendis et et eligendi autem molestiae odit et atque repellat ut inventore suscipit voluptate aliquid aliquid perspiciatis.",
          "avatar": "http://loremflickr.com/200/200/animals?94472",
          "genre": "Industrial",
          "rating": "6.9",
          "published": "2019",
          "buy_on": "McCullough LLC"
        },
        {
          "id": 3,
          "author": "Sherman Powlowski",
          "title": "Ergonomic Cotton Computer",
          "details": "Placeat reiciendis quibusdam quas voluptatem aut aut laudantium nulla perferendis nobis possimus sequi illum velit est nam pariatur quidem officia illum et doloremque et vitae cumque quia impedit omnis velit doloribus ratione ipsum asperiores eos et fugiat rerum ut nostrum nobis eius sit libero ad repudiandae minima eius error blanditiis rerum mollitia autem in voluptas est est aspernatur quo ut accusamus similique sint porro facere iure fugit maxime rem est tenetur tempore illum qui consequatur praesentium deserunt eaque exercitationem et nam numquam sapiente perspiciatis sit rerum deleniti asperiores perferendis adipisci qui et provident sed velit nam dolore quis beatae quos.",
          "avatar": "http://loremflickr.com/200/200/animals?12980",
          "genre": "Clothing",
          "rating": "9.0",
          "published": "2019",
          "buy_on": "Schmeler - Reinger"
        },
        {
          "id": 4,
          "author": "Jennifer Williamson",
          "title": "Rustic Wooden Chips",
          "details": "Non eum facere vel omnis blanditiis eos pariatur earum aperiam est expedita ipsum optio odio dolorum eveniet nostrum laborum consequatur culpa alias repudiandae consequatur facere cum ut saepe similique et numquam et pariatur nostrum possimus incidunt non eveniet consequatur qui repellat voluptas numquam excepturi ipsam eius repudiandae magni inventore nesciunt facilis dolores qui soluta tempora veniam pariatur quasi possimus cupiditate qui ut architecto nostrum qui numquam odio quo totam modi quo quia qui voluptas tenetur est quos harum dignissimos voluptas consequatur similique sunt deleniti dolore suscipit aut commodi dolor iure a natus illo et voluptatem saepe et unde voluptatem ullam.",
          "avatar": "http://loremflickr.com/200/200/animals?66739",
          "genre": "Games",
          "rating": "5.8",
          "published": "2021",
          "buy_on": "Aufderhar - Sawayn"
        }
      ]
    }
  },
  methods:{
    ...mapActions(['getBooks']),
    onRowClicked(item){
      if(item._showDetails){
        this.$set(item, '_showDetails', false)
      }else{
        this.$set(item, '_showDetails', true)
      }
    }
  },
  mounted() {
    this.getBooks()
  }
}
</script>

<style >

.custom-header-style{
  margin-left: 0.5rem;
}

.custom-card-style{
  margin: 2%;
  background-color: snow;
}
.one-word {
  hyphens: none;
  display:table-caption;
  color: #c4d396;
  font-weight: bold;
}
.pagination{
  background-color:transparent !important;
}

</style>
