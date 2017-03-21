# CharacrterFliter-JavaScript-Plugin  

一个小巧高集成度的账号角色数据筛选插件，它基于原生JavaScript不依赖其他库与框架 



## 安装

在浏览器环境中:

```html
<script src="https://github.com/MonoKmm/CharFliter/blob/master/CharFilter.js"></script>
```

## API

### fnInit(Object)  
插件初始化  
以一个包含 url属性的 Object类型数据为参数.  

```js
    var option = {
        url: 'data/charlist.json'
    };
    var cf = new CharFilter(option);
```

### getDataList(String,Function) 
通过Ajax获取数据列表(*.json)  
从Ajax返回数据(Object)中获取与String相同的键值(key)，作为参数传递至Function
```js
    cf.getDataList("char_img",function (data) {
        console.log(data)
    });
    
```
### dataFilter(Boolearn,String,Array)  
数据筛选，返回的Object是定制筛选的结果，

支持复数同类角色数据筛选  
支持多种角色组合筛选  
当筛选没有结果返回相似结果  
  
  
* Boolearn : ‘true’/'false' 是否启用‘无筛选结果则返回相似项目’  
* String   : 'script'  启用严格模式，严格匹配每个角色个数  
* Array    : 手动传入筛选条件，在未传入Array的情况下默认根据cartArr数组进行筛选操作  

```js

    cf.dataFilter(true,'script'); 
    //{arr:[...],type:'matched'}
    
```
### getCart(Boolearn)  
Boolearn = true; 返回cartArr  
Boolearn = false; 返回cartArr.length  
```js
    cf.getCart(true) //['no05995','no05996']
    cf.getCart(false) // 2
```
### addItem(Target,Boolearn)  
为cartArr属性添加数据  

* Target  : 
````
    //当Target为String类型 : 将Target推入cartArr；
    //当Target为 'true'   : 将恢复cartArr上次清空操作的所有数据；
````
* Boolearn: 是否储存本次操作(撤销用)

### deleteItem(Target,Index,Boolearn)  
删除cartArr数组中指定数据  

* Target  : 
````
    //当Target为String类型 : 从cartArr数组中删除的数据(value)；
    //当Target为 'true'   : 清空cartArr数组中所有数据；
````
* Index   : 从cartArr数组中删除的数据(value)的数组下标
* Boolearn: 是否储存本次操作(撤销用)  

### undoItem()  
返回Object 包含上一次addItem或deleteItem操作保存的数据
```js
    cf.undoItem()//{type:'add',['no05995','no05996']}
```

Cancel the animation and reject the promise.

## Develop & Build

Download the codebase and run:

```bash
npm install
```

You can start a sever through:

```bash
npm start
```

Build and deploy the JS file:

```bash
npm run build
```

## License

MIT
