module controllers {

    "use strict";

    var controllerId = "sayingEdit";

    interface sayingEditRouteParams extends ng.route.IRouteParamsService {
        id: string;
    }

    interface sayingEditScope extends ng.IScope {
        form: ng.IFormController;
    }

    class SayingEdit {

        errors: { [field: string]: string };
        log: loggerFunction;
        logError: loggerFunction;
        logSuccess: loggerFunction;
        sages: sage[];
        saying: saying;
        title: string;

        private _isSavingOrRemoving: boolean;

        static $inject = ["$location", "$routeParams", "$scope", "_", "bootstrap.dialog", "common", "datacontext"];
        constructor(
            private $location: ng.ILocationService,
            private $routeParams: sayingEditRouteParams,
            private $scope: sayingEditScope,
            private _: UnderscoreStatic,
            private bsDialog: bootstrapDialog,
            private common: common,
            private datacontext: datacontext
            ) {

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

        activate() {

            var id = parseInt(this.$routeParams.id, 10);
            var dataPromises: ng.IPromise<any>[] = [this.datacontext.sage.getAll().then(data => this.sages = data)];
            var title: string;

            if (id) {
                dataPromises.push(this.datacontext.saying.getById(id).then(saying => this.saying = saying));
                title = "Saying Edit";
            }
            else {
                title = "Saying Add";
            }

            this.common.activateController(dataPromises, controllerId, title)
                .then(() => {
                    this.log("Activated " + title + " View");
                    this.title = title;

                    // Set the saying's sage by looking it up in the sages already loaded
                    this.saying.sage = this._.find(this.sages, s => s.id === this.saying.sageId);
                });
        }

        remove() {

            this.bsDialog.deleteDialog("Do you want to remove this saying?")
                .then(() => {

                    this._isSavingOrRemoving = true;

                    this.common.waiter(this.datacontext.sage.remove(this.saying.id), controllerId, "Removing saying")
                        .then(response => {

                            this.logSuccess("Removed saying");
                            this.$location.path("/sayings/").search("sageId", this.saying.sageId);
                        })
                        .catch(response => {
                            this.logError("Failed to remove saying", response);
                        })
                        .finally(() => this._isSavingOrRemoving = false);
                });
        }

        save() {

            this.errors = {}; //Wipe server errors
            this._isSavingOrRemoving = true;

            // Prepare the saying to save - send the minimal payload of data across the wire
            var sayingToSave = angular.copy(this.saying);
            if (sayingToSave.sage) {
                sayingToSave.sageId = sayingToSave.sage.id;
            }
            else {
                sayingToSave.sageId = 0;
            }
            sayingToSave.sage = null;

            this.common.waiter(this.datacontext.saying.save(sayingToSave), controllerId, "Saving saying")
                .then(response => {

                    this.logSuccess("Saved saying");
                    this.$location.path("/sayings/").search("sageId", response.sageId);
                })
                .catch(response => {

                    var failMessage = "Failed to save saying";
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

    angular.module("app").controller(controllerId, SayingEdit);
}
