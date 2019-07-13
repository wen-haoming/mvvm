 function Vue(options){
    this.$options = options
    let data = this.$options.data
    data =  this._data = typeof data === 'function' ? data.call(this) : data
    _initData(this,data)

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
         configurable:true,
         enumerable:true,
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
   Object.defineProperty(data,key,{
         configurable:true,
         enumerable:true,
         get(){
            console.log("get")
            return val
         },
         set(newVal){
            if(newVal === val){
                  return val
            }
            console.log("set")
            val = newVal
            data[key] = newVal
            observe(newVal)
         }
   })
 }