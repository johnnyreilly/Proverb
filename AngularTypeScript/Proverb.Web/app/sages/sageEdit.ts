module controllers {

    "use strict";

    var controllerId = "sageEdit";

    interface sageEditRouteParams extends ng.route.IRouteParamsService {
        id: number;
    }

    interface sageEditScope extends ng.IScope {
        form: ng.IFormController;
    }

    class SageEdit {

        dateOfBirthDatePickerIsOpen: boolean;
        errors: { [field: string]: string };
        log: loggerFunction;
        logError: loggerFunction;
        logSuccess: loggerFunction;
        sage: sage;
        title: string;

        private _isSavingOrRemoving: boolean;

        static $inject = ["$location", "$routeParams", "$scope", "bootstrap.dialog", "common", "datacontext"];
        constructor(
            private $location: ng.ILocationService,
            private $routeParams: sageEditRouteParams,
            private $scope: sageEditScope,
            private bsDialog: bootstrapDialog,
            private common: common,
            private datacontext: datacontext
            ) {

            this.dateOfBirthDatePickerIsOpen = false;
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

        activate() {
            var id = this.$routeParams.id;
            var dataPromises: ng.IPromise<any>[] = [this.getSage(id)];

            this.common.activateController(dataPromises, controllerId, this.title)
                .then(() => {
                    this.log("Activated Sage Edit View");
                    this.title = "Sage Edit: " + this.sage.name;
                });
        }

        dateOfBirthDatePickerOpen() {
            this.dateOfBirthDatePickerIsOpen = true;
        }

        getSage(id: number) {
            return this.datacontext.sage.getById(id).then(sage => {
                this.sage = sage;
            });
        }

        remove() {

            var sageToRemove = this.sage.name;

            this.bsDialog.deleteDialog("Do you want to remove " + sageToRemove + "?")
                .then(() => {

                    this._isSavingOrRemoving = true;

                    this.common.waiter(this.datacontext.sage.remove(this.sage.id), controllerId, "Removing " + sageToRemove)
                        .then(response => {

                            this.logSuccess("Removed " + sageToRemove);
                            this.$location.path("/sages");
                        })
                        .catch(response => {
                            this.logError("Failed to remove " + sageToRemove, response);
                        })
                        .finally(() => this._isSavingOrRemoving = false);
                });
        }

        save() {

            this.errors = {}; //Wipe server errors
            this._isSavingOrRemoving = true;

            var sageToSave = this.sage.name;

            this.common.waiter(this.datacontext.sage.save(this.sage), controllerId, "Saving " + sageToSave)
                .then(response => {

                    this.sage = response.entity;
                    this.logSuccess("Saved " + sageToSave);
                    this.$location.path("/sages/detail/" + this.sage.id);
                })
                .catch(response => {

                    var failMessage = "Failed to save " + sageToSave;
                    if (response.errors) {
                        this.logError(failMessage, response.errors);

                        angular.forEach(response.errors, (errors, field) => {
                            (<ng.INgModelController>this.$scope.form[field]).$setValidity("server", false);
                            this.errors[field] = errors.join(",");
                        });
                    }
                    else {
                        this.logError(failMessage, response);
                    }
                })
                .finally(() => this._isSavingOrRemoving = false);
        }

        // Properties

        get hasChanges(): boolean {
            return this.$scope.form.$dirty;
        }

        get canSave(): boolean {
            return this.hasChanges && !this.isSavingOrRemoving && this.$scope.form.$valid;
        }

        get isSavingOrRemoving(): boolean {
            return this._isSavingOrRemoving;
        }
    }

    angular.module("app").controller(controllerId, SageEdit);
}
