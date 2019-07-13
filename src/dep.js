export function Dep(){
   this.subs = [] 
}

Dep.prototype.addSub = function (sub){
this.subs.push(sub)
}

Dep.prototype.notify = function(){
    this.subs.forEach(function(watcher){
        watcher.update()
    }) 
}


