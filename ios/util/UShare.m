
#import "UShare.h"
//#import "UMSocialUIManager.h"
#import <UShareUI/UMSocialUIManager.h>
//#import "UMSocialShareScrollView.h"

@implementation UShare
RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(share:(NSString *)title content:(NSString *)content imageUrl:(NSString*)imageUrl targetUrl:(NSString*)targetUrl successCallback:(RCTResponseSenderBlock*)successCallback errorCallback:(RCTResponseSenderBlock*)errorCallback )
{
  [UMSocialUIManager showShareMenuViewInWindowWithPlatformSelectionBlock:^(UMSocialPlatformType platformType, NSDictionary *userInfo) {
    //创建分享消息对象
    UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
    //创建网页内容对象
    UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:title descr:content thumImage:imageUrl];
    //设置网页地址
    shareObject.webpageUrl =targetUrl;
    
    //分享消息对象设置分享内容对象
    messageObject.shareObject = shareObject;
    
    //调用分享接口
    [[UMSocialManager defaultManager] shareToPlatform:platformType messageObject:messageObject currentViewController:self completion:^(id data, NSError *error) {
      
    }];
  }];
  
  
}


@end
