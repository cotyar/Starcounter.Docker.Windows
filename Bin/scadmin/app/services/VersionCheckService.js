﻿/**
 * ----------------------------------------------------------------------------
 * Version Check Service
 * ----------------------------------------------------------------------------
 */
adminModule.service('VersionCheckService', ['$http', '$log', 'UtilsFactory', 'JobFactory', function ($http, $log, UtilsFactory, JobFactory) {


    var self = this;

    /**
     * Get latest starcounter version information
     * @param {function} successCallback Success Callback function
     * @param {function} errorCallback Error Callback function
     */
    this.getLatestVersionInfo = function (successCallback, errorCallback) {

        var errorHeader = "Failed to check version";
        var uri = "/api/admin/versioncheck";

        // {
        //    days:234,  // Days old
        //    version:"2.0.0.0",
        //    downloadUri:"http://downloads.starcounter.com/archive/NightlyBuilds/2.0.1290.3"
        // }
        $http.get(uri).then(function (response) {
            // success handler

            // Validate response
            if (response.data.hasOwnProperty("VersionCheck") == true) {
                $log.info("Latest version info successfully retrived");

                var versionCheck = response.data.VersionCheck;

                var currentDate = new Date(versionCheck.currentVersionDate);
                var currentDate_utc = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), currentDate.getUTCHours(), currentDate.getUTCMinutes(), currentDate.getUTCSeconds());

                var latestDate = new Date(versionCheck.latestVersionDate);
                var latestDate_utc = new Date(latestDate.getUTCFullYear(), latestDate.getUTCMonth(), latestDate.getUTCDate(), latestDate.getUTCHours(), latestDate.getUTCMinutes(), latestDate.getUTCSeconds());

                var days = Math.floor((latestDate_utc.getTime() - currentDate_utc.getTime()) / (1000 * 3600 * 24));

                if (typeof (successCallback) == "function") {
                    successCallback({
                        days: days,
                        version: versionCheck.latestVersion,
                        downloadUri: versionCheck.latestVersionDownloadUri
                    });
                }

            }
            else {
                // Error
                $log.error(errorHeader, response);

                if (typeof (errorCallback) == "function") {
                    var messageObject = UtilsFactory.createErrorMessage(errorHeader, "Invalid response content", null, null);
                    errorCallback(messageObject);
                }
            }


        }, function (response) {

            // Error
            var messageObject;

            $log.error(errorHeader, response);

            if (typeof (errorCallback) == "function") {

                if (response instanceof SyntaxError) {
                    messageObject = UtilsFactory.createErrorMessage(errorHeader, response.message, null, response.stack);
                }
                else if (response.status == 500) {
                    // 500 Server Error
                    errorHeader = "Internal Server Error";
                    messageObject = UtilsFactory.createServerErrorMessage(errorHeader, response.data);
                }
                else if (response.status == 503) {
                    // 503 Service Unavailable
                    if (typeof (errorCallback) == "function") {
                        messageObject = null;
                    }
                }
                else {
                    // Unhandle Error
                    messageObject = UtilsFactory.createServerErrorMessage(errorHeader, response.data);
                }

                errorCallback(messageObject);
            }

        });
    }

}]);
