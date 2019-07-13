import {Watcher} from './watcher'
/**
 * 
 * @param {vm实例} vm 
 * @param {挂载元素} el 
 */
export function Compile(vm,el){
    vm.$el = document.querySelector(el)
    let fragment = document.createDocumentFragment()
    let child
   
    while(child = vm.$el.firstChild){
        fragment.appendChild(child)
    }
    replaceNode(fragment)
    //匹配所有节点如果节点存在潜逃就进行递归操作
    function replaceNode(node){
        [...node.childNodes].forEach((ele)=>{
            let reg = /\{\{(.*?)\}\}/
            let text = ele.textContent
            if(ele.nodeType === 3 && reg.test(text)){
                let val = vm
               let valArr =  RegExp.$1.split(".")
               valArr.forEach(function(k){
                    val = val[k]
               })
               new Watcher(vm,valArr,function (newVal){
                ele.textContent = text.replace(reg,newVal)
               })

               ele.textContent = text.replace(reg,val)
            }
             if(ele.childNodes){
                replaceNode(ele)
            }
           
    })
   
    }
    document.body.appendChild(fragment)
}