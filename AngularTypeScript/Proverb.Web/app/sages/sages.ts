module controllers {

    "use strict";

    class Sages {

        log: loggerFunction;
        sages: sage[];
        title: string;

        static $inject = ["common", "datacontext"];
        constructor(
            private common: common,
            private datacontext: datacontext
            ) {

            this.sages = [];
            this.title = "Sages";

            this.log = common.logger.getLogFn(controllerId);

            this.activate();
        }

        // Prototype methods

        activate() {
            this.common.activateController([this.getSages()], controllerId)
                .then(() => this.log("Activated Sages View"));
        }

        getSages() {
            return this.datacontext.sage.getAll().then(data => this.sages = data);
        }
    }

    var controllerId = "sages";
    angular.module("app").controller(controllerId, Sages);
}