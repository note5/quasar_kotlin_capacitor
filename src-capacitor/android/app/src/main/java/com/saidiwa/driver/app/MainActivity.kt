package com.saidiwa.driver.app


import android.content.IntentFilter
import com.getcapacitor.BridgeActivity
import android.os.Bundle


class MainActivity : BridgeActivity() {
  lateinit var receiver: MyReceiver
  public override fun onCreate(savedInstanceState: Bundle?) {
    /* register capacitor plugin */
    registerPlugin(PlayerPlugin::class.java)
    super.onCreate(savedInstanceState)

    // create and register broadcast receiver
    val filter = IntentFilter()
    //add action or actions to listedn to
    filter.addAction(Constants.EMIT_DATA_TO_WEB_VIEW)
    receiver = MyReceiver()
    registerReceiver(receiver, filter)
  }

  override fun onDestroy() {
    super.onDestroy()
    // ensure to unregister the receiver once the app is closed
    unregisterReceiver(receiver)
  }
}
