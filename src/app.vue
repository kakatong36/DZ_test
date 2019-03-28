<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
    
  </div>
</template>

<script>
    import header from 'components/header/header'
    export default {
        computed:{

        },
        watch: {
            "$route": "checkByRoute",
        },
        components:{
            'v-header':header,
        },
        methods: {
            checkByRoute(to, from){
                if(to.name != 'login'){
                    if(!localStorage.getItem("TokenStr") || !localStorage.getItem("user")){
                        this.$router.push({
                            name: 'login'
                        })
                    }
                }
            }
        }
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
