Vue.filter('dateFormat', function(value)
{
  // Format date
  // window.console.log(value);
  return moment(value).format('DD/MM/YYYY HH:mm:ss');
  // return value;
});

new Vue({
  el: '#beerApp',

  data: {
    visibleColumns: ['name', 'last_mod'],
    filterTerm: '',
    cervejarias: [],
    openDetails: [],
    sortColumn: 'name',
    sortInverse: false
  },

  computed: {
    filteredCervejaria: function () {
      var self = this;
        return this.cervejarias.filter(function (cervejaria) {
            return cervejaria.name.toLowerCase().indexOf(self.filterTerm.toLowerCase()) >= 0
            || cervejaria.city.toLowerCase().indexOf(self.filterTerm.toLowerCase()) >= 0
            || cervejaria.state.toLowerCase().indexOf(self.filterTerm.toLowerCase()) >= 0
            || cervejaria.country.toLowerCase().indexOf(self.filterTerm.toLowerCase()) >= 0;
        });
      }
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

    doSort: function(ev, column)
    {
      ev.preventDefault();
      let self = this;
      let result_ev = ev;

      self.sortColumn = column;

      if(result_ev == true)
      {
        self.sortInverse = !self.sortInverse;
      } else {
        self.sortInverse = !self.sortInverse;
      }
      window.console.log(self.sortColumn);
      window.console.log(self.sortInverse);
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