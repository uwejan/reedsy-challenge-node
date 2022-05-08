<template>
  <div class="d-flex justify-content-center ">
    <a class="m-1" @click='prevBooks'  :style='disablePrev'>
      {{arrow}}
    </a>
    <p class="m-1"> Page {{pageIndex}} of 103 </p>
    <a class="m-1" @click='getBooks'>
      <i> > </i>
    </a>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "BookPagination",
  data(){
    return{
      arrow: '<'
    }
  },
  computed:{
    pageIndex(){
      return this.$store.state.booksFetchIndex.pageIndex
    },
    /*to make prev link disabled if we are on the first page
    * we can use bind style
    * */
    disablePrev(){
      let result= ''
      if (this.pageIndex ===1){
        result = {
          'pointer-events': 'none',
          'color': 'lightgrey'
        }
      }
      return result
    }
  },
  methods:{
    ...mapActions(['getBooks','prevBooks']),
  }
}
</script>

<style scoped>
a
{
  text-decoration: none;
  color: black;
  cursor: pointer;
}
</style>
