(function () {
    "use strict";

    angular.module("common").factory("logger", ["$log", "config", "toastr", logger]);

    function logger($log, config, toastr) {
        var service = {
            getLogFn: getLogFn,
            log: log,
            logError: logError,
            logSuccess: logSuccess,
            logWarning: logWarning
        };

        return service;

        function getLogFn(moduleId, fnName) {
            fnName = fnName || "log";
            switch (fnName.toLowerCase()) {
                case "success":
                    fnName = "logSuccess";
                    break;
                case "error":
                    fnName = "logError";
                    break;
                case "warn":
                    fnName = "logWarning";
                    break;
                case "warning":
                    fnName = "logWarning";
                    break;
            }

            var logFn = service[fnName] || service.log;
            return function (msg, data, showToast) {
                var displayToast = (showToast === undefined) ? (fnName !== "log") ? true : false : showToast;

                logFn(msg, data, moduleId, displayToast);
            };
        }

        function log(message, data, source, showToast) {
            logIt(message, data, source, showToast, "info");
        }

        function logWarning(message, data, source, showToast) {
            logIt(message, data, source, showToast, "warning");
        }

        function logSuccess(message, data, source, showToast) {
            logIt(message, data, source, showToast, "success");
        }

        function logError(message, data, source, showToast) {
            logIt(message, data, source, showToast, "error");
        }

        function logIt(message, data, source, showToast, logType) {
            var logger;
            var toastType;

            if (logType === "error") {
                logger = $log.error;
                toastType = toastr.error;
            } else if (logType === "warning") {
                logger = $log.warn;
                toastType = toastr.warning;
            } else if (logType === "success") {
                logger = $log.log;
                toastType = toastr.success;
            } else {
                logger = $log.info;
                toastType = toastr.info;
            }

            source = source ? "[" + source + "] " : "";

            // Perform log
            logger(source, message, data);

            // Show toast if required
            if (showToast) {
                toastType(message);
            }
        }
    }
})();
//# sourceMappingURL=logger.js.map
