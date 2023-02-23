package com.saidiwa.driver.app

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import com.getcapacitor.JSObject
import com.saidiwa.driver.app.Constants.EMIT_DATA_TO_WEB_VIEW

class MyReceiver : BroadcastReceiver() {

  override fun onReceive(context: Context, intent: Intent) {
    //extract the data received from broadcast
    val action: String? = intent.action
    println("CHEMAIN Receiver action -------------- $action ")
    //create a JSON object
    if(action == EMIT_DATA_TO_WEB_VIEW)
    {
      val i = intent.getIntExtra("MyData",0)
      val ret = JSObject()
      ret.put("value", i)
      //custom implementaion to relay receiver data to a capacitor plugin call
      TriggerListener("myPluginEvent", ret)
    }
  }
}
