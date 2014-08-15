var controllers;
(function (controllers) {
    "use strict";

    var controllerId = "sayings";

    var Sayings = (function () {
        function Sayings($location, $q, common, datacontext) {
            var _this = this;
            this.$location = $location;
            this.$q = $q;
            this.common = common;
            this.datacontext = datacontext;
            // Instance methods
            this.bySelectedSage = function (saying) {
                if (!_this.selectedSage) {
                    return true;
                }
                return saying.sage === _this.selectedSage;
            };
            this.sageDictionary = {};
            this.sages = [];
            this.sayings = [];
            this.selectedSage = undefined;
            this.title = "Sayings";

            this.log = common.logger.getLogFn(controllerId);

            this.activate();
        }
        // Prototype methods
        Sayings.prototype.activate = function () {
            var _this = this;
            var dataPromises = [this.getProverbs(), this.getSages()];
            var combinerPromise = this.$q.all(dataPromises).then(function () {
                return _this.combineData();
            });

            this.common.activateController([combinerPromise], controllerId, this.title).then(function () {
                return _this.log("Activated Sayings View");
            });
        };

        Sayings.prototype.combineData = function () {
            var _this = this;
            this.sages.forEach(function (sage) {
                return _this.sageDictionary[sage.id.toString()] = sage;
            });

            this.sayings.forEach(function (saying) {
                return saying.sage = _this.sageDictionary[saying.sageId.toString()];
            });

            var search = this.$location.search();
            if (search.sageId) {
                this.selectedSage = this.sageDictionary[search.sageId];
            }
        };

        Sayings.prototype.getProverbs = function () {
            var _this = this;
            return this.datacontext.saying.getAll().then(function (data) {
                return _this.sayings = data;
            });
        };

        Sayings.prototype.getSages = function () {
            var _this = this;
            return this.datacontext.sage.getAll().then(function (data) {
                return _this.sages = data;
            });
        };

        Sayings.prototype.selectedSageChange = function () {
            this.$location.search("sageId", this.selectedSage.id);
        };
        Sayings.$inject = ["$location", "$q", "common", "datacontext"];
        return Sayings;
    })();

    angular.module("app").controller(controllerId, Sayings);
})(controllers || (controllers = {}));
//# sourceMappingURL=sayings.js.map
