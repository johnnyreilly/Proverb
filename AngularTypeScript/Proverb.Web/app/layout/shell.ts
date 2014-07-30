module controllers {

    "use strict";

    interface spinnerToggleEvent extends ng.IAngularEvent {
        show: boolean;
    }

    class Shell {

        busyMessage: string;
        isBusy: boolean;
        logError: loggerFunction;
        logSuccess: loggerFunction;
        spinnerOptions: SpinnerOptions;
        urlSidebar: string;
        urlTopNav: string;

        static $inject = ["$rootScope", "common", "config"];
        constructor(
            private $rootScope: ng.IRootScopeService,
            private common: common,
            private config: config
            ) {

            this.logSuccess = common.logger.getLogFn(controllerId, "success");
            this.logError = common.logger.getLogFn(controllerId, "error");
            this.busyMessage = "Please wait ...";
            this.isBusy = true;
            this.spinnerOptions = {
                radius: 40,
                lines: 7,
                length: 0,
                width: 30,
                speed: 1.7,
                corners: 1.0,
                trail: 100,
                color: "#F58A00"
            };
            this.urlSidebar = "/app/layout/sidebar.html?v=" + config.version;
            this.urlTopNav = "/app/layout/topnav.html?v=" + config.version;

            this.wireUpEventListeners();
            this.activate();
        }

        // Prototype methods

        activate() {
            this.common.activateController([], controllerId, "Loading....")
                .then(() => {
                    this.logSuccess("Proverb v" + this.config.version + " loaded!", null, true);
                });
        }

        wireUpEventListeners() {

            this.$rootScope.$on("$routeChangeStart",
                (event, next, current) => {
                    this.toggleSpinner(true);
                });

            this.$rootScope.$on(this.config.events.controllerActivateSuccess,
                (event, data: controllerActivationData) => {
                    // Deactivate spinner as long as the controller that has been activated is not the shell
                    if (data.controllerId !== controllerId) {
                        this.toggleSpinner(false);
                    }
                    this.$rootScope.title = "Proverb - " + data.title;
                });

            this.$rootScope.$on(this.config.events.controllerActivateFailure,
                (event, data: { controllerId: string; failureReason: any; }) => {
                    this.toggleSpinner(false);

                    var message = this.config.inDebug
                        ? JSON.stringify(data.failureReason) // If in debug mode then let's have the full error
                        : "There is a problem. Please contact support.";
                    this.logError(message, data.failureReason, true);
                });

            this.$rootScope.$on(this.config.events.spinnerToggle,
                (data: spinnerToggleEvent) => { this.toggleSpinner(data.show); });
        }

        toggleSpinner(onOrOff: boolean) {
            this.isBusy = onOrOff;
        }
    }

    var controllerId = "shell";
    angular.module("app").controller(controllerId, Shell);
}
