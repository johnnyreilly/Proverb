﻿describe("Proverb.Web -> app-> controllers ->", function () {

    beforeEach(function () {

        module("app");
    });

    describe("sages ->", function () {

        var $rootScope, activateController_deferred, common, datacontext, getAll_deferred, sagesController;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _common_, _datacontext_) {

            $rootScope = _$rootScope_;
            $q = _$q_;
            common = _common_;
            datacontext = _datacontext_;

            getAll_deferred = $q.defer();
            activateController_deferred = $q.defer();

            spyOn(datacontext.sage, "getAll").and.returnValue(getAll_deferred.promise);
            spyOn(common, "activateController").and.returnValue(activateController_deferred.promise);
            spyOn(common.logger, "getLogFn").and.returnValue(jasmine.createSpy("log"));
            
            sagesController = _$controller_("sages", {
                common: common,
                datacontext: datacontext
            });


        }));

        describe("on creation ->", function () {

            it("controller should have a title of 'Sages'", function () {

                expect(sagesController.title).toBe("Sages");
            });

            it("controller should have no sages", function () {

                expect(sagesController.sages.length).toBe(0);
            });

            it("datacontext.sage.getById should be called", function () {

                expect(datacontext.sage.getAll).toHaveBeenCalledWith();
            });
        });

        describe("activateController ->", function () {

            var stubSages;
            beforeEach(function () {
                stubSages = [{ name: "John" }];
            });

            it("should set sages to be the resolved promise values", function () {

                getAll_deferred.resolve(stubSages);
                $rootScope.$digest(); // So Angular processes the resolved promise

                expect(sagesController.sages).toBe(stubSages);
            });

            it("should log 'Activated Sages View'", function () {

                getAll_deferred.resolve(stubSages);
                activateController_deferred.resolve();
                $rootScope.$digest(); // So Angular processes the resolved promise

                expect(sagesController.log).toHaveBeenCalledWith("Activated Sages View");
            });
        });
    });
});
