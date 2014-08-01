var angularApp = (function () {
    "use strict";

    var appName = "app";

    // Create Angular "app" module
    var app = angular.module(appName, [
        "ngAnimate",
        "ngRoute",
        "ngSanitize",
        "common",
        "common.bootstrap",
        "ui.bootstrap"
    ]);

    return {
        start: start
    };

    function start(appConfig) {
        // Initialise the app
        initialise(appConfig);

        // Start Angular
        angular.element(document).ready(function () {
            angular.bootstrap(document, [appName]);
        });
    }

    function initialise(appConfig) {
        // Configure Toastr
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = "toast-bottom-right";

        var events = {
            controllerActivateFailure: "controller.activateFailure",
            controllerActivateSuccess: "controller.activateSuccess",
            spinnerToggle: "spinner.toggle"
        };

        var config = {
            appErrorPrefix: "[Error] ",
            docTitle: "Proverb: ",
            events: events,
            inDebug: appConfig.inDebug,
            remoteServiceRoot: appConfig.remoteServiceRoot,
            version: appConfig.version
        };

        app.value("config", config);

        app.config([
            "$logProvider", function ($logProvider) {
                // turn debugging off/on (no info or warn)
                if ($logProvider.debugEnabled) {
                    $logProvider.debugEnabled(config.inDebug);
                }
            }]);

        // Configure the common services via commonConfig
        app.config([
            "commonConfigProvider", function (cfg) {
                cfg.config.controllerActivateFailureEvent = config.events.controllerActivateFailure;
                cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
                cfg.config.spinnerToggleEvent = config.events.spinnerToggle;
                cfg.config.remoteServiceRoot = config.remoteServiceRoot;
                cfg.config.version = config.version;
            }]);

        // Handle routing errors and success events
        app.run([
            "$route", function ($route) {
                // Include $route to kick start the router.
            }]);
    }
})();
//# sourceMappingURL=app.js.map
