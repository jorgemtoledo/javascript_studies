new Vue({
    el: '#app',
    data: {
        message: 'Teste hoocks e Ciclo de vida dos componentes',
        open: false
    },
    methods: {
        update() {
            this.open = !this.open
        }
    }
})