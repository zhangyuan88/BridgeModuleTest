// module.exports = function(name, age) {
//     this.name = name;
//     this.age = age;
//     this.about = function() {
//         console.log(this.name +' is '+ this.age +' years old');
//     };
// };
var Dimensions = require('Dimensions');//获取屏幕尺寸

export const global_height = Dimensions.get('window').height/667;
export const global_scale = Dimensions.get('window').scale;
export const global_width = Dimensions.get('window').width/375;
export function getWidthRioCompareToIphone6(){
  var width = Dimensions.get('window').width;
  return width/375;
}
//module.exports = {width,height,scale};