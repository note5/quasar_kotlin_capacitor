package com.saidiwa.driver.app


import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context

import android.content.Intent
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import kotlinx.coroutines.Job
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch


class MyForegroundService : Service() {
  private val channelId = "my_counter_service"
  private val channelName = "My Counter Service"
  private  lateinit var job :Job
  override fun onStartCommand(init : Intent , flag : Int , startId: Int):Int{
    var i = 1
    job = MainScope().launch {
      while (true) {
        startForegroundService(i)
        // loop with delay to simulate long running task
        delay(2000)
        ++i
        println("CHEMAIN  FOOEGROUND COUNT $i")

      }
    }
//    startForegroundService(i)
      return  START_STICKY
  }

  override fun onDestroy() {
    super.onDestroy()
    stopSelf()
    job.cancel()
  }


  override fun onBind(p0: Intent?): IBinder? {
    return null
  }

  private fun startForegroundService(num:Int?) {
    val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE)
      as NotificationManager
    if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O){
      createNotificationChannel(notificationManager)
    }

    val notificationBuilder = NotificationCompat.Builder(this,channelId)
      .setSmallIcon(R.mipmap.ic_launcher)
      .setPriority(NotificationCompat.PRIORITY_MIN)
      .setCategory(Notification.CATEGORY_SERVICE)
      .setContentTitle("My counter service")
      .setContentText(num.toString())
      .setContentIntent(getMainActivityPendingIntent())
    startForeground(100, notificationBuilder.build())

  }

  private fun getMainActivityPendingIntent() = PendingIntent.getActivity(
  this,0, Intent(this,MainActivity::class.java),
    PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
  )
  private fun  createNotificationChannel(notificationManager:NotificationManager){

    val channel=  NotificationChannel(
          channelId,
    channelName,
    NotificationManager.IMPORTANCE_LOW
    )
    notificationManager.createNotificationChannel(channel)
  }
}

