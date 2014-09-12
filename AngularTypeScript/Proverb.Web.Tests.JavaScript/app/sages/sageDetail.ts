/// <reference path="../../../proverb.web/scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../../proverb.web/scripts/typings/angularjs/angular-mocks.d.ts" />
/// <reference path="../../../proverb.web/app/sages/sagedetail.ts" />
/// <reference path="../../../proverb.web/app/common/common.ts" />
/// <reference path="../../../proverb.web/app/services/datacontext.ts" />
/// <reference path="../../../proverb.web/app/services/repository.sage.ts" />
describe("Proverb.Web -> app-> controllers ->", function () {

    beforeEach(function () {

        module("app");
    });

    describe("sageDetail ->", function () {

        var $rootScope: ng.IRootScopeService,
            // deferred used for promises 
            getById_deferred: ng.IDeferred<sage>, 
            // controller dependencies
            $location: ng.ILocationService,
            $routeParams_stub: controllers.sageDetailRouteParams,
            common: common,
            datacontext: datacontext,
            sageDetailController: controllers.SageDetail; // the controller

        beforeEach(inject(function (
            _$controller_: any,
            _$rootScope_: ng.IRootScopeService,
            _$q_: ng.IQService,
            _$location_: ng.ILocationService,
            _common_: common,
            _datacontext_: datacontext) {

            $rootScope = _$rootScope_;
            var $q = _$q_;

            $location = _$location_;
            common = _common_;
            datacontext = _datacontext_;

            $routeParams_stub = { id: "10" };
            getById_deferred = $q.defer();

            spyOn(datacontext.sage, "getById").and.returnValue(getById_deferred.promise);
            spyOn(common, "activateController").and.callThrough();
            spyOn(common.logger, "getLogFn").and.returnValue(jasmine.createSpy("log"));
            spyOn($location, "path").and.returnValue(jasmine.createSpy("path"));

            sageDetailController = _$controller_("sageDetail", {
                $location: $location,
                $routeParams: $routeParams_stub,
                common: common,
                datacontext: datacontext
            });


        }));

        describe("on creation ->", function () {

            it("controller should have a title of 'Sage Details'", function () {

                expect(sageDetailController.title).toBe("Sage Details");
            });

            it("controller should have no sage", function () {

                expect(sageDetailController.sage).toBeUndefined();
            });

            it("datacontext.sage.getById should be called", function () {

                expect(datacontext.sage.getById).toHaveBeenCalledWith(10, true);
            });
        });

        describe("activateController ->", function () {

            var sage_stub: sage;
            beforeEach(function () {
                sage_stub = { name: "John", id: 10, username: "John", email: "john@", dateOfBirth: new Date() };
            });

            it("should set sages to be the resolved promise values", function () {

                getById_deferred.resolve(sage_stub);
                $rootScope.$digest(); // So Angular processes the resolved promise

                expect(sageDetailController.sage).toBe(sage_stub);
            });

            it("should log 'Activated Sage Details View' and set title with name", function () {

                getById_deferred.resolve(sage_stub);
                $rootScope.$digest(); // So Angular processes the resolved promise

                expect(sageDetailController.log).toHaveBeenCalledWith("Activated Sage Details View");
                expect(sageDetailController.title).toBe("Sage Details: " + sage_stub.name);
            });
        });

        describe("gotoEdit ->", function () {

            var sage_stub: sage;
            beforeEach(function () {
                sage_stub = { name: "John", id: 20, username: "John", email: "john@", dateOfBirth: new Date() };
            });

            it("should set $location.path to edit URL", function () {

                getById_deferred.resolve(sage_stub);
                $rootScope.$digest(); // So Angular processes the resolved promise

                sageDetailController.gotoEdit();

                expect($location.path).toHaveBeenCalledWith("/sages/edit/" + sage_stub.id);
            });
        });
    });
});
