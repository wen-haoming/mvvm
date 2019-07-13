import {Vue} from './myVue'


const vm =  new Vue({
    el:"#app",
    data() {
        return {
            
            a:{
                title:"我是p标签"
            },
            b:{
                h1:"我是h1标签"
            },
            c:"我是c"
        }
    },
})

window.vm = vm