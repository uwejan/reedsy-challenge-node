<template>
  <b-card-body class="custom-card-style align-self-center rounded-3"
  >
    <h5 class="fw-bold custom-header-style">{{tableHeader}}</h5>
    <b-table
      v-if='items.length'
        id="booksTable"
        borderless responsive="l" hover striped
        :fields="fields"
        @row-clicked="onRowClicked"
        :items="items"
        thead-class="text-muted"
        class="justify-content-between"
        thead-tr-class="h7 fw-bold"
        :busy='busy'
    >

      <template  #row-details="row">
        <book-details
        :title="row.item.title"
        :details="row.item.details"
        ></book-details>
      </template>

      <template v-for="slot in Object.keys($scopedSlots)" v-slot:[toCellName(slot)]="props">
        <slot v-bind="props" :name="slot" />
      </template>


    </b-table>
    <div v-else class="text-center text-danger my-2">
      <b-spinner class="align-middle"></b-spinner>
      <strong class='p-2'>Loading...</strong>
    </div>
    <book-pagination
      v-if='items.length'
    >
    </book-pagination>
  </b-card-body>
</template>

<script>
import BookPagination from "@/components/BookPagination";
import BookDetails from './BookDetails'
export default {
  name: "BookTableBase",
  components: {BookDetails, BookPagination},
  props: { fields: { type: Array, required: true },
    items: { type: Array, required: true },
    busy: {type: Boolean, required: true},
    tableHeader: {type: String, required: true} },
  methods:{
    toCellName (slot) {
      return `cell(${slot})`
    },
    onRowClicked(item){
      if(item._showDetails){
        this.$set(item, '_showDetails', false)
      }else{
        this.$set(item, '_showDetails', true)
      }
    }
  }
}
</script>

<style >
.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(204, 190, 63, 0.1);
}
</style>
