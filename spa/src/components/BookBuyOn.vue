<template>
  <p class="one-word">{{buyOn}}</p>
</template>

<script>
export default {
  name: "BookBuyOn",
  props:{
    buyOn:{
      type: String
    }
  }
}
</script>

<style >
.one-word {
  hyphens: none;
  display:table-caption;
  color: #c4d396;
  font-weight: bold;
}
</style>
