﻿var controllers;
(function (controllers) {
    "use strict";

    var Sages = (function () {
        function Sages(common, datacontext) {
            this.common = common;
            this.datacontext = datacontext;
            this.sages = [];
            this.title = "Sages";

            this.log = common.logger.getLogFn(controllerId);

            this.activate();
        }
        // Prototype methods
        Sages.prototype.activate = function () {
            var _this = this;
            this.common.activateController([this.getSages()], controllerId).then(function () {
                return _this.log("Activated Sages View");
            });
        };

        Sages.prototype.getSages = function () {
            var _this = this;
            return this.datacontext.sage.getAll().then(function (data) {
                return _this.sages = data;
            });
        };
        Sages.$inject = ["common", "datacontext"];
        return Sages;
    })();

    var controllerId = "sages";
    angular.module("app").controller(controllerId, Sages);
})(controllers || (controllers = {}));
//# sourceMappingURL=sages.js.map
