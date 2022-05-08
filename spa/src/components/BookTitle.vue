<template>
  <b-row  no-gutters class="flex-wrap justify-content-around">
    <b-col cols="auto" class="">
      <b-img-lazy :src="avatar"  width="64" height="100" class="rounded-3" alt="placeholder"></b-img-lazy>
    </b-col>
    <b-col class="m-0 pull-left">
      <h6 class="mt-0 mb-1 fw-bold">
        {{title}}
      </h6>
      <p class="mb-0 text-muted">
        {{author}}
      </p>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "BookTitle",
  props:{
    avatar:{
      type: String
    },
    author:{
      type: String
    },
    title:{
      type: String
    }
  }
}
</script>

<style scoped>

</style>
