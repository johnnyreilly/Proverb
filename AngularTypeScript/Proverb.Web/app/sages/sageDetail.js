var controllers;
(function (controllers) {
    "use strict";

    var SageDetail = (function () {
        function SageDetail($location, $routeParams, common, datacontext) {
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.common = common;
            this.datacontext = datacontext;
            this.sage = undefined;
            this.title = "Sage Details";

            this.log = common.logger.getLogFn(controllerId);

            this.activate();
        }
        // Prototype methods
        SageDetail.prototype.activate = function () {
            var _this = this;
            var id = this.$routeParams.id;
            var dataPromises = [this.getSage(id)];

            this.common.activateController(dataPromises, controllerId).then(function () {
                _this.log("Activated Sage Details View");
                _this.title = "Sage Details: " + _this.sage.name;
            });
        };

        SageDetail.prototype.getSage = function (id) {
            var _this = this;
            return this.datacontext.sage.getById(id, true).then(function (data) {
                return _this.sage = data;
            });
        };

        SageDetail.prototype.gotoEdit = function () {
            this.$location.path("/sages/edit/" + this.sage.id);
        };
        SageDetail.$inject = ["$location", "$routeParams", "common", "datacontext"];
        return SageDetail;
    })();

    var controllerId = "sageDetail";
    angular.module("app").controller(controllerId, SageDetail);
})(controllers || (controllers = {}));
//# sourceMappingURL=sageDetail.js.map
