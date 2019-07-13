//模版编译
import { Compile } from "./compile";
import {Dep} from './dep'
import {Watcher} from './watcher'


 export function Vue(options){
    this.$options = options
    let data = options.data
    data =  this._data = typeof data === 'function' ? data.call(this) : data
    _initData(this,data)
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
            Dep.target && dep.addSub(Dep.target)  
            return val
         },
         set(newVal){
            if(newVal === val){
                  return val
            }
            val = newVal
            dep.notify(val)
            observe(data)
         }
   })
 }