(function () {
    function CharFilter() {
        if(!this instanceof CharFilter){
            return new CharFilter;
        }
    }
    CharFilter.prototype = {
        constructor : CharFilter ,
        fnInit : function (option) {
            var oDefault = {
                container1: ['','550px','300px'], //容器1
                container2: ['','550px','100px'], //容器1
                container3: ['','750px'], //容器1
                c1_style: {
                    width:'100px',
                    height:'100px',
                    border:'1px solid #a9a9a9',
                    float:'left',
                    position:'relative'
                },
                c2_style: {}, //显示的下拉div的样式设置
                data_url: '', //ajax请求的url
                sDivID1: 'Plugin_CharFilterDiv1',
                sDivID2: 'Plugin_CharFilterDiv2',
                sDivID3: 'Plugin_CharFilterDiv3',
            };
            //初始化参数
            var _option = option;
            for(var p in oDefault){
                this[p]  = _option[p] || oDefault[p]
            }
            this.callerCarft = [];
            //aJax
            this.util.fnGet(this.data_url, function (data) {
                // console.log(this);
                this.aData = eval(data)[0];
                //获取控件
                this.domContainer1 = document.getElementById(this.container1[0]);
                this.domContainer2 = document.getElementById(this.container2[0]);
                this.domContainer3 = document.getElementById(this.container3[0]);
                //渲染必要节点
                this.fnRender()
            }.bind(this), 100);

            console.log(this);

        },
        fnRender: function () {
            if (this.sDivID1 && this.sDivID2){
                var sDivID1 = '<div id="'+ this.sDivID1 +'" class="CharFilterDiv" style="width:'+
                        this.container1[1]+
                        '; height:'+
                        this.container1[2]+
                        ';'+
                        'border:1px solid #a9a9a9;'+
                        'position:relative;'+
                        '">',
                    i,
                    aData=this.aData,
                    style='',
                    c1_style=this.c1_style;

                var sDivID2 = '<div id="'+ this.sDivID2 +'" class="CharFilterDiv" style="width:'+
                    this.container2[1]+
                    '; height:'+
                    this.container2[2]+
                    ';'+
                    'border:1px solid #a9a9a9;position:relative;overflow: auto"></div>' +
                    '<button>清空</button><button>查找</button>';

                var sDivID3 = '<div id="'+ this.sDivID3 +'" class="CharFilterDiv" style="width:'+
                    this.container3[1]+
                    ';height:900px;'+ 'border:1px solid #a9a9a9;position:relative;overflow:auto">' +
                    '</div>';

                //解析样式表
                for(var p in c1_style){
                    style += p + ':' + c1_style[p] + '; '
                }
                console.log(style);
                //批量创建子容器
                for(i=0;i< aData.caller_data.length;i++){
                    sDivID1 +=
                        '<div id="caller_' +
                            aData.caller_data[i] +
                            '" class="caller" " style="' + style + '">'+
                            '<image src="image/'+ aData.caller_data[i] +'.jpg" width="100px" height="100px"></image>'+
                        '</div>'
                }
                sDivID1 +='</div>';

                //Plugin_CharFilterDiv1
                this.domContainer1.innerHTML = sDivID1;
                //Plugin_CharFilterDiv2
                this.util.fnInnerHTML(sDivID2,this.domContainer2);
                //Plugin_CharFilterDiv3
                this.domContainer3.innerHTML = sDivID3;
                //缓存dom
                this.Plugin_CFDiv1 = document.getElementById('Plugin_CharFilterDiv1');
                this.Plugin_CFDiv2 = document.getElementById('Plugin_CharFilterDiv2');
                this.Plugin_CFDiv3 = document.getElementById('Plugin_CharFilterDiv3');

                //Event
                this.fnMainEvent();
            }
        },
        fnMainEvent: function () {
            //
            this.util.fnAddEvent(this.Plugin_CFDiv1, 'click', this._eAddtoCart.bind(this));
            this.util.fnAddEvent(this.Plugin_CFDiv2, 'click', this._eshowResult.bind(this));
        },
        fnSubEvent: function () {
            //

        },
        _fnRemoveCart:function () {

        },
        _eAddtoCart: function (event) {
            if(this.callerCarft.length < 5){
                var target = event.target;
                var cloneNode = target.cloneNode(true);
                var parentDiv = target.parentNode.id;
                this.callerCarft.push((/_(\w*)/.exec(parentDiv))[1]);
                console.log(this.callerCarft);
                this.Plugin_CFDiv2.appendChild(cloneNode);
            }
        },
        _eSearch:function () {
            var datacache = [] = this.aData.data;
            var carft = this.callerCarft;
            var cache,result=[],count=0;
            var carftcache = this.util.unique(carft,'obj');
            var carftrank = this.util.unique(carft,'arr');
            console.log(carftrank)

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
        _eshowResult:function () {
            console.log(this._eSearch());
        },
        util: {//公共接口方法
            fnInsertAfter: function (ele, targetEle) {
                var parentnode = targetEle.parentNode || targetEle.parentElement;
                if (parentnode.lastChild == targetEle) {
                    parentnode.appendChild(ele);
                } else {
                    parentnode.insertBefore(ele, targetEle.nextSibling);
                }
            },
            fnAppendChild: function (ele, targetEle) {
                if (typeof ele == 'string'){
                    var ele = this.parseDom(ele);
                    console.log(ele);
                }
                targetEle.appendChild(ele);
            },
            fnInnerHTML: function (html, targetEle,bln) {
                if (bln == true){
                    targetEle.innerHTML += html;
                }else
                targetEle.innerHTML = html;
            },
            fnAddEvent: function (ele, evt, fn) {
                if (document.addEventListener) {
                    ele.addEventListener(evt, fn, false);
                } else if (document.attachEvent) {
                    ele.attachEvent('on' + evt, fn);
                } else {
                    ele['on' + evt] = fn;
                }
            },
            parseDom:function (arg) {
                var objE = document.createElement("div");
                objE.innerHTML = arg;
                return objE.firstElementChild;
            },
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

    }
    window.CharFilter = function (option) {
            var autoComplete = new CharFilter();
            autoComplete.fnInit(option);
            // setTimeout(function () {
            //     console.log(autoComplete.aData)
            // },3000)

    }
}(window));