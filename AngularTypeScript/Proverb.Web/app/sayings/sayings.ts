module controllers {

    "use strict";

    class Sayings {

        log: loggerFunction;
        sayings: saying[];
        selectedSage: sage;
        sages: sage[];
        title: string;

        static $inject = ["$q", "common", "datacontext"];
        constructor(
            private $q: ng.IQService,
            private common: common,
            private datacontext: datacontext
            ) {

            this.sayings = [];
            this.sages = [];
            this.selectedSage = undefined;
            this.title = "Sayings";

            this.log = common.logger.getLogFn(controllerId);

            this.activate();
        }

        // Prototype methods

        activate() {
            var dataPromises: ng.IPromise<any>[] = [this.getProverbs(), this.getSages()];
            var combinerPromise = this.$q.all(dataPromises).then(() => this.combineData());

            this.common.activateController([combinerPromise], controllerId, this.title)
                .then(() => this.log("Activated Sayings View"));
        }

        getProverbs() {
            return this.datacontext.saying.getAll().then(data => this.sayings = data);
        }

        getSages() {
            return this.datacontext.sage.getAll().then(data => this.sages = data);
        }

        combineData() {
            var sageDictionary: { [id: number]: sage } = {};
            this.sages.forEach(sage => sageDictionary[sage.id] = sage);

            this.sayings.forEach(saying => saying.sage = sageDictionary[saying.sageId]);
        }

        // Instance methods

        bySelectedSage = (saying: saying) => {
            if (!this.selectedSage) { return true; }
            return saying.sage === this.selectedSage
        }
    }

    var controllerId = "sayings";
    angular.module("app").controller(controllerId, Sayings);
}
