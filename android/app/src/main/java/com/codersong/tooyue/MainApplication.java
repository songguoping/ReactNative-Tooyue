package com.codersong.tooyue;

import android.app.Application;

import com.alibaba.sdk.android.feedback.impl.FeedbackAPI;
import com.codersong.tooyue.feedback.Constant;
import com.codersong.tooyue.feedback.FeedbackPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.jph.u_share.UShareReactPackage;
import com.jph.u_share.util.Constants;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.umeng.socialize.PlatformConfig;
import com.umeng.socialize.UMShareAPI;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  {
    PlatformConfig.setWeixin(Constants.KEY_WEIXIN, Constants.SECRET_WEIXIN);
    PlatformConfig.setQQZone(Constants.KEY_QQ, Constants.SECRET_QQ);
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNDeviceInfo(),
            new SplashScreenReactPackage(),
            new FeedbackPackage(),
            new UShareReactPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    //feedback
    FeedbackAPI.init(this, Constant.AppId,Constant.AppSecret);
    UMShareAPI.get(this);
  }
}
