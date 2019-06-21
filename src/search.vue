<template>
  <div class="search-container">
    <div>Search here:</div>
    <input class="input-container" type="text" v-on:input="searchHandler">
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      searchTerm: ""
    };
  },
  methods: {
    searchHandler: function(event) {
      this.searchTerm = event.target.value;
      this.$emit("searchTerm", this.searchTerm);
    }
  }
};
</script>

<style>
.input-container {
  border: none;
  border-bottom: 1px solid white;
  background: transparent;
  outline: none;
  color: white;
  width: 300px;
  margin-top: 10px;
  font-size: 16px;
}
.search-container {
  margin: 65px 0 5px;
}
</style>
