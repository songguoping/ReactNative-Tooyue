/**
 * Created by user on 2/1/18.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    WebView
} from 'react-native';
import {colors} from "../../res/styles/common";
import LoadingView from "../../components/LoadingView";
let canGoBack = false;
export default class AboutMePage extends Component{
    static navigationOptions = ({navigation,screenProps}) => ({
        headerTitle: navigation.state.params.author.name,
        headerStyle : {backgroundColor: screenProps ? screenProps.theme.themeColor : colors.colorPrimary},
        headerTintColor:'white',
    });

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    onNavigationStateChange = (navState) => {
        canGoBack = navState.canGoBack;
    };

    goBack = () => {
        if (this.state.isShareModal) {
            this.setState({
                isShareModal: false
            });
            return true;
        } else if (canGoBack) {
            this.webview.goBack();
            return true;
        }
        return false;
    };

    renderLoading = () => <LoadingView />;

    render() {
        const { params } = this.props.navigation.state;
        return (
                <WebView
                    ref={(ref) => {
                        this.webview = ref;
                    }}
                    style={styles.container}
                    source={{ url:params.author.about_me}}
                    scalesPageToFit={true}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    decelerationRate="normal"
                    onShouldStartLoadWithRequest={() => {
                        const shouldStartLoad = true;
                        return shouldStartLoad;
                    }}
                    onNavigationStateChange={this.onNavigationStateChange}
                    renderLoading={this.renderLoading}
                />
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFF'
    },

});
