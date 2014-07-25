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

(function () {
    "use strict";

    var app = angular.module("app");

    // First check the window for an appConfig object to use
    // then fall back to stubbed out data - only the tests should really use this
    // (This is DIRTY but appears to be the only way to configure Angular from the server prior to kick off)
    var appConfig: appConfig = window["appConfig"] || {
        inDebug: true,
        remoteServiceRoot: "/api/",
        version: "Testing"
    };
    
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
    
    //#region Configure the common services via commonConfig
    app.config(["commonConfigProvider", function (cfg: commonConfig) {
        cfg.config.controllerActivateFailureEvent = config.events.controllerActivateFailure;
        cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
        cfg.config.spinnerToggleEvent = config.events.spinnerToggle;
        cfg.config.remoteServiceRoot = config.remoteServiceRoot;
        cfg.config.version = config.version;
    }]);
    //#endregion
})();