import Vue from 'vue';
import VueRouter from "vue-router";
import VueResource from "vue-resource"
import App from './App.vue';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';



import "./common/less/index.css";

import star from "./components/star";
import shopcart from "./components/shopcart";
import cartcontrol from "./components/cartcontrol";
import food from "./components/food";
import split from "./components/split";
import ratingselect from "./components/ratingselect";


Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(star);
Vue.use(shopcart);
Vue.use(cartcontrol);
Vue.use(food);
Vue.use(split);
Vue.use(ratingselect);

const routes=[
    {path:'/goods',component:goods},
    {path:'/ratings',component:ratings},
    {path:'/seller',component:seller},
    {path:'*',redirect:"/goods"},
]

const router=new VueRouter({
    routes
})


var app=new Vue({
    router,
    el:"#app",
    render:h => h(App)
})