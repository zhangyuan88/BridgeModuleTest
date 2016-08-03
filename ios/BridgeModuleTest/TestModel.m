//
//  RCTTestModel.m
//  WclNavigator
//
//  Created by cmcc on 16/7/26.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "TestModel.h"
#import "RCTLog.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@interface TestModel()

@end

@implementation TestModel {
  NSTimer *timer;
}

@synthesize bridge = _bridge;
@synthesize methodQueue = _methodQueue;
-(instancetype)init {
  NSLog(@"init");
  self = [super init];
  if (self) {
    timer = [NSTimer scheduledTimerWithTimeInterval:1 target:self selector:@selector(calendarEventReminderReceived:) userInfo:nil repeats:YES];
    [timer fire];
  }
  
  
  return self;
}
//不指定名称
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretendingdddd to create an event %@ at %@", name, location);
}
RCT_EXPORT_METHOD(findEvents:(RCTResponseSenderBlock)callback)
{
  NSArray *events = @[@"1",@"2"];
  callback(@[[NSNull null], events]);
}
RCT_EXPORT_METHOD(textWithInput:(NSString *)text callback:(RCTResponseSenderBlock)callback)
{
  RCTLog(@"Native 收到js传递的参数：%@",text);
//  dispatch_async(dispatch_get_main_queue(), ^{
    callback(@[[NSNull null],[NSString stringWithFormat:@"Native 成功收到js传递的参数:%@",text]]);

//  });
 }

//原生模块可以导出一些常量，这些常量在JavaScript端随时都可以访问。用这种方法来传递一些静态数据，可以避免通过bridge进行一次来回交互。
-(NSDictionary<NSString *,id> *)constantsToExport {
  return  @{@"modulename":@"TestModel"};
}

//即使没有被JavaScript调用，本地模块也可以给JavaScript发送事件通知。最直接的方式是使用eventDispatcher:
- (void)calendarEventReminderReceived:(NSNotification *)notification
{
  //NSLog(@"calendarEventReminderReceived");
  
  NSString *eventName = @"EventTest";
 // _bridge
  [_bridge.eventDispatcher sendDeviceEventWithName:@"EventReminder"
                                               body:@{@"name": eventName}];
}

- (void)testEventReminderReceived:(NSNotification *)notification
{
  //NSLog(@"calendarEventReminderReceived");
  
//  NSString *eventName = @"EventTest";
//  [_bridge.eventDispatcher sendTextEventWithType:RCTTextEventTypeChange reactTag:[NSNumber numberWithInteger:1] text:eventName key:eventName eventCount:1];
//  RCTEventEmitter *emiter = [RCTEventEmitter new];
//  emiter.bridge = _bridge;
//  [emiter sendEventWithName:@"EventReminder" body:@{@"name": @"evnentEmitterTest"}];
}



@end

