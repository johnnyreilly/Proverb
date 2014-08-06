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
            controllerActivateSuccess: "controller.activateSuccess",
            failure: "failure",
            spinnerToggle: "spinner.toggle",
            waiterStart: "waiter.start",
            waiterSuccess: "waiter.success"
        };

        var config = {
            appErrorPrefix: "[Error] ",
            docTitle: "Proverb: ",
            events: events,
            inDebug: appConfig.inDebug,
            remoteServiceRoot: appConfig.remoteServiceRoot,
            urlCacheBusterSuffix: "?v=" + appConfig.version,
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

        // Copy across config settings to commonConfig to configure the common services
        app.config([
            "commonConfigProvider", function (commonConfig) {
                commonConfig.config.events = {
                    controllerActivateSuccess: config.events.controllerActivateSuccess,
                    failure: config.events.failure,
                    spinnerToggle: config.events.spinnerToggle,
                    waiterStart: config.events.waiterStart,
                    waiterSuccess: config.events.waiterSuccess
                };

                commonConfig.config.remoteServiceRoot = config.remoteServiceRoot;
                commonConfig.config.urlCacheBusterSuffix = config.urlCacheBusterSuffix;
                commonConfig.config.version = config.version;
            }]);

        // Configure the routes and route resolvers
        var routesConfigured = false;
        app.config([
            "$routeProvider", "routes", "commonConfigProvider", function ($routeProvider, routes, commonConfig) {
                // Ensure routes are only configured once (unit tests attempt to configure twice)
                if (routesConfigured) {
                    return;
                }

                routes.forEach(function (r) {
                    r.config.templateUrl += commonConfig.config.urlCacheBusterSuffix;
                    $routeProvider.when(r.url, r.config);
                });
                $routeProvider.otherwise({ redirectTo: "/" });

                routesConfigured = true;
            }]);

        // Handle routing errors and success events
        app.run([
            "$route", function ($route) {
                // Include $route to kick start the router.
            }]);
    }
})();
//# sourceMappingURL=app.js.map
