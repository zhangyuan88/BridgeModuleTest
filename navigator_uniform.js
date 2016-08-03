/**
 * Created by wangchenlong on 16/4/17.
 */
'use strict'; // 启用严格模式
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  Image,
  MapView,
  RCTMap,
  NativeModules,
  NativeAppEventEmitter,
} from 'react-native'
// 使用Component的好处是, 可以自动生成注释
// import TestModel from './src/communicationBetweenJSandNative/TestMode.js';
var NativeTest = NativeModules.TestModel; 
//var APPSTATE =   NativeModules.RCTAppState
var deviceEventEmitter = require('RCTDeviceEventEmitter');
var eventEmitterTest = NativeModules.eventEmitterTest;
// import mapviewComponent from './src/mapViewComponent.js';
//var module_default = require('./src/Module_Default.js');
/***正确的写法***/
import BlinkApp from './src/statedemo.js';
import Blink from './src/statedemo.js';
/***正确的写法***/
//  var BlinkApp = require('./src/statedemo.js'); 
// var Blink = require('./src/statedemo.js');
//var mapviewComponentTest = require('./src/mapComponent.js');
// var listener1;
// <script>
var  listener1 = function listener2() {
  console.log('监听器 listener1 执行。');
}
var  listener2 = function listener2() {
  console.log('监听器 listener2 执行。');
}
// </script>

// 绑定 connection 事件，处理函数为 listener1 
 deviceEventEmitter.addListener('eventEmitter', listener1);

// // 绑定 connection 事件，处理函数为 listener2
// eventEmitter.on('connection', listener2);
/*对于原生继承的EventEmitter需要主动调用addListener*/
// NativeAppEventEmitter.addListener( 
//       'EventReminder',
//        listener1,
//        );
NativeAppEventEmitter.addListener(
      'appStateDidChange',
       //listener2,
       (reminder1) => console.log('subscription'+reminder1)
   );

// <script>
//   function addEeventRemianderlistenner(){
//   console.log('addEeventRemianderlistenner');
//   subscription = NativeAppEventEmitter.addListener(
//       'EventReminder',
//       (reminder) => console.log(reminder.name)
//    );
// }
// </script>

class FirstPage extends Component {
  // 填出提示框
  onPress() {
    alert("我是Spike!");
  }
  handleUpdateChange() {
    deviceEventEmitter.addListener('change',function(text){
       console.log('第一页收到通知：'+text);
    });
  }
  /**
   * 跳转页面至SecondPage
   * @param name 传递参数
   * @param type 动画类型
   */
  gotoNext(name, type = 'Normal') {
    console.log('gotoNext');
   this.handleUpdateChange();
    let _this = this;
    const { navigator } = this.props;
    const {images} = this.props;
    console.log('gotoNext: '+images);
    if(navigator) {
      navigator.push({
      component: SecondPage,
      passProps: {
        id: name,
        //从SecondPageComponent获取user
        getUser:function (user) {
           _this.setState({
           user: user
          })
          console.log(JSON.stringify(_this.state.user));
        }
      },
        onPress: this.onPress,
        rightText: 'alert',
        type: type
      });
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      id:1,
      user:null,
      images:null,
      events:null
    };
  }
  
  componentWillMount(){
//     var r = new module_default('Ozzy', 62);
//     r.about(); // Ozzy is 62 years old
//     console.log(NativeTest.modulename);
    //addEeventRemianderlistenner();
//      NativeTest.findEvents((error, events) => {
//         if (error) {
//           console.error(error);
//         } else {
//           console.log(events[1]);
//           this.setState({id:events[0]});
//           this.setState({events: events});
//         }
//       })
//     eventEmitterTest.addListener('eventEmitter');//_listenerCount=1


// NativeAppEventEmitter.addListener( 
//       'eventEmitter',
//        listener2,
//        );
//     console.log('componentWillMount:'+this.props.images);
//     this.setState({images:this.props.images});
//     console.log('componentWillMount:'+this.props.images);
   }
  
