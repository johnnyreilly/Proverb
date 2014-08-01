interface appConfig {
    inDebug: boolean;
    remoteServiceRoot: string;
    version: string;
}

interface config {
    appErrorPrefix: string;
    docTitle: string;
    events: {
        controllerActivateFailure: string;
        controllerActivateSuccess: string;
        spinnerToggle: string;
    };
    imageSettings?: {
        imageBasePath: string;
        unknownPersonImageSource: string;
    }
    inDebug: boolean;
    remoteServiceRoot: string;
    version: string;
}

interface commonConfig {
    config: {
        controllerActivateFailureEvent: string;
        controllerActivateSuccessEvent: string;
        spinnerToggleEvent: string;
        remoteServiceRoot: string;
        version: string;
    };
}

var angularApp = (function () {
    "use strict";

    var appName = "app";

    // Create Angular "app" module
    var app = angular.module(appName, [
        // Angular modules 
        "ngAnimate",        // animations
        "ngRoute",          // routing
        "ngSanitize",       // sanitizes html bindings (ex: sidebar.js)

        // Custom modules 
        "common",           // common functions, logger, spinner
        "common.bootstrap", // bootstrap dialog wrapper functions

        // 3rd Party Modules
        "ui.bootstrap"      // ui-bootstrap (ex: carousel, pagination, dialog)
    ]);
    
    return {
        start: start
    }


    function start(appConfig: appConfig) {

        // Initialise the app
        initialise(appConfig);

        // Start Angular
        angular.element(document).ready(function () {
            angular.bootstrap(document, [appName]);
        });
    }

    function initialise(appConfig: appConfig) {

        // Configure Toastr
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = "toast-bottom-right";

        var events = {
            controllerActivateFailure: "controller.activateFailure",
            controllerActivateSuccess: "controller.activateSuccess",
            spinnerToggle: "spinner.toggle"
        };

        var config: config = {
            appErrorPrefix: "[Error] ", //Configure the exceptionHandler decorator
            docTitle: "Proverb: ",
            events: events,
            inDebug: appConfig.inDebug,
            remoteServiceRoot: appConfig.remoteServiceRoot,
            version: appConfig.version
        };

        app.value("config", config);

        app.config(["$logProvider", function ($logProvider: ng.ILogProvider) {
            // turn debugging off/on (no info or warn)
            if ($logProvider.debugEnabled) {
                $logProvider.debugEnabled(config.inDebug);
            }
        }]);

        // Configure the common services via commonConfig
        app.config(["commonConfigProvider", function (cfg: commonConfig) {
            cfg.config.controllerActivateFailureEvent = config.events.controllerActivateFailure;
            cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
            cfg.config.spinnerToggleEvent = config.events.spinnerToggle;
            cfg.config.remoteServiceRoot = config.remoteServiceRoot;
            cfg.config.version = config.version;
        }]);

        // Handle routing errors and success events
        app.run(["$route", function ($route: ng.route.IRouteService) {
            // Include $route to kick start the router.
        }]);
    }
})();