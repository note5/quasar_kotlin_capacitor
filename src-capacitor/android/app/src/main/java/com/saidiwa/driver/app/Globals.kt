package com.saidiwa.driver.app

import com.getcapacitor.JSObject

open class Globals {
  interface Listeners {
    fun triggerListener(listenerName: String, data: JSObject)
  }
  lateinit var value: Listeners
  companion object {
    // Getter-Setters
    var instance = Globals()
  }
}
