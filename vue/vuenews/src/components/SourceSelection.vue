<template>
  <div class="surceselection">
    <div class="jumbotron">
      <h2><span class="glyphicon glyphicon-list-alt"></span> News List</h2>
      <h4>Select News </h4>
      <select class="form-control" v-on:change="sourceChanged">
        <option v-bind:value="source.id" v-for="source in sources" >{{source.name}}</option>
      </select>

      <dir v-if="source">
        <h6>{{source.description}}</h6>
        <a v-bind:href="source.url" class="btn btn-primary" target="_blank">
          Go to {{source.name}} website
        </a>

      </dir>


    </div>
  </div>
</template>

<script>
  export default {
    name: 'surceselection',
    data() {
      return {
        sources: [],
        source: ''
      }
    },
    methods: {
      sourceChanged: function (e) {
        for (let i=0; i < this.sources.length; i++ ){
          // window.console.log(i)
          if(this.sources[i].id == e.target.value) {
            this.source = this.sources[i];
          }
        }
        this.$emit('sourceChanged', e.target.value);
      }
    },
    created: function () {
      this.$http.get('https://newsapi.org/v1/sources?language=en')
      .then(response => {
        this.sources = response.data.sources;
      });
    }
  }
</script>

<style scoped>

</style>
