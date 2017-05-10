<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
    <div class="tab">

     <div class="tab-item">
         <router-link to="/goods">商品</router-link>
     </div>
     <div class="tab-item">
         <router-link to="/ratings">评论</router-link>
     </div>
     <div class="tab-item">
         <router-link to="/seller">商家</router-link>
     </div>
    </div>
    <keep-alive>
        <router-view :seller="seller" keep-alive></router-view>
    </keep-alive>

  </div>
</template>

<script>
    import{urlParse} from "./common/js/util";
    import header from "./components/header/header.vue";
export default {
    data() {
      return {
          seller:{
              id:(() =>{
                  let queryParam = urlParse();
                  console.log(queryParam);
                  return queryParam.id;
              })()
          }
      };
    },
  created(){
        this.$http.get('../../data.json').then((res) => {
            this.seller=res.data.seller;
        });
  },
  components:{
      "v-header":header

  }

}
</script>

<style lang="less" rel="stylesheet/less">
  .tab{
    display: flex;
    width:100%;
    height:40px;
    line-height:40px;
    /*border-1px(rgba(7,17,27,0.1))*/
    border-bottom:1px solid rgba(7,17,27,0.1);
    .tab-item{
      flex:1;
      text-align: center;
        a{
            display: block;
            font-size:14px;
            color:rgb(77,85,93);
        }
        a.router-link-active{
            color:rgb(240,20,20);
        }

    }
  }

</style>
