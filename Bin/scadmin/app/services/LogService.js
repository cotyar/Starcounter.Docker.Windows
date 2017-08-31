﻿/**
 * ----------------------------------------------------------------------------
 * Log Service (Starcounter log service)
 * ----------------------------------------------------------------------------
 */
adminModule.service('LogService', ['$http', '$log', '$rootScope', 'UtilsFactory', 'JobFactory', function ($http, $log, $rootScope, UtilsFactory, JobFactory) {

    var self = this;
    this.socket = null,
    this.isWebsocketSupport = ("WebSocket" in window)
    this.listeners = [];


    /**
     * Get log Entries
     * @param {object} filter filter
     * @param {function} successCallback Success Callback function
     * @param {function} errorCallback Error Callback function
     */
    this.getLogEntries = function (filter, successCallback, errorCallback) {

        var errorHeader = "Failed to retrieve a list of log entries";
        var uri = "/api/admin/log";

        // Response
        // {
        //    "LogEntries":[{
        //            "DateTimeStr":"2013-12-13 12:39:10",
        //            "TypeStr":"Warning",
        //            "HostName":"sc://machine/personal/networkgateway",
        //             "Source":"Starcounter",
        //            "Message":"Attaching new database failed: MYDATABASE"
        //    }],
        //    "FilterNotice":false,
        //    "FilterWarning":false,
        //    "FilterError":false,
        //    "FilterDebug":false,
        //    "FilterSource":"Starcounter.Server.Processes;Sql;Starcounter.Server;Starcounter;Starcounter.Server.Host;Starcounter.Host"
        // }
        $http.get(uri, { params: filter }).then(function (response) {
            // Success
            $log.info("Log entries (" + response.data.LogEntries.length + ") successfully retrived");

            if (typeof (successCallback) == "function") {
                successCallback(response.data);
            }

        }, function (response) {
            // Error

            $log.error(errorHeader, response);

            if (typeof (errorCallback) == "function") {

                var messageObject;

                if (response instanceof SyntaxError) {
                    messageObject = UtilsFactory.createErrorMessage(errorHeader, response.message, null, response.stack);
                }
                else if (response.status == 500) {
                    // 500 Server Error
                    errorHeader = "Internal Server Error";
                    messageObject = UtilsFactory.createServerErrorMessage(errorHeader, response.data);
                }
                else {
                    // Unhandle Error
                    messageObject = UtilsFactory.createServerErrorMessage(errorHeader, response.data);
                }

                errorCallback(messageObject);
            }


        });


    }


    /**
     * Register log listener
     * @param {object} listener Listener { onEvent: function () { },  onError: function (messageObject) {}  }
     */
    this.registerEventListener = function (listener) {
        this.listeners.push(listener);

        if (this.socket == null) {
            this.startListener();
        }

    }


    /**
     * Unregister log listener
     * @param {object} listener Listener { onEvent: function () { },  onError: function (messageObject) {}  }
     */
    this.unregisterEventListener = function (listener) {
        var index = this.listeners.indexOf(listener);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }

        if (this.listeners.length == 0) {
            this.stopListener();
        }

    }


    /**
     * Connect socket listener
     */
    this.startListener = function () {

        if (this.isWebsocketSupport == false) return;

        try {

            var errorHeader = "Websocket error";

            self.socket = new WebSocket("ws://" + location.host + "/api/admin/log/event/ws");

            self.socket.onopen = function (evt) {
                self.socket.send("PING");
            };

            self.socket.onclose = function (evt) {
                self.socket = null;
            };

            self.socket.onmessage = function (evt) {

                if (evt.data == "1") {
                    // 1 = Log has change
                    $log.info("Sending event message to " + self.listeners.length + " listener(s)");

                    $rootScope.$apply(function () {
                        for (var i = 0; i < self.listeners.length ; i++) {
                            self.listeners[i].onEvent();
                        }
                    });

                }
            };

            self.socket.onerror = function (evt) {
                $log.error(errorHeader, evt);

                self.isWebsocketSupport = false;

                $rootScope.$apply(function () {

                    var messageObject = UtilsFactory.createErrorMessage(errorHeader, JSON.stringify(evt), null, null);

                    for (var i = 0; i < self.listeners.length ; i++) {
                        self.listeners[i].onError(messageObject);
                    }

                });

                $rootScope.$apply();


            };
        }
        catch (exception) {

            $log.error(errorHeader, exception);

            self.isWebsocketSupport = false;

            $rootScope.$apply(function () {


                var messageObject = UtilsFactory.createErrorMessage(errorHeader, exception.message, null, exception.stack);
                for (var i = 0; i < self.listeners.length ; i++) {
                    self.listeners[i].onError(messageObject);
                }

                self.isWebsocketSupport = false;

            });

        }
    }


    /**
     * Disconnect socket listener
     */
    this.stopListener = function () {

        if (this.socket != null) {
            if (this.socket.readyState == 0 || this.socket.readyState == 2 || this.socket.readyState == 3) return; // (0) CONNECTING // (2) CLOSING, (3) CLOSED
            this.socket.close();
        }
    }


}]);



