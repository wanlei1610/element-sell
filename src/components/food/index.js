import foodComponent from "./food.vue"

const food={
    install:function (Vue) {
        Vue.component("food",foodComponent)
    }
}
export default food;
