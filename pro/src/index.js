import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheet/App.css';
// import './pro.js/addToolbar.js';
class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
    componentDidMount(){
    //引入地图
      const   map=new window.AMap.Map('container',{
        resizeEnable:true,
        zoom:20,
        center:[116.191031,39.988585]
      });
      
      //添加地图控件
      AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],function(){
        map.addControl(new AMap.ToolBar());

        map.addControl(new AMap.Scale());

        map.addControl(new AMap.OverView({isOpen:true}));

      })

      
      if (!isSupportCanvas()) {
        alert('热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~')
    }
    //详细的参数,可以查看heatmap.js的文档 http://www.patrick-wied.at/static/heatmapjs/docs.html
    //参数说明如下:
    /* visible 热力图是否显示,默认为true
     * opacity 热力图的透明度,分别对应heatmap.js的minOpacity和maxOpacity
     * radius 势力图的每个点的半径大小   
     * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
     *	{
     .2:'rgb(0, 255, 255)',
     .5:'rgb(0, 110, 255)',
     .8:'rgb(100, 0, 255)'
     }
     其中 key 表示插值的位置, 0-1 
     value 为颜色值 
     */
    var heatmap;
    map.plugin(["AMap.Heatmap"], function() {
        //初始化heatmap对象
        heatmap = new AMap.Heatmap(map, {
            radius: 20, //给定半径
            opacity: [0, 0.1]
            // ,gradient:{
            //  0.5: 'blue',
            //  0.65: 'rgb(117,211,248)',
            //  0.7: 'rgb(0, 255, 0)',
            //  0.9: '#ffea00',
            //  1.0: 'red'
            //  }
        });
        //设置数据集：该数据为北京部分“公园”数据
        heatmap.setDataSet({
            data: heatmapData,
            max: 100
        });
    });
    //判断浏览区是否支持canvas
    function isSupportCanvas() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    }



    //   AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function(PathSimplifier, $) {

    //     if (!PathSimplifier.supportCanvas) {
    //         alert('当前环境不支持 Canvas！');
    //         return;
    //     }

    //     var emptyLineStyle = {
    //         lineWidth: 0,
    //         fillStyle: null,
    //         strokeStyle: null,
    //         borderStyle: null
    //     };

    //     var pathSimplifierIns = new PathSimplifier({
    //         zIndex: 100,
    //         //autoSetFitView:false,
    //         map: map, //所属的地图实例

    //         getPath: function(pathData, pathIndex) {

    //             return pathData.path;
    //         },
    //         getHoverTitle: function(pathData, pathIndex, pointIndex) {

    //             return null;
    //         },
    //         renderOptions: {
    //             //将点、线相关的style全部置emptyLineStyle
    //             pathLineStyle: emptyLineStyle,
    //             pathLineSelectedStyle: emptyLineStyle,
    //             pathLineHoverStyle: emptyLineStyle,
    //             keyPointStyle: emptyLineStyle,
    //             startPointStyle: emptyLineStyle,
    //             endPointStyle: emptyLineStyle,
    //             keyPointHoverStyle: emptyLineStyle,
    //             keyPointOnSelectedPathLineStyle: emptyLineStyle
    //         }
    //     });

    //     window.pathSimplifierIns = pathSimplifierIns;

    //     pathSimplifierIns.setData([{
    //         name: '测试',
    //         path: [
    //             [116.405289, 39.904987],
    //             [87.61792, 43.793308]
    //         ]     
    //     },
    //     {
    //         name:'轨迹2',
    //         path:[
    //             [116.405289, 39.904987],
    //             [110.34669, 22.749086],
    //             [113.5000, 22.2000]
    //         ]
    //     },
    //     {
    //         name:'轨迹3',
    //         path:[
    //             [116.405289, 39.904987],
    //             [120.1500,30.2800],
    //             [113.5000, 22.2000]
    //         ]
    //     }
    // ]);

    //     //initRoutesContainer(d);

    //     function onload() {
    //         pathSimplifierIns.renderLater();
    //     }

    //     function onerror(e) {
    //         alert('图片加载失败！');
    //     }

    //     var navg1 = pathSimplifierIns.createPathNavigator(0, {
    //         loop: false,
    //         speed: 1000000,
    //         pathNavigatorStyle: {
    //             width: 24,
    //             height: 24,
    //             //使用图片
    //             content: PathSimplifier.Render.Canvas.getImageContent("http://webapi.amap.com/ui/1.0/ui/misc/PathSimplifier/examples/imgs/car.png", onload, onerror),
    //             strokeStyle: null,
    //             fillStyle: null,
    //             //经过路径的样式
    //             pathLinePassedStyle: {
    //                 lineWidth: 6,
    //                 strokeStyle: 'black',
    //                 dirArrowStyle: {
    //                     stepSpace: 15,
    //                     strokeStyle: 'red'
    //                 }
    //             }
    //         }
    //     });

    //     navg1.start();

    //     var navg2 = pathSimplifierIns.createPathNavigator(1, {
    //         loop: false,
    //         speed: 1000000,
    //         pathNavigatorStyle: {
    //             width: 24,
    //             height: 24,
    //             //使用图片
    //             content: PathSimplifier.Render.Canvas.getImageContent('http://webapi.amap.com/ui/1.0/ui/misc/PathSimplifier/examples/imgs/plane.png', onload, onerror),
    //             strokeStyle: null,
    //             fillStyle: null,
    //             //经过路径的样式
    //             pathLinePassedStyle: {
    //                 lineWidth: 3,
    //                 strokeStyle: 'blue',
    //                 dirArrowStyle: {
    //                     stepSpace: 15,
    //                     strokeStyle: 'yellow'
    //                 }
    //             }
    //         }
    //     });
    //     navg2.start();

    //     var navg3 = pathSimplifierIns.createPathNavigator(2, {
    //         loop: false,
    //         speed: 1000000,
    //         pathNavigatorStyle: {
    //             width: 24,
    //             height: 24,
    //             //使用图片
    //             content: PathSimplifier.Render.Canvas.getImageContent('http://webapi.amap.com/ui/1.0/ui/misc/PathSimplifier/examples/imgs/plane.png', onload, onerror),
    //             strokeStyle: null,
    //             fillStyle: null,
    //             //经过路径的样式
    //             pathLinePassedStyle: {
    //                 lineWidth: 5,
    //                 strokeStyle: 'green',
    //                 dirArrowStyle: {
    //                     stepSpace: 15,
    //                     strokeStyle: null
    //                 }
    //             }
    //         }
    //     });
    //     navg3.start();

    // });
    
    }
    render() {
      return (
        <div>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
          <div id="container"></div>
        </div>
      );
    }
  }

ReactDOM.render(<App/>,document.getElementById('root'));