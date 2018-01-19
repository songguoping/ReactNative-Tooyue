package com.jph.u_share.model;

import com.facebook.react.bridge.Callback;

public class ShareModel {

    private String title;
    private String content;
    private String imageUrl;
    private String targetUrl;
    private Callback errorCallback;
    private Callback successCallback;

    public ShareModel(String title, String content, String imageUrl, String targetUrl, Callback errorCallback, Callback successCallback) {
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.targetUrl = targetUrl;
        this.errorCallback = errorCallback;
        this.successCallback = successCallback;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getTargetUrl() {
        return targetUrl;
    }

    public void setTargetUrl(String targetUrl) {
        this.targetUrl = targetUrl;
    }

    public Callback getErrorCallback() {
        return errorCallback;
    }

    public void setErrorCallback(Callback errorCallback) {
        this.errorCallback = errorCallback;
    }

    public Callback getSuccessCallback() {
        return successCallback;
    }

    public void setSuccessCallback(Callback successCallback) {
        this.successCallback = successCallback;
    }
}
