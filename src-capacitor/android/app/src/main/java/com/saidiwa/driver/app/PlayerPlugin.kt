package com.saidiwa.driver.app

import android.content.Intent
import android.app.Activity
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.PluginMethod
import com.getcapacitor.PluginCall


@CapacitorPlugin(name = "PlayerCommand")
class PlayerPlugin : Plugin() {
  override fun load() {
    super.load()

    // add notifyListeners globally in order to use it in broadcast receivers
    val sharedData = Globals.instance
    class Listeners: Globals(), Globals.Listeners {
      override fun triggerListener(listenerName: String, data: JSObject) {
        notifyListeners(listenerName, data)
      }
    }
    sharedData.value = Listeners()
  }

  @PluginMethod
  fun echo(call: PluginCall) {
    val value = call.getString("value")
    val activity : Activity = getBridge().activity
    val context = context
    if(value == "start") {
       context.startService(Intent(activity,MyService::class.java))
    }
    if(value == "start_foreground") {
      context.startForegroundService(Intent(activity,MyForegroundService::class.java))
    }
    if(value == "stop") {
      context.stopService(Intent(activity,MyService::class.java))
    }
    if(value == "stop_foreground") {
      context.stopService(Intent(activity,MyForegroundService::class.java))
    }
   println("CHEMAIN incoming value $value")


  }

}
