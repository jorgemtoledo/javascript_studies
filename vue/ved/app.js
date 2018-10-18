new Vue({
  el: '#beerApp',

  data: {
    cervejarias: []
  },

  methods:{
    list(){
      fetch('https://gist.githubusercontent.com/vedovelli/3a83755e576778088c93/raw/204ced0602760829597f5caa2680e5f7cb29bade/cervejarias.json')
      .then(response => response.json())
      .then((data) => { this.cervejarias = data;
      }).catch(e => {
        console.log(e)
      })
    }
  },

  mounted() {
    this.list();
  }


})