package com.jph.u_share;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.text.TextUtils;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.jph.u_share.model.ShareModel;
import com.jph.u_share.util.Constants;
import com.umeng.socialize.ShareAction;
import com.umeng.socialize.UMShareAPI;
import com.umeng.socialize.UMShareListener;
import com.umeng.socialize.bean.SHARE_MEDIA;
import com.umeng.socialize.media.UMWeb;

import java.lang.ref.WeakReference;
public class UShare {
    private static WeakReference<Activity> mActivity;
    private static WeakReference<ShareModel> mShareModel;

    public static void init(Activity activity) {
        if (activity == null) return;
        mActivity = new WeakReference<>(activity);
    }
    public static void share(final String title, final String content, final String imageUrl, final String targetUrl, final Callback errorCallback, final Callback successCallback) {
        if (mActivity == null) return;
        boolean granted = true;
        if (!TextUtils.isEmpty(imageUrl)) {
            granted = ContextCompat.checkSelfPermission(mActivity.get(), Manifest.permission.WRITE_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED ? true : false;
        }
        if (!granted) {
            ShareModel shareModel=new ShareModel(title,content,imageUrl,targetUrl,errorCallback,successCallback);
            mShareModel=new WeakReference<>(shareModel);
            ActivityCompat.requestPermissions(mActivity.get(),new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, Constants.RC_REQUEST_PERMISSIONS);
            return;
        }
        mActivity.get().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                openShare(title, content, imageUrl, targetUrl, errorCallback, successCallback);
            }
        });

    }
    private static void share(ShareModel shareModel){
        share(shareModel.getTitle(),shareModel.getContent(),shareModel.getImageUrl(),shareModel.getTargetUrl(),shareModel.getErrorCallback(),shareModel.getSuccessCallback());
    }
    private static void openShare(String title, String content, String imageUrl, String targetUrl, final Callback errorCallback, final Callback successCallback) {
        final UMWeb web = new UMWeb(targetUrl);
        web.setTitle(title);//标题
        web.setDescription(content);//描述
        new ShareAction(mActivity.get()).setDisplayList(SHARE_MEDIA.QQ, SHARE_MEDIA.QZONE, SHARE_MEDIA.WEIXIN, SHARE_MEDIA.WEIXIN_CIRCLE)
                .setCallback(new UMShareListener() {
                    @Override
                    public void onStart(SHARE_MEDIA share_media) {
                        Toast.makeText(mActivity.get(),"分享进行中，请等待～",Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onResult(SHARE_MEDIA platform) {
                        Toast.makeText(mActivity.get(),"分享成功了～",Toast.LENGTH_SHORT).show();
                        if (successCallback != null) successCallback.invoke("分享成功啦");
                    }

                    @Override
                    public void onError(SHARE_MEDIA platform, Throwable t) {
                        Toast.makeText(mActivity.get(),"分享失败～",Toast.LENGTH_SHORT).show();
                        System.out.println("error "+t);
                        if (errorCallback != null) errorCallback.invoke("分享失败啦");
                    }

                    @Override
                    public void onCancel(SHARE_MEDIA platform) {
                        Toast.makeText(mActivity.get(),"分享取消了～",Toast.LENGTH_SHORT).show();
                        if (errorCallback != null) errorCallback.invoke("分享取消了");
                    }
                } )
                .withMedia(web)
                .open();
    }

    public static void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (mActivity == null) return;
        UMShareAPI.get(mActivity.get()).onActivityResult(requestCode, resultCode, data);
    }
    public static void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if(mShareModel==null)return;
        if (requestCode == Constants.RC_REQUEST_PERMISSIONS) {
            for (int i = 0, j = permissions.length; i < j; i++) {
                if(TextUtils.equals(permissions[i],Manifest.permission.WRITE_EXTERNAL_STORAGE)){
                    if (grantResults[i] == PackageManager.PERMISSION_GRANTED) {
                        share(mShareModel.get());
                    }else {
                        if(mActivity==null)return;
                        Toast.makeText(mActivity.get(),"没有使用SD卡的权限，请在权限管理中为途悦开启使用SD卡的权限",Toast.LENGTH_SHORT).show();
                    }
                }
            }
        }
    }
}