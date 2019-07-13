//模版编译
import { Compile } from "./compile";
//订阅这
import {Dep} from './dep'


 export function Vue(options){
    this.$options = options
    let data = options.data
    //如果data是函数则执行并且改变this指向，否则只需要data对象
    data =  this._data = typeof data === 'function' ? data.call(this) : data
    //对数据进行深度监听和代理
    _initData(this,data)
    //数据都遍历好之后进行模版编译
    new Compile(this,options.el)
 }

 function _initData(vm,data){
      observe(data)
      proxy(vm,data)
 }

 function observe(data){
   new Observe(data)
}

 function proxy(vm,data){
   for(let key in data){
      Object.defineProperty(vm,key,{
         get(){
           return  vm._data[key]
         },
         set(newVal){
            vm._data[key] = newVal
         }
      })
   }
}


 function Observe(data){
      for(let key in data){
         if(typeof data[key] === 'object'){
               observe(data[key])
         }else{
            defineReactive(data,key)
         }
      }
 }

 function defineReactive(data,key){
   let val = data[key]
   let dep = new Dep()
   Object.defineProperty(data,key,{
         get(){
            //添加到订阅函数里面
            Dep.target && dep.addSub(Dep.target)  
            return val
         },
         set(newVal){
            if(newVal === val){
                  return val
            }
            //设置新的值
            val = newVal
            //触发发布订阅从而试图改变
            dep.notify(val)
            //重新对数据进行绑定
            observe(data)
         }
   })
 }