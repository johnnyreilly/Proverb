var angularApp = (function () {
    "use strict";

    var appName = "app";

    // Create Angular "app" module so all modules that depend on it use it
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

    /**
    * Add 3rd party libraries to Angular app
    */
    function addThirdPartyLibs(thirdPartyLibs) {
        // Toastr
        var toastr = thirdPartyLibs.toastr;
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = "toast-bottom-right";
        app.constant("toastr", toastr);

        // Underscore
        var _ = thirdPartyLibs.underscore;
        app.constant("_", _);

        // Moment
        var moment = thirdPartyLibs.moment;
        app.constant("moment", moment);
    }

    /**
    * Configure application
    */
    function configureApp(appConfig) {
        var config = {
            appErrorPrefix: "[Error] ",
            appName: appConfig.appName,
            appRoot: appConfig.appRoot,
            docTitle: appConfig.appName + ": ",
            events: {
                controllerActivateSuccess: "controller.activateSuccess",
                failure: "failure",
                spinnerToggle: "spinner.toggle",
                waiterStart: "waiter.start",
                waiterSuccess: "waiter.success"
            },
            inDebug: appConfig.inDebug,
            remoteServiceRoot: appConfig.remoteServiceRoot,
            urlCacheBusterSuffix: "?v=" + ((appConfig.inDebug) ? Date.now().toString() : appConfig.version),
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
                commonConfig.config.appRoot = config.appRoot;

                // Copy events across from config.events
                commonConfig.config.events = _.extend({}, config.events);

                commonConfig.config.inDebug = config.inDebug;
                commonConfig.config.remoteServiceRoot = config.remoteServiceRoot;
                commonConfig.config.urlCacheBusterSuffix = config.urlCacheBusterSuffix;
                commonConfig.config.version = config.version;
            }]);
    }

    /**
    * Configure the routes and route resolvers
    */
    function configureRoutes() {
        var routesConfigured = false;
        app.config([
            "$routeProvider", "routes", "commonConfigProvider", function ($routeProvider, routes, commonConfig) {
                // Ensure routes are only configured once (unit tests attempt to configure twice)
                if (routesConfigured) {
                    return;
                }

                routes.forEach(function (r) {
                    r.config.templateUrl = commonConfig.config.appRoot + r.config.templateUrl + commonConfig.config.urlCacheBusterSuffix;
                    $routeProvider.when(r.url, r.config);
                });
                $routeProvider.otherwise({ redirectTo: "/" });

                routesConfigured = true;
            }]);
    }

    /**
    * Configure by setting an optional string value for appErrorPrefix.
    * Accessible via config.appErrorPrefix (via config value).
    */
    function decorateExceptionHandler() {
        app.config([
            "$provide", function ($provide) {
                // Extend the $exceptionHandler service to also display a toast.
                $provide.decorator("$exceptionHandler", ["$delegate", "config", "logger", extendExceptionHandler]);

                function extendExceptionHandler($delegate, config, logger) {
                    var appErrorPrefix = config.appErrorPrefix;
                    var logError = logger.getLogFn("app", "error");
                    return function (exception, cause) {
                        $delegate(exception, cause);
                        if (appErrorPrefix && exception.message.indexOf(appErrorPrefix) === 0) {
                            return;
                        }

                        var errorData = { exception: exception, cause: cause };
                        var msg = appErrorPrefix + exception.message;
                        logError(msg, errorData, true);
                    };
                }
            }]);
    }

    function initialise(bootstrapper) {
        addThirdPartyLibs(bootstrapper.thirdPartyLibs);

        configureApp(bootstrapper.appConfig);

        decorateExceptionHandler();

        configureRoutes();

        // Handle routing errors and success events
        app.run([
            "$route", function ($route) {
                // Include $route to kick start the router.
            }]);
    }

    /**
    * Initialise and then start the application
    *
    * @param bootstrapper The 3rd party libraries and app config data from the server
    */
    function start(bootstrapper) {
        // Initialise the app
        initialise(bootstrapper);

        // Start Angular
        angular.element(document).ready(function () {
            angular.bootstrap(document, [appName]);
        });
    }
})();
//# sourceMappingURL=app.js.map
