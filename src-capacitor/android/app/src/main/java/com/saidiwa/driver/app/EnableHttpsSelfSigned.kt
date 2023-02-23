package com.saidiwa.driver.app

import com.getcapacitor.BridgeActivity
import com.getcapacitor.BridgeWebViewClient
import android.webkit.SslErrorHandler
import android.net.http.SslError
import android.webkit.WebView
import com.getcapacitor.Bridge

object EnableHttpsSelfSigned {
    fun enable(bridge: Bridge) {
        bridge.webView.webViewClient = object : BridgeWebViewClient(bridge) {
            override fun onReceivedSslError(
                view: WebView,
                handler: SslErrorHandler,
                error: SslError
            ) {
                handler.proceed()
            }
        }
    }
}
