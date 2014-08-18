module controllers {

    "use strict";

    var controllerId = "about";

    class About {

        log: loggerFunction;
        version: string;

        static $inject = ["common", "config"];
        constructor(
            private common: common,
            private config: config
            ) {

            this.version = config.version;

            this.log = common.logger.getLogFn(controllerId);

            this.activate();
        }

        // Prototype methods

        activate() {
            this.common.activateController([], controllerId, "About")
                .then(() => this.log("Activated About View"));
        }
    }

    angular.module("app").controller(controllerId, About);
}