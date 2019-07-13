import { Dep } from './dep';

export function Watcher(vm,valArr,fn){
    this.fn = fn
    this.vm = vm
    this.valArr = valArr
    //在componile 里面触发下面内容 从而直接在
    Dep.target = this
    let val = vm
    valArr.forEach(function(k){
        val = val[k]
    })
    Dep.target = null
}

Watcher.prototype.update = function(){
   let newVal = this.vm
   this.valArr.forEach(function(ele){
    newVal = newVal[ele]
   })
    this.fn(newVal)
}

