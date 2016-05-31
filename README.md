# HM11 PIO
This project is a [Bluetooth V4.0 HM-11 BLE module](http://www.jnhuamao.cn/bluetooth.asp?ID=1) control panel built with [Ionic Framework](http://ionicframework.com/) using the [Cordova BLE plugin](https://github.com/evothings/cordova-ble) from [Evothings](https://evothings.com/). It was mainly a toy project to start a small and cheap LED and BLE notifier.

Built on top of Ionic, this is a hybrid HTML5 app meant to be run via Ionic or cordova, and not as a web app.I've tested it on Android 4.4 but should work on most modern devices and iDevices.

## HM-11 BLE module
![Control Panel](www/img/hm11.png?raw=true "")

## HM-11 BLE module I/O lines
HM-11 has 2 Programmable I/O lines:

* PIO3: low/high
* PIO2: low/high + PWM (100ms -> 800ms)
(source: [Datasheet](https://www.seeedstudio.com/wiki/images/c/cd/Bluetooth4_en.pdf))

## Run it
1. Make sure to have [Ionic installed](http://ionicframework.com/docs/guide/installation.html).
2. `git clone http://www.github.com/bgond/hm11-pio.git && cd hm11-pio`
3. Install plugins as needed `ionic state restore` 
4. Run with Ionic: `ionic run android`

## BLE LED notifier
![Notifier](www/img/littleblock.jpg?raw=true "")
