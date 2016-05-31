angular.module('littleBlock', ['ionic'])
    .run(function ($ionicPlatform, $rootScope) {
        $ionicPlatform.ready(function () {

            if (window.cordova && window.cordova.plugins.Keyboard) {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                // Don't remove this line unless you know what you are doing. It stops the viewport
                // from snapping when text inputs are focused. Ionic handles this internally for
                // a much nicer keyboard experience.
                cordova.plugins.Keyboard.disableScroll(true);

                if (evothings.ble) {
                    console.log('evothings.ble loaded');
                    $rootScope.$broadcast('ble-started');
                } else {
                    console.log('no evothings.ble');
                }
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })

    .controller('HM11Ctrl', function ($scope, $timeout) {

        $scope.$on('ble-started', function (event, args) {
            $scope.connect();
        });

        // Connected device
        var HM11 = null;

        // Device name
        var device_name = 'ioblocks';

        //characteristic UUID we want to send commands to
        var UUID = '0000ffe1-0000-1000-8000-00805f9b34fb';

        //Digital IO values
        $scope.PIO3 = {
            checked: false
        };
        $scope.PIO2 = {
            checked: false,
            pwm: 2
        };

        $scope.connect = function () {
            console.log('connecting');
            //evothings.arduinoble.close();

            evothings.arduinoble.connect(
                device_name,
                function (device) {
                    HM11 = device;
                    $scope.PIO2.pwm = 2;
                    $scope.PIO2PWM();
                    $timeout(
                        function () {
                            $scope.PIO2.checked = false; $scope.PIO2Change();
                        },
                        2000);
                },
                function (errorCode) {
                    console.log('Connect error: ' + errorCode + '.');
                });
        };

        $scope.PIO3Change = function () {
            if ($scope.PIO3.checked) {
                // Turn on LED AT Commands: Setup PIO3 output high.
                str = 'AT+PIO31';
            } else {
                // Turn off LED AT Commands: Setup PIO3 output low.
                str = 'AT+PIO30';
            }
            uint = new Uint8Array(str.length);
            for (var i = 0, j = str.length; i < j; ++i) {
                uint[i] = str.charCodeAt(i);
            }
            HM11.writeDataArray(UUID, uint);
        };
        $scope.PIO2Change = function () {
            if ($scope.PIO2.checked) {
                // Turn on LED AT Commands: Setup PIO2 output high.
                str = 'AT+PIO21';
            } else {
                // Turn off LED AT Commands: Setup PIO2 output low.
                str = 'AT+PIO20';
            }
            uint = new Uint8Array(str.length);
            for (var i = 0, j = str.length; i < j; ++i) {
                uint[i] = str.charCodeAt(i);
            }
            HM11.writeDataArray(UUID, uint);
        };
        $scope.PIO2PWM = function () {
            // V525 + firmware (tested on V537) added PIO2 PWM function, Para2 value is 0~9
            // 2: output 100ms PWM
            // 3: output 200ms PWM
            // ......
            // 9: output 800ms PWM
            str = 'AT+PIO2' + $scope.PIO2.pwm;
            uint = new Uint8Array(str.length);
            for (var i = 0, j = str.length; i < j; ++i) {
                uint[i] = str.charCodeAt(i);
            }
            HM11.writeDataArray(UUID, uint);
        };
    });