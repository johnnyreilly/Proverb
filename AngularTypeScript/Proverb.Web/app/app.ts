interface appConfig {
    inDebug: boolean;
    remoteServiceRoot: string;
    version: string;
}

interface configEvents {
    controllerActivateSuccess: string;
    failure: string;
    spinnerToggle: string;
    waiterStart: string;
    waiterSuccess: string;
}

interface config {
    appErrorPrefix: string;
    docTitle: string;
    events: configEvents;
    imageSettings?: {
        imageBasePath: string;
        unknownPersonImageSource: string;
    }
    inDebug: boolean;
    remoteServiceRoot: string;
    version: string;
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
            controllerActivateSuccess: "controller.activateSuccess",
            failure: "failure",
            spinnerToggle: "spinner.toggle",
            waiterStart: "waiter.start",
            waiterSuccess: "waiter.success"
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

        // Copy across config settings to commonConfig to configure the common services
        app.config(["commonConfigProvider", function (commonConfig: commonConfig) {
            commonConfig.config.events = {
                controllerActivateSuccess: config.events.controllerActivateSuccess,
                failure: config.events.failure,
                spinnerToggle: config.events.spinnerToggle,
                waiterStart: config.events.waiterStart,
                waiterSuccess: config.events.waiterSuccess
            };

            commonConfig.config.remoteServiceRoot = config.remoteServiceRoot;
            commonConfig.config.version = config.version;
        }]);


        // Configure the routes and route resolvers
        var routesConfigured = false;
        app.config(["$routeProvider", "routes", "commonConfigProvider", function ($routeProvider: ng.route.IRouteProvider, routes: configRoute[], commonConfig: commonConfig) {

            // Ensure routes are only configured once (unit tests attempt to configure twice)
            if (routesConfigured) { return; }

            routes.forEach(function (r) {
                r.config.templateUrl += "?v=" + commonConfig.config.version;
                $routeProvider.when(r.url, r.config);
            });
            $routeProvider.otherwise({ redirectTo: "/" });

            routesConfigured = true;
        }]);

        // Handle routing errors and success events
        app.run(["$route", function ($route: ng.route.IRouteService) {
            // Include $route to kick start the router.
        }]);
    }
})();