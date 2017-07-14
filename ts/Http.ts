/// <reference path="../d.ts/jquery.d.ts" />

//import $ from "jquery";

interface SuccessCallback {
    (data: any): void;
}

interface ErrorCallback {
    (jqXHR: any): void;
}

interface ProgressCallback {
    (loaded: number, total: number): void;
}

class Http {
    public static withCredentials(): any {
        let opts = {
            xhrFields: {
                withCredentials: true
            }
        }
        return opts;
    }

    public static get(url: string, params: any, successCallback: SuccessCallback, errorCallback?: ErrorCallback, opts?:any): void {
        this.send('GET', url, params, successCallback, errorCallback, opts);
    }

    public static delete(url: string, params: any, successCallback: SuccessCallback, errorCallback?: ErrorCallback, opts?:any): void {
        if (params) {
            if (url.indexOf('?') > 0) {
                url += '&'
            } else {
                url += '?'
            }
            if (typeof params == "string") {
                url += params;
            } else {
                var arr = [];
                for (let item in params) {
                    arr.push(item +'='+ params[item])
                }
                url += arr.join('&');
            }
        }
        this.send('DELETE', url, params, successCallback, errorCallback, opts);
    }

    public static getJSONP(url: string, params: any, successCallback: SuccessCallback, errorCallback?: ErrorCallback, opts?:any): void {
        if (url.indexOf('?') > 0) {
            url += '&callback=?';
        } else {
            url += '?callback=?';
        }

        this.send('GET', url, params, successCallback, errorCallback, opts);
    }

    public static post(url: string, params: any, successCallback: SuccessCallback, errorCallback?: ErrorCallback, opts?:any): void {
        this.send('post', url, params, successCallback, errorCallback, opts);
    }

    public static put(url: string, params: any, successCallback: SuccessCallback, errorCallback?: ErrorCallback, opts?:any): void {
        this.send('PUT', url, params, successCallback, errorCallback, opts);
    }

    public static putToBody(url: string, params: any, successCallback: SuccessCallback, errorCallback?: ErrorCallback, opts?:any): void {
        this.sendToBody('PUT', url, params, successCallback, errorCallback, opts);
    }

    private static sendToBody(method: string, url: string, params: any, successCallback: SuccessCallback, errorCallback?: ErrorCallback, opts?: any): void {
        if (!opts) opts = {};
        opts.contentType = 'application/json; charset=utf-8';

        let str = typeof params != 'string' ? JSON.stringify(params) : params;
        this.send(method, url, str, successCallback, errorCallback, opts);
    }

    public static postToBody(url: string, params: any, successCallback: SuccessCallback, errorCallback?: ErrorCallback, opts?: any): void {
        this.sendToBody('POST', url, params, successCallback, errorCallback, opts);
    }

    public static postFile(url: string, params: any, successCallback: SuccessCallback, errorCallback?: ErrorCallback, progressCallback?: ProgressCallback, opts?: any): void {
        if (!opts) opts = {};
        opts.contentType = false;
        opts.processData = false;
        opts.xhr = () => {
            let xhr = $.ajaxSettings.xhr();
            xhr.upload.addEventListener('progress', function (e: any) {
                if (progressCallback) {
                    progressCallback.call(this, {
                        loaded: e.loaded,
                        total: e.total
                    });
                }
            }, false);

            return xhr;
        };

        this.send('POST', url, params, successCallback, errorCallback, opts);
    }

    private static send(method: string, url: string, params: any, successCallback: SuccessCallback, errorCallback?: ErrorCallback, opts?: any) {
        let settings = {
            data: params,
            dataType: 'JSON',
            method: method,
            success: successCallback,
            error: (jqXHR: any) => {
                if (errorCallback) errorCallback.call(this, jqXHR);
            }
        };

        if (opts) {
            for (let item in opts) {
                settings[item] = opts[item];
            }
        }

        $.ajax(url, settings);
    }
}