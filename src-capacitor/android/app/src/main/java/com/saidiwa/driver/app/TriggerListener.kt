package com.saidiwa.driver.app

import com.getcapacitor.JSObject

fun TriggerListener(listenerName: String, data:JSObject ) {
  val sharedData = Globals.instance
  val listener = sharedData.value
  listener.triggerListener(listenerName, data)
}
