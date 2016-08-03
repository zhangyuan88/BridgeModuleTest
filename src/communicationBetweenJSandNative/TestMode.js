'use strict'; // 启用严格模式
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  View,
  Text,
  NativeModules,
  NativeAppEventEmitter,
} from 'react-native'

var NativeTest = NativeModules.TestModel; //第二步：获取Native编写的类TestModel
//var APPSTATE =   NativeModules.RCTAppState
var deviceEventEmitter = require('RCTDeviceEventEmitter');
var eventEmitterTest = NativeModules.eventEmitterTest;
import {getWidthRioCompareToIphone6,global_height,global_scale,global_width} from '../Global.js';//从Global.js导出全局变量


var  listener1 = function listener2(eventName) {
  console.log('监听器 listener1 执行，监听到事件信息为：'+eventName.name);
}
  
export default class TestModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstText:'',
      secondText:''
    };
  }

 componentWillMount(){
    /*需要主动调用addListener*/
      NativeAppEventEmitter.addListener( 
            'EventReminder',
             (evnent)=>{listener1(evnent)}
             );
  }
  
  componentWillUnmount() {
    /*不需要主动调用addListener*/
    NativeAppEventEmitter.removeListener('EventReminder');
}
  render(){//
    console.log('TestModel');
    
    return (
      <View style = {styles.viewStyle}> 
        <TextInput
          style={styles.textInputStyle1}
          placeholder={'Type here'}
          placeholderTextColor={"rgba(198,198,204,1)"}
          onChangeText={(text) => {this.setState({firstText:text})}}
          onSubmitEditing={(text) => {this.setState({firstText: text.nativeEvent.text})}}
          value={(this.state && this.state.firstText) || ''}
          onEndEditing = {(event) =>{
            console.log('onEndEditing              '+event.nativeEvent.text);
            NativeTest.textWithInput(//第二步：当结束输入时，调用TestModel中暴露给js的方法：textWithInput
                this.state.firstText,
                (error,events)=>{
                  if(error) {
                    console.log(error);
                  }else {
                    console.log(events);
                    this.setState({firstText:events});
                  }
                }
            )
            NativeTest.addEvent('Birthday Party', '4 Privet Drive, Surrey');//通过JS向Native传递数据，通过xcode查看结果
          }
          }
        />
        <TextInput
          style={styles.textInputStyle2}
          placeholder={'Type heredddd'}
          placeholderTextColor={"rgba(198,198,204,1)"}
          onChangeText={(text) => {this.setState({secondText:text})}}
          onSubmitEditing={() => {this.setState({secondText: ''})}}
         // value={(this.state && this.state.text) || ''}
        />
       <Text style = {styles.textStyle}>
          当前屏幕的宽度：{getWidthRioCompareToIphone6()}
        </Text>
        <Text style = {styles.textStyle}>
          当前屏幕的高度：{global_height}
        </Text>
        <Text style = {styles.textStyle}>
          当前屏幕的宽度：{global_width}
        </Text>
        
      </View> 
    );
  }
}

var styles = StyleSheet.create({
  textInputStyle1:{
    height: 30, 
    width:  300 ,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    textAlign:'center',
    alignSelf:'center'//设置自身的对齐方式
  },
  textInputStyle2:{
    height: 30, 
    width:  300 ,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    textAlign:'center',
    alignSelf:'flex-end'//设置自身的对齐方式
  },
  viewStyle:{
    flex: 1,
    height: 100, 
   // backgroundColor: '#333333', 
    flexDirection: 'column',//主轴方向决定了其子组件的布局，在这里是垂直方向排布，默认是垂直方向   
    justifyContent: 'space-around',//子元素沿着主轴方向的布局
    alignItems:'center'//子元素沿着次轴方向的布局

   // marginTop:100    //设置上边距
  },
  textStyle:{
    height: 30, 
    width:  300 ,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    textAlign:'center',
  }
  
});

module.exports = TestModel;
