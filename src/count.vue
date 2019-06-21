<template>
  <div class="count-container">We found {{count}} result(s)</div>
</template>

<script>
export default {
  name: "count",
  props: ["count"]
};
</script>

<style>
.count-container {
  font-size: 14px;
  margin-top: 10px;
}
</style>
