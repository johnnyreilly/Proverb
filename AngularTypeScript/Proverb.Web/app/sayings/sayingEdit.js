var controllers;
(function (controllers) {
    "use strict";

    var controllerId = "sayingEdit";

    var SayingEdit = (function () {
        function SayingEdit($location, $routeParams, $scope, _, bsDialog, common, datacontext) {
            this.$location = $location;
            this.$routeParams = $routeParams;
            this.$scope = $scope;
            this._ = _;
            this.bsDialog = bsDialog;
            this.common = common;
            this.datacontext = datacontext;
            this.errors = {};
            this.log = common.logger.getLogFn(controllerId);
            this.logError = common.logger.getLogFn(controllerId, "error");
            this.logSuccess = common.logger.getLogFn(controllerId, "success");
            this.sages = [];
            this.saying = undefined;

            this._isSavingOrRemoving = false;

            this.activate();
        }
        // Prototype methods
        SayingEdit.prototype.activate = function () {
            var _this = this;
            var id = parseInt(this.$routeParams.id, 10);
            var dataPromises = [this.datacontext.sage.getAll().then(function (data) {
                    return _this.sages = data;
                })];
            var title;

            if (id) {
                dataPromises.push(this.datacontext.saying.getById(id, true).then(function (saying) {
                    return _this.saying = saying;
                }));
                title = "Saying Edit";
            } else {
                title = "Saying Add";
            }

            this.common.activateController(dataPromises, controllerId, title).then(function () {
                _this.log("Activated " + title + " View");
                _this.title = title;

                if (id) {
                    // Set the saying's sage by looking it up in the sages already loaded
                    _this.saying.sage = _this._.find(_this.sages, function (s) {
                        return s.id === _this.saying.sageId;
                    });
                }
            });
        };

        SayingEdit.prototype.remove = function () {
            var _this = this;
            this.bsDialog.deleteDialog("Do you want to remove this saying?").then(function () {
                _this._isSavingOrRemoving = true;

                _this.common.waiter(_this.datacontext.sage.remove(_this.saying.id), controllerId, "Removing saying").then(function (response) {
                    _this.logSuccess("Removed saying");
                    _this.$location.path("/sayings/").search("sageId", _this.saying.sageId.toString());
                }).catch(function (response) {
                    _this.logError("Failed to remove saying", response);
                }).finally(function () {
                    return _this._isSavingOrRemoving = false;
                });
            });
        };

        SayingEdit.prototype.save = function () {
            var _this = this;
            this.errors = {}; //Wipe server errors
            this._isSavingOrRemoving = true;

            // Prepare the saying to save - send the minimal payload of data across the wire
            var sayingToSave = angular.copy(this.saying);
            if (sayingToSave.sage) {
                sayingToSave.sageId = sayingToSave.sage.id;
            } else {
                sayingToSave.sageId = 0;
            }
            sayingToSave.sage = null;

            this.common.waiter(this.datacontext.saying.save(sayingToSave), controllerId, "Saving saying").then(function (response) {
                _this.logSuccess("Saved saying");
                _this.$location.path("/sayings/").search("sageId", response.sageId.toString());
            }).catch(function (response) {
                if (response.errors) {
                    angular.forEach(response.errors, function (errors, field) {
                        var model = _this.$scope.form[field];
                        if (model) {
                            model.$setValidity("server", false);
                        } else {
                            // No screen element to tie failure message to so pop a toast
                            _this.logError(errors);
                        }
                        _this.errors[field] = errors.join(",");
                    });
                } else {
                    _this.logError("Failed to save saying", response);
                }
            }).finally(function () {
                return _this._isSavingOrRemoving = false;
            });
        };

        Object.defineProperty(SayingEdit.prototype, "hasChanges", {
            // Properties
            get: function () {
                return this.$scope.form.$dirty;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SayingEdit.prototype, "canSave", {
            get: function () {
                return this.hasChanges && !this.isSavingOrRemoving && this.$scope.form.$valid;
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(SayingEdit.prototype, "isSavingOrRemoving", {
            get: function () {
                return this._isSavingOrRemoving;
            },
            enumerable: true,
            configurable: true
        });
        SayingEdit.$inject = ["$location", "$routeParams", "$scope", "_", "bootstrap.dialog", "common", "datacontext"];
        return SayingEdit;
    })();

    angular.module("app").controller(controllerId, SayingEdit);
})(controllers || (controllers = {}));
//# sourceMappingURL=sayingEdit.js.map
