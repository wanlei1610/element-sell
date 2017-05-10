import starComponent from "./star.vue";

const star={
    install:function (Vue) {
        Vue.component("star",starComponent)
    }
}
export default star;