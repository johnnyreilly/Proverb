var controllers;
(function (controllers) {
    "use strict";

    var Shell = (function () {
        function Shell($rootScope, common, config) {
            this.$rootScope = $rootScope;
            this.common = common;
            this.config = config;
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
        Shell.prototype.activate = function () {
            var _this = this;
            this.common.activateController([], controllerId).then(function () {
                _this.logSuccess("Proverb v" + _this.config.version + " loaded!", null, true);
            });
        };

        Shell.prototype.wireUpEventListeners = function () {
            var _this = this;
            this.$rootScope.$on("$routeChangeStart", function (event, next, current) {
                _this.toggleSpinner(true);
            });

            this.$rootScope.$on(this.config.events.controllerActivateSuccess, function (event, data) {
                // Deactivate spinner as long as the controller that has been activated is not the shell
                if (data.controllerId !== controllerId) {
                    _this.toggleSpinner(false);
                }
            });

            this.$rootScope.$on(this.config.events.controllerActivateFailure, function (event, data) {
                _this.toggleSpinner(false);

                var message = _this.config.inDebug ? JSON.stringify(data.failureReason) : "There is a problem. Please contact support.";
                _this.logError(message, data.failureReason, true);
            });

            this.$rootScope.$on(this.config.events.spinnerToggle, function (data) {
                _this.toggleSpinner(data.show);
            });
        };

        Shell.prototype.toggleSpinner = function (onOrOff) {
            this.isBusy = onOrOff;
        };
        Shell.$inject = ["$rootScope", "common", "config"];
        return Shell;
    })();

    var controllerId = "shell";
    angular.module("app").controller(controllerId, Shell);
})(controllers || (controllers = {}));
//# sourceMappingURL=shell.js.map
