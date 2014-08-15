module controllers {

    "use strict";

    var controllerId = "dashboard";

    class Dashboard {

        log: loggerFunction;
        sages: sage[];

        static $inject = ["common", "datacontext"];
        constructor(
            private common: common,
            private datacontext: datacontext
            ) {

            this.sages = [];

            this.log = common.logger.getLogFn(controllerId);

            this.activate();
        }

        // Prototype methods

        activate() {
            var promises: ng.IPromise<any>[] = [this.getSages()];
            this.common.activateController(promises, controllerId, "Dashboard")
                .then(() => this.log("Activated Dashboard View"));
        }

        getSages() {
            return this.datacontext.sage.getAll().then(data => this.sages = data);
        }
    }

    angular.module("app").controller(controllerId, Dashboard);
}