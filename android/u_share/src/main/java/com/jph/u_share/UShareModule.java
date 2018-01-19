package com.jph.u_share;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * 分享组件
 */

public class UShareModule extends ReactContextBaseJavaModule{

    public UShareModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "UShare";
    }
    @ReactMethod
    public static void share(String title, String content, String imageUrl, String targetUrl, final Callback successCallback, final Callback errorCallback) {
        UShare.share(title,content,imageUrl,targetUrl,successCallback,errorCallback);
    }
}