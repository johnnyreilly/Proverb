module controllers {

    "use strict";

    class Dashboard {

        log: loggerFunction;
        messageCount: number;
        news: {
            title: string;
            description: string;
        }
        sages: sage[];
        title: string;

        static $inject = ["common", "datacontext"];
        constructor(
            private common: common,
            private datacontext: datacontext
            ) {

            this.news = {
                title: "Proverb",
                description: "The Wisdom of Socrates Aruldas (and The Team)"
            };
            this.messageCount = 0;
            this.sages = [];
            this.title = "Dashboard";

            this.log = common.logger.getLogFn(controllerId);

            this.activate();
        }

        // Prototype methods

        activate() {
            var promises: ng.IPromise<any>[] = [/*getMessageCount(), */this.getSages()];
            this.common.activateController(promises, controllerId)
                .then(() => this.log("Activated Dashboard View"));
        }

        getSages() {
            return this.datacontext.sage.getAll().then(data => this.sages = data);
        }
    }

    var controllerId = "dashboard";
    angular.module("app").controller(controllerId, Dashboard);
}