  componentWillUnmount(){
    // 千万不要忘记忘记取消订阅, 通常在componentWillUnmount函数中实现。
    //subscription.remove();
    
   // eventEmitterTest.removeListeners(1);
  }
  renderImage(imgURI) {
//      var RCTTestModel1 = require('react-native').NativeModules.RCTTestModel;
//       NativeTest.addEvent('Birthday Party', '4 Privet Drive, Surrey');
     
//     var CalendarManager = require('NativeModules').RCTTestModel;
//     CalendarManager.addEventWithName('Birthday Party', '4 Privet Drive, Surrey');
      console.log(imgURI);
      return (
          <Image  
            key = {imgURI}
            style={{
              width: 300,
              height: 200,
            }}
            resizeMode={"contain"}
            source={{uri: imgURI}} />
      );
  }
  render() {
    
    console.log('FirstPage: '+this.props.images);
//     let imagesArr = this.props.images;
      return (
          <View style={styles.container}>
          {/*<TestModel></TestModel>*/}
          {this.props.images.map(this.renderImage)}
            <TouchableOpacity
                style={styles.button}
                onPress={()=>this.gotoNext(this.state.id)}>
              <Text style={styles.buttonText}>
                用户信息: { JSON.stringify(this.state.user) }
                {'跳转至第二页(右出)'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={()=>this.gotoNext(this.state.id)}>
              <Text style={styles.buttonText}>
                {'跳转至第二页(底部)'}
              </Text>
            </TouchableOpacity>
          <Blink  
            style={{
                  width: 300,
                  height: 200,
                }}>
          </Blink >

          </View>
      );
    }
  //}
}

const USER_MODELS = {
  1: { name: 'motdddd', age: 23 },
  2: { name: '晴明', age: 25 }
};
/**
 * 第二页
 */
class SecondPage extends Component {
  gotoBack(){
    const { navigator } = this.props;

    if(this.props.getUser) {
      let user = USER_MODELS[this.props.id];
      this.props.getUser(user);
    }

    if(navigator) {
      navigator.pop();
    }
  }
  _pressButton() {
    const { navigator } = this.props;

    if(this.props.getUser) {
      let user = USER_MODELS[this.props.id];
      this.props.getUser(user);
    }

    if(navigator) {
      navigator.pop();
    }
  }
  componentWillMount() {
   //这里获取从FirstPageComponent传递过来的参数: id
//    this.setState({
//      id: this.props.id
//    });
    console.log('第二页发送通知');
     deviceEventEmitter.emit('change','change');
  }
//   componentDidMount(){
//     console.log('componentDidMount');
//       var me = this;
//       NativeAppEventEmitter.addListener('change',function(text){
//         console.log('change');
//          me.setState({
//           id : text
//          })
//       })
//     }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress= {this.gotoBack.bind(this)}>
          <Text style={styles.buttonText}>
            返回上一页, 来源: {this.props.id}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// 导航栏的Mapper
var NavigationBarRouteMapper = {
  // 左键
  LeftButton(route, navigator, index, navState) {
    if (index > 0) {
      return (
        <View style={styles.navContainer}>
          <TouchableOpacity
            underlayColor='transparent'
            onPress={() => {if (index > 0) {navigator.pop()}}}>
            <Text style={styles.leftNavButtonText}>
              后退
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  },
  // 右键
  RightButton(route, navigator, index, navState) {
    if (route.onPress)
      return (
        <View style={styles.navContainer}>
          <TouchableOpacity
            onPress={() => route.onPress()}>
            <Text style={styles.rightNavButtonText}>
              {route.rightText || '右键'}
            </Text>
          </TouchableOpacity>
        </View>
      );
  },
  // 标题
  Title(route, navigator, index, navState) {
    return (
      <View style={styles.navContainer}>
        <Text style={styles.title}>
          应用标题
        </Text>
      </View>
    );
  }
};

// 主模块
class UniformView extends Component {
  /**
   * 使用动态页面加载
   * @param route 路由
   * @param navigator 导航器
   * @returns {XML} 页面
   */
  renderScene(route, navigator) {/**/
    return <route.component navigator={navigator}  {...route.passProps} images = {this.props.images} />;
  }

  configureScene(route, routeStack) {
    if (route.type == 'Modal') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.PushFromRight;
  }

  render() {
    console.log('UniformViewddddd');
    console.log(this.props.images);
    return (
      <Navigator
        style={{flex:1}}
        initialRoute={{name: 'FirstPage', component: FirstPage}}
        configureScene={this.configureScene}
        renderScene={this.renderScene.bind(this)}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navContainer}
            routeMapper={NavigationBarRouteMapper}/>}
        />
    );
  }
}
<script>
 
</script>
var styles = StyleSheet.create({
  zy_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  zy_welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  zy_instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  // 页面框架
  container: {
    flex: 4,
    marginTop: 100,
    flexDirection: 'column'
  },
  // 导航栏
  navContainer: {
    backgroundColor: '#81c04d',
    paddingTop: 12,
    paddingBottom: 10,
  },
  // 导航栏文字
  headText: {
    color: '#ffffff',
    fontSize: 22
  },
  // 按钮
  button: {
    height: 60,
    marginTop: 10,
    justifyContent: 'center', // 内容居中显示
    backgroundColor: '#ff1049',
    alignItems: 'center'
  },
  // 按钮文字
  buttonText: {
    fontSize: 18,
    color: '#ffffff'
  },
  // 左面导航按钮
  leftNavButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 13
  },
  // 右面导航按钮
  rightNavButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginRight: 13
  },
  // 标题
  title: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flex: 1                //Step 3
  }
});

module.exports = UniformView; // 导出模块