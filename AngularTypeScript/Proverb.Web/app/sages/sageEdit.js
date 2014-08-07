var controllers;
(function (controllers) {
    "use strict";

    var SageEdit = (function () {
        function SageEdit($location, $routeParams, $scope, common, datacontext) {
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.$scope = $scope;
            this.common = common;
            this.datacontext = datacontext;
            this.errors = {};
            this.log = common.logger.getLogFn(controllerId);
            this.logError = common.logger.getLogFn(controllerId, "error");
            this.logSuccess = common.logger.getLogFn(controllerId, "success");
            this.sage = undefined;
            this.title = "Sage Edit";

            this._isSavingOrRemoving = false;

            this.activate();
        }
        // Prototype methods
        SageEdit.prototype.activate = function () {
            var _this = this;
            var id = this.$routeParams.id;
            var dataPromises = [this.getSage(id)];

            this.common.activateController(dataPromises, controllerId, this.title).then(function () {
                _this.log("Activated Sage Edit View");
                _this.title = "Sage Edit: " + _this.sage.name;
            });
        };

        SageEdit.prototype.getSage = function (id) {
            var _this = this;
            return this.datacontext.sage.getById(id).then(function (sage) {
                _this.sage = sage;
            });
        };

        SageEdit.prototype.remove = function () {
            var _this = this;
            this._isSavingOrRemoving = true;

            var sageToRemove = this.sage.name;

            this.common.waiter(this.datacontext.sage.remove(this.sage.id), controllerId, "Removing " + sageToRemove).then(function (response) {
                //if (response.success) {
                _this.logSuccess("Removed " + sageToRemove);
                _this.$location.path("/sages");
                //}
                //else {
                //    this.logError("Failed to remove " + sageToRemove, response.errors);
                //}
            }).finally(function () {
                return _this._isSavingOrRemoving = false;
            });
        };

        SageEdit.prototype.save = function () {
            var _this = this;
            this.errors = {}; //Wipe server errors
            this._isSavingOrRemoving = true;

            var sageToSave = this.sage.name;

            this.common.waiter(this.datacontext.sage.save(this.sage), controllerId, "Saving " + sageToSave).then(function (response) {
                if (response.success) {
                    _this.sage = response.entity;
                    _this.logSuccess("Saved " + sageToSave);
                    _this.$location.path("/sages/detail/" + _this.sage.id);
                } else {
                    _this.logError("Failed to save " + sageToSave, response.errors);

                    angular.forEach(response.errors, function (errors, field) {
                        _this.$scope.form[field].$setValidity("server", false);
                        _this.errors[field] = errors.join(",");
                    });
                }
            }).finally(function () {
                return _this._isSavingOrRemoving = false;
            });
        };

        Object.defineProperty(SageEdit.prototype, "hasChanges", {
            // Properties
            get: function () {
                return this.$scope.form.$dirty;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SageEdit.prototype, "canSave", {
            get: function () {
                return this.hasChanges && !this.isSavingOrRemoving && this.$scope.form.$valid;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SageEdit.prototype, "isSavingOrRemoving", {
            get: function () {
                return this._isSavingOrRemoving;
            },
            enumerable: true,
            configurable: true
        });
        SageEdit.$inject = ["$location", "$routeParams", "$scope", "common", "datacontext"];
        return SageEdit;
    })();

    var controllerId = "sageEdit";
    angular.module("app").controller(controllerId, SageEdit);
})(controllers || (controllers = {}));
//# sourceMappingURL=sageEdit.js.map
