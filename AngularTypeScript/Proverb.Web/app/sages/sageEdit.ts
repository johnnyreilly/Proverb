module controllers {

    "use strict";

    interface sageEditRouteParams extends ng.route.IRouteParamsService {
        id: number;
    }

    interface sageEditScope extends ng.IScope {
        form: ng.IFormController;
        errors: { [field: string]: string };
    }

    class SageEdit {

        log: loggerFunction;
        logError: loggerFunction;
        logSuccess: loggerFunction;
        sage: sage;
        title: string;

        private _isSaving: boolean;

        static $inject = ["$location", "$routeParams", "$scope", "common", "datacontext"];
        constructor(
            private $location: ng.ILocationService,
            private $routeParams: sageEditRouteParams,
            private $scope: sageEditScope,
            private common: common,
            private datacontext: datacontext
            ) {

            $scope.errors = {};
            this.log = common.logger.getLogFn(controllerId);
            this.logError = common.logger.getLogFn(controllerId, "error");
            this.logSuccess = common.logger.getLogFn(controllerId, "success");
            this.sage = undefined;
            this.title = "Sage Edit";

            this._isSaving = false;

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

        getSage(id: number) {
            return this.datacontext.sage.getById(id).then(sage => {
                this.sage = sage;
            });
        }

        save() {

            this.$scope.errors = {}; //Wipe server errors
            this.datacontext.sage.save(this.sage).then(response => {

                if (response.success) {
                    this.sage = response.entity;
                    this.logSuccess("Saved " + this.sage.name + " [" + this.sage.id + "]");
                    //this.$scope.form.$setPristine();
                    this.$location.path("/sages/detail/" + this.sage.id);
                }
                else {
                    this.logError("Failed to save", response.errors);

                    angular.forEach(response.errors, (errors, field) => {
                        (<ng.INgModelController>this.$scope.form[field]).$setValidity("server", false);
                        this.$scope.errors[field] = errors.join(",");
                    });
                }
            });
        }

        // Properties

        get hasChanges(): boolean {
            return this.$scope.form.$dirty;
        }

        get canSave(): boolean {
            return this.hasChanges && !this._isSaving && this.$scope.form.$valid;
        }
    }

    var controllerId = "sageEdit";
    angular.module("app").controller(controllerId, SageEdit);
}
