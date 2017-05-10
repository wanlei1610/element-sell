<template>
    <div class="goods">
        <div class="menu-wrapper" ref='menuWrapper'>
            <ul>
                <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                    <span class="text">
                        <span v-show="item.type> 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref='foodsWrapper'>
            <ul>
                <li v-for="(item,index) in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li @click="selectFood(food,$event)" v-for="(food,index) in item.foods" class="food-item">
                            <div class="icon">
                                <img width="57px" height="57px" :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
        <food :food="selectedFood" ref="food"></food>
    </div>

</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import Vue from "vue";
 export default{
    props:{
        seller:{
            type:Object
        }
    },
     data(){
        return {
            goods:[],
            listHeight:[],
            scrollY:0,
            bus: new Vue(),
            selectedFood:{},
        };
     },
     computed:{
         currentIndex() {
             for(let i=0;i<this.listHeight.length;i++){
                 let height1=this.listHeight[i];
                 let height2=this.listHeight[i+1];
                 if(!height2||(this.scrollY >= height1&&this.scrollY<height2)){
                     return i;
                 }
             }
             return 0;
         },
         selectFoods(){
             let foods=[];
             this.goods.forEach((good) =>{
                 good.foods.forEach((food) =>{
                     if(food.count){
                         foods.push(food);
                     }
                 });
             });
             return foods;
         }
     },
     created(){
         this.classMap=['decrease','discount','guarantee','invoice','special'];
        this.$http.get("../../data.json").then((res) =>{
            this.goods=res.data.goods;
            this.$nextTick(() => {
                this._initScroll();
                this._calculateHeight();
            });
        })
     },
     methods:{
         selectMenu(index,event) {
             if(!event._constructed){
                 return;
             }
             let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
             let el=foodList[index];
             this.foodsScroll.scrollToElement(el,300);
         },
         _initScroll() {
             this.meunScroll=new BScroll(this.$refs['menuWrapper'],{
                 click:true
             });
             this.foodsScroll=new BScroll(this.$refs['foodsWrapper'],{
                 click:true,
                 probeType:3
             });
             this.foodsScroll.on("scroll",(pos) => {
                 this.scrollY =Math.abs(Math.round(pos.y));
             })
         },
         _calculateHeight() {
             let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
             let height=0;
             this.listHeight.push(height);
             for(let i=0;i<foodList.length;i++){
                 let item=foodList[i];
                 height+=item.clientHeight;
                 this.listHeight.push(height);
             }
         },
         selectFood(food,event) {
             if(!event._constructed){
                 return;
             }
             this.selectedFood=food;
             this.$refs.food.show();
         },
     }
 }
</script>

<style lang="less" rel="stylesheet/less">
.goods{
    display: flex;
    position: absolute;
    top:174px;
    bottom:46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper{
        flex:0 0 80px;
        width: 80px;
        background:#f3f5f7;
        .menu-item{
            display: table;
            height:54px;
            width: 56px;
            line-height:14px;
            padding:0 12px;
            &.current{
                position: relative;
                z-index: 10;
                margin-top:-1px;
                background:#fff;
                font-weight: 700;
                .text{
                    border:none
                }
            }
            .text{
                display: table-cell;
                width: 56px;
                vertical-align: middle;
                font-size:12px;
                border-top:1px solid rgba(7,17,27,.1);
                .icon{
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    margin-right:2px;
                    background-size:12px 12px;
                    /*background-image:url(decrease_1@2x.png);*/
                    &.decrease{
                        /*bg-image('decrease_1')*/
                        background-image:url(./decrease_3@2x.png);
                    }
                    &.discount{
                        /*bg-image('discount_1')*/
                        background-image:url(./discount_3@2x.png);
                    }
                    &.guarantee{
                        /*bg-image('guarantee_1')*/
                        background-image:url(./guarantee_3@2x.png);
                    }
                    &.invoice{
                        /*bg-image('invoice_1')*/
                        background-image:url(./invoice_3@2x.png);
                    }
                    &.special{
                        /*bg-image('special_1')*/
                        background-image:url(./special_3@2x.png);
                    }
                }
            }
        }
    }
    .foods-wrapper{
        flex:1;
        .title{
            padding-left:14px;
            height: 26px;
            line-height:26px;
            border-left:2px solid #d9dde1;
            font-size:12px;
            color:rgb(147,153,159);
            background:#f3f5f7;
        }
        .food-item{
            display: flex;
            margin:18px;
            padding-bottom:18px;
            border-bottom:1px solid rgba(7,17,27,.1);
            position: relative;
            &:last-child{
                border-bottom:0px;
                margin-bottom:0;
            }
            .icon{
                flex:0 0 57px;
                margin-right:10px;
            }
            .content{
                flex:1;
                .name{
                    margin:2px 0 8px 0;
                    height: 24px;
                    line-height:24px;
                    font-size:14px;
                    color:rgb(7,17,27);
                }
                .desc{
                    margin-bottom:8px;
                    line-height:12px;
                    font-size:10px;
                    color:rgb(147,153,159);
                }
                .extra{
                    line-height:10px;
                    font-size:10px;
                    color:rgb(147,153,159);
                    .count{
                        maragin-right:12px;
                    }
                }
                .price{
                    font-weight:700;
                    line-height:24px;
                    .now{
                        margin-right:8px;
                        font-size:14px;
                        color:rgb(240,20,20);
                    }
                    .old{
                        text-decoration: line-through;
                        font-size:10px;
                        color:rgb(147,153,159);
                    }
                }
                .cartcontrol-wrapper{
                    position: absolute;
                    right:0;
                    bottom:12px;
                }
            }
        }
    }
}
</style>