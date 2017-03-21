# CharacrterFliter-JavaScript-Plugin  

一个小巧高集成度的账号角色数据查询插件，它基于原生JavaScript不依赖其他库与框架  
针对游戏账号查询 它有这些优点:
* 支持多种角色组合，比如查询一个游戏账号包含[A,B,C]三种角色的账号
* 复数同角色组合也完全没问题，如查询同时包含两个相同角色的账号[B,B] 
* 未查询到指定账户的情况下可以返回相似结果，比如指定查询[A,B,C,D]，无查询结果将返回[A,B,C]

* 具有撤销功能，储存着查询条件的历史记录，方便用户尝试对角色组合

## CharFliter对象实例提供2个可复写属性：  
````
    cartArr   : Array类型,用于储存筛选条件.
    cartArrhis: Array类型,用于储存cartArr历史数据.
````
## 安装

在浏览器环境中:

```html
<script src="https://github.com/MonoKmm/CharFliter/blob/master/CharFilter.js"></script>
```

## API

### fnInit(Object)  
插件初始化  
提供一个json 作为数据来源.  
json的格式参考 ：[data](https://github.com/MonoKmm/CharFliter/blob/master/tsconfig.json)
* Object: 初始化参数  
插件初始化  
```js
    var option = {
        url: 'data/charlist.json'
    };
    var cf = new CharFilter(option);
```

### getDataList(String,CallBackFn) 
### (Async)
通过Ajax获取数据列表(*.json)，  
从Ajax返回数据(Object)中获取与String相同的键值(key)，作为参数传递至CallBackFn
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
