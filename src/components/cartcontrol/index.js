import cartcontrolComponent from "./cartcontrol.vue";

const cartcontrol={
    install:function (Vue) {
        Vue.component("cartcontrol",cartcontrolComponent)
    }
}
export default cartcontrol;
