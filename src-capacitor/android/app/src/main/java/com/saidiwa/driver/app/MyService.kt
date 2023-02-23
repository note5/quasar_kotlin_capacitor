package com.saidiwa.driver.app


import android.app.Service
import android.content.Intent
import android.os.IBinder
import kotlinx.coroutines.Job
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class MyService : Service() {
 private lateinit var job : Job
  override fun onStartCommand(init : Intent , flag : Int , startId: Int):Int{
 // run the job in a coroutine
    job = MainScope().launch {
      var i = 1
      val intent = Intent()
      while (true) {
        // loop with delay to simulate long running task
        delay(2000)
        // set action  and put the data into the intent
        println("CHEMAIN while loop broadcast $i")
        intent.action = "EMIT_DATA_TO_WEB_VIEW"
        intent.putExtra("MyData", i)
        intent.flags = Intent.FLAG_INCLUDE_STOPPED_PACKAGES
        //broadcst the  data and action
        sendBroadcast(intent)
        ++i
      }
    }
    return  START_STICKY
  }

  override fun onDestroy() {
    super.onDestroy()
    job.cancel()
  }

  override fun onBind(p0: Intent?): IBinder? {
    return null
  }
}



