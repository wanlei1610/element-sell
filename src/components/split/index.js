import splitComponent from "./split.vue";
const split={
    install:function (Vue) {
        Vue.component("split",splitComponent)
    }
}
export default split;
