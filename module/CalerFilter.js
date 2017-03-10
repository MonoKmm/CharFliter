(function () {
    function CharFilter() {
        if(!this instanceof CharFilter){
            return new CharFilter;
        }
        this.callerCarft = [];
    }
    CharFilter.prototype = {
        constructor : CharFilter ,
        fnInit : function (option) {
            var oDefault = {
                data_url: '' //ajax请求的url
            };
            //初始化参数
            var _option = option;
            for(var p in oDefault){
                this[p]  = _option[p] || oDefault[p]
            }

        },
        getCarft:function () {

        },
        addCarft:function (index) {

        },
        removeCarft:function (index) {

        },
        dataFilter:function () {
            var datacache = [] = this.aData.data;
            var carft = this.callerCarft;
            var cache,result=[],count=0;
            var carftcache = this.util.unique(carft,'obj');
            var carftrank = this.util.unique(carft,'arr');
            console.log(carftrank);

            for (var p=0,len=carftrank.length;p<len;p++){
                cache = carftrank[p];
                count = carftcache[cache];

                for(var i=0;i<datacache.length;i++){
                    if(datacache[i][cache] && datacache[i][cache] == count ){
                        result.push(datacache[i]);
                        datacache.splice(i+1,1);
                    }
                    else if(datacache.length && result.length){
                        return datacache;
                    }
                }
            }
            return result;
        },
        getDataList:function () {

        },
        util: {//公共接口方法
            unique:function(arr,retype) {
                var robj = {},rarr = [];
                if (retype == 'obj'){
                    for (var i=0,len=arr.length;i < len;i++) {
                        if ( robj[(arr[i])]){
                            robj[(arr[i])] += 1;
                        }else {
                            robj[(arr[i])] = 1;
                        }
                    }
                    return robj;
                }
                else if(retype == 'arr'){
                    for (var i=0,len=arr.length;i < len;i++) {
                        if (!robj[arr[i]]){
                            rarr.push(arr[i]);
                            robj[arr[i]] = true;
                        }
                    }
                    return rarr;
                }
            },
            fnGet: function (url, fn, timeout) {
                var xhr = null;
                try {
                    if (window.XMLHttpRequest) {
                        xhr = new XMLHttpRequest();
                    } else if (Window.ActiveXObject) {

                        xhr = new ActiveXObject("Msxml2.Xmlhttp");
                    }
                } catch (e) {
                    //TODO handle the exception
                    xhr = new ActiveXObject('Microsoft.Xmlhttp');
                }
                xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        fn.call(this, this.responseText);
                    } else {
                        setTimeout(function () {
                            xhr.abort();
                        }, timeout);
                    }
                };
                xhr.open('get', url, true);
                xhr.send();
            }
        }
    },
    window.CharFilter = function (arr) {
        var autoComplete = new CharFilter();
        autoComplete.fnInit(arr);
    }
}(window));