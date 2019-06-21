<template>
  <div id="app">
    <div class="main-container columns">
      <div class="column is-one-quarter side-panel">
        <div class="side-panel-contents">
          <h2 class="title-text">DICTIONARY</h2>
          <app-search @searchTerm="searchTermValue"/>
          <countComponent v-if="count > 0 && count < 1787" :count="count"/>
          <!-- <router-link to="/details" v-on:click="clickHandler">About</router-link> -->
        </div>
      </div>
      <div id="info-data" class="columns column is-multiline is-three-quarter">
        <router-view></router-view>
        <div v-if="loader" class="loader-custom">
          <img src="assets/loader.gif" alt="loader">
        </div>
        <div
          tabindex="0"
          v-for="(item, index) of filteredList"
          class="column card is-one-quarter"
          :key="index"
        >
          <h3 class="card-header">Word: {{item.word}}</h3>
          <div class="card-content">
            <p>In Hindi: {{item.nagari}}</p>
            <p class="content">Description: {{item.description}}</p>
            <p>Category: {{item.category}}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="scroll" class="scroll-to-top" v-on:click="scrollTop">
      <img src="assets/arrow.png" alt="arrow">
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Search from "./search.vue";
import Count from "./count.vue";
export default {
  data() {
    return {
      message: "Dictionary",
      info: [],
      alert: null,
      searchFilter: false,
      searchData: "",
      scroll: false,
      loader: true,
      count: 0,
      routedComponent: false
    };
  },
  async mounted() {
    this.scrollFunc();
    this.routedComponent = false;
    try {
      const response = await axios.get("https://sheetlabs.com/IND/vs");
      this.info = response.data;
      this.loader = false;
    } catch (error) {
      this.alert = "error: " + error.message;
    }
  },
  components: {
    appSearch: Search,
    countComponent: Count
  },
  computed: {
    filteredList() {
      this.searchFilter = true;
      this.count = 0;
      return this.info.filter(item => {
        if (item.word.toLowerCase().includes(this.searchData.toLowerCase())) {
          this.count++;
          return item.word;
        }
        return 0;
      });
    }
  },
  methods: {
    searchTermValue: function(value) {
      this.searchData = value;
    },
    scrollTop: function() {
      window.scrollTo(0, 0);
    },
    scrollFunc: function() {
      window.onscroll = event => {
        if (window.scrollY > 100) {
          this.scroll = true;
        } else {
          this.scroll = false;
        }
      };
    },
    clickHandler: function() {
      console.log("here");
      routedComponent = true;
    }
  }
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-size: 18px;
  font-family: "Roboto", sans-serif;
}
.column {
  width: 20%;
  margin: 20px;
  margin-top: 0;
}
.column.side-panel {
  background: #463fab;
  color: white;
  margin: 0;
  padding: 20px;
  min-height: 100vh;
}
.title-text {
  text-align: center;
  color: #ecedec;
  font-weight: bold;
  font-size: 24px;
  left: 65px;
}
#info-data {
  margin: 20px 0;
}
.card .card-header {
  font-weight: bold;
  text-align: center;
  display: block;
}
.scroll-to-top {
  height: 40px;
  width: 40px;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 1;
  cursor: pointer;
}
.loader-custom {
  width: 100px;
  height: 100px;
  position: relative;
  top: 40vh;
  left: 480px;
}
.side-panel-contents {
  position: fixed;
}
.card:hover {
  cursor: pointer;
  border: 1px solid grey;
  transform: scale(1.01);
}
</style>