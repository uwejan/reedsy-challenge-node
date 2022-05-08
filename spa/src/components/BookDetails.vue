<template>
<div>
  <span class="fw-bold">{{ title }}</span>
  &#8202;
  <span>{{ details }}</span>
</div>
</template>

<script>
export default {
  name: "BookDetails",
  props:{
    title: {
      type: String
    },
    details: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>
