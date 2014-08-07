interface loggerFunction {
    (message: string, data?: Object, showToast?: boolean): void;
}

interface loggerFunctionWithSource {
    (message: string, data: Object, source: string, showToast: boolean): void;
}

interface logger {
    [fnName: string]: any;
    getLogFn(moduleId: string, fnName?: string): loggerFunction;
    log: loggerFunctionWithSource;
    logError: loggerFunctionWithSource;
    logSuccess: loggerFunctionWithSource;
    logWarning: loggerFunctionWithSource;
}

(function () {
    "use strict";
    
    angular.module("common").factory("logger", ["$log", "config", "toastr", logger]);

    function logger($log: ng.ILogService, config: config, toastr: Toastr) {
        var service: logger = {
            getLogFn: getLogFn,
            log: log,
            logError: logError,
            logSuccess: logSuccess,
            logWarning: logWarning
        };

        return service;

        function getLogFn(moduleId: string, fnName?: string) {
            fnName = fnName || "log";
            switch (fnName.toLowerCase()) { // convert aliases
                case "success":
                    fnName = "logSuccess"; break;
                case "error":
                    fnName = "logError"; break;
                case "warn":
                    fnName = "logWarning"; break;
                case "warning":
                    fnName = "logWarning"; break;
            }

            var logFn: loggerFunctionWithSource = service[fnName] || service.log;
            return function (msg: string, data: Object, showToast: boolean) {

                var displayToast = (showToast === undefined)
                    ? (fnName !== "log") ? true : false // config.inDebug - use this to show toasts for "log" messages in debug mode 
                    : showToast;

                logFn(msg, data, moduleId, displayToast);
            };
        }

        function log(message: string, data: Object, source: string, showToast: boolean) {
            logIt(message, data, source, showToast, "info");
        }

        function logWarning(message: string, data: Object, source: string, showToast: boolean) {
            logIt(message, data, source, showToast, "warning");
        }

        function logSuccess(message: string, data: Object, source: string, showToast: boolean) {
            logIt(message, data, source, showToast, "success");
        }

        function logError(message: string, data: Object, source: string, showToast: boolean) {
            logIt(message, data, source, showToast, "error");
        }

        function logIt(message: string, data: Object, source: string, showToast: boolean, logType: string) {

            var logger: ng.ILogCall;
            var toastType: ToastrDisplayMethod;

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
            if (showToast) { toastType(message); }
        }
    }
})();