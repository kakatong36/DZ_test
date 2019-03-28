<template>
  <div class="home">
    <div class="index-bg">
      <!-- <a href="javascript:;" class="userCenter" @click='go_logout'></a> -->
      <a href="javascript:;" class="userCenter" @click='orderList'></a>
      <img src="../../common/images/home/jewel.png" class="jewel" alt="jewel">
    </div>
    <div id="content">
      <div class="theme">
        <ul id="plist" class="table-box">
          <li class="cell">
            <div class="img individuality">
            	<router-link to="/personal" class="img individuality"></router-link>
            </div>
          </li>
          <li class="cell" >
            <router-link to="/fashion" class="img fashion"></router-link>
          </li>
          <li class="cell">
            <router-link to="/plans" class="img plans"></router-link>
          </li>
          <li class="cell">
            <router-link to="/" class="img private"></router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="nav">
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <span></span>
    </div>

  </div>
</template>

<script>
    export default {
        name: 'home',
        data () {
            return {
            isShow: this.$store.state.header.isShow = false,
            isShowF: this.$store.state.footer.isShow = false,
            }
        },
        created(){
            console.log(this.$route)
            this.getList()
        },
        methods:{
            //该接口仅用于测试token是否过期
            getList(){
                var options = {
                    url:'/order_Api_CustomizeOrder_GetCustomizeOrderList',
                    params: {
                        pageIndex: 1,
                        pageSize: 10
                    }
                }
                var cbok = res => {}
                var cbno = res => {}
                var cbnull = res => {}
                this.http.get(options,cbok,cbno,cbnull)
            },
            orderList(){
                this.$router.push({
                    name: 'userCenter'
                })
            },
            go_logout(){
                this.clear_storage()
                this.$router.push({
                    path: '/login'
                })
            },
            clear_storage(){
                localStorage.removeItem("TokenStr")
                localStorage.removeItem("user")
            }
        },
        components: {

        }
    }
</script>

<style lang="scss" scoped>
  @import '../../common/scss/mixin.scss';
  .home{
    position: relative;
    text-align: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .index-bg{
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 78vh !important;
    max-height: 763px;
    background: #191919 url(../../common/images/home/bg.jpg) no-repeat top/cover;
    overflow: hidden;
    text-align: center;
  }
  .index-bg .jewel{
    width: 300px;
    height: 300px;
    margin-top: 200px;
    -webkit-animation:run 20s linear 0s infinite;
  }
  .userCenter{
    @include bg-image('../../common/images/home/userCenter');
    height: 40px;
    width: 40px;
    right: 40px;
    top: 40px;
    position: absolute;
  }
  .theme {
    width: 96%;
    margin: 1.5em auto 0;
  }
  .theme li {
    text-align: center;
    width: 1%;
    padding: 0 0.5em;
    -webkit-transform: translate3d(0,200px,0);
    transform: translate3d(0,200px,0);
  }
  .theme li:nth-child(1){   
    -webkit-animation:up .5s ease-in-out forwards;
  }
  .theme li:nth-child(2){
     -webkit-animation:up .5s ease-in-out 0.2s forwards;
  }
  .theme li:nth-child(3){
     -webkit-animation:up .5s ease-in-out 0.3s forwards;
  }
  .theme li:nth-child(4){
     -webkit-animation:up .5s ease-in-out 0.4s forwards;
  }
  .theme li .img{
    display:block;
    height:140px;
  }
  .theme li .fashion{
    @include bg-image('../../common/images/home/fashion')
  }
  .theme li .plans{
    @include bg-image('../../common/images/home/plans')
  }
  .theme li .individuality{
    @include bg-image('../../common/images/home/individuality')
  }
  .theme li .private{
    @include bg-image('../../common/images/home/private')
  }

   @-webkit-keyframes up{
    from{
      -webkit-backface-visibility:hidden;
      -webkit-transform: translate3d(0,200px,0) rotate(-10deg);
      transform: translate3d(0,200px,0) rotate(-10deg);
    }
    to{
      -webkit-backface-visibility:hidden;
      -webkit-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
    }
  }

  @-webkit-keyframes run{
    from{
      -webkit-transform:rotate(0deg);
      transform:rotate(0deg);
    }
    to{
      -webkit-transform:rotate(360deg);
      transform:rotate(360deg);
    }
  }



</style>
