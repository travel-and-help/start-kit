import CordovaBrowserWrapper from './cordova-browser-wrapper';
import WindowBrowserWrapper from './window-browser-wrapper';

export function open(url) {
    return (window.cordova && window.cordova.InAppBrowser)
        ? new CordovaBrowserWrapper(url, '_blank', 'closebuttoncaption=Done,location=no')
        : new WindowBrowserWrapper(url, '', 'resizeable=false,height=400,width=400');
}
