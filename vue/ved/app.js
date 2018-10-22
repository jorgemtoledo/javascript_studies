
new Vue({
  el: '#beerApp',

  data: {
    cervejarias: [],
    openDetails: []
  },

  methods:{
    list(){
      fetch('https://gist.githubusercontent.com/vedovelli/3a83755e576778088c93/raw/204ced0602760829597f5caa2680e5f7cb29bade/cervejarias.json')
      .then(response => response.json())
      .then((data) => { this.cervejarias = data;
      }).catch(e => {
        console.log(e)
      })
    },

    doOpenDetails: function(ev, id)
    {
      // window.console.log(ev, id);
      // Para o evento seguir o link
      ev.preventDefault();

      index = this.openDetails.indexOf(id);

      if(index > -1)
      {
        this.openDetails.splice(index, 1);
      } else {
        this.openDetails.push(id);
      }
    },

    doOpenAllDetails: function(ev)
    {
      // window.console.log(ev);
      ev.preventDefault();
      let self = this;

      // =============Foi alterado pelo lodash================
      // let ids = [];
      // self.cervejarias.map(function(cervejaria)
      // {
      //   ids.push(cervejaria.id);
      // });
      // ====================================================

      let ids = _.map(self.cervejarias, 'id');

      if(self.openDetails.length > 0)
      {
        self.openDetails = [];
      } else {
        let id;
        for (id = 1; id < ids.length; id++) {
          self.openDetails.push(id);
        }
      }
    }
  },

  mounted() {
    this.list();
  }


})