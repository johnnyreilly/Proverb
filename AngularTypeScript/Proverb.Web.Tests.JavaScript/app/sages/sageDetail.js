describe("controllers ->", function () {

    beforeEach(function () {

        module("app");
    });

    describe("sageDetail ->", function () {

        var $rootScope, activateControllerDeferred,
            $location, stub$routeParams, common, datacontext,
            getByIdDeferred,
            sageDetailController;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _$location_, _common_, _datacontext_) {

            $rootScope = _$rootScope_;
            $q = _$q_;

            $location = _$location_;
            common = _common_;
            datacontext = _datacontext_;

            stub$routeParams = { id: "10" };
            getByIdDeferred = $q.defer();
            activateControllerDeferred = $q.defer();

            spyOn(datacontext.sage, "getById").and.returnValue(getByIdDeferred.promise);
            spyOn(common, "activateController").and.returnValue(activateControllerDeferred.promise);
            spyOn(common.logger, "getLogFn").and.returnValue(jasmine.createSpy("log"));
            spyOn($location, "path").and.returnValue(jasmine.createSpy("path"));

            sageDetailController = _$controller_("sageDetail", {
                $location: $location,
                $routeParams: stub$routeParams,
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

            var stubSage;
            beforeEach(function () {
                stubSage = { name: "John" };
            });

            it("should set sages to be the resolved promise values", function () {

                getByIdDeferred.resolve(stubSage);
                $rootScope.$digest(); // So Angular processes the resolved promise

                expect(sageDetailController.sage).toBe(stubSage);
            });

            it("should log 'Activated Sage Details View' and set title with name", function () {

                getByIdDeferred.resolve(stubSage);
                activateControllerDeferred.resolve();
                $rootScope.$digest(); // So Angular processes the resolved promise

                expect(sageDetailController.log).toHaveBeenCalledWith("Activated Sage Details View");
                expect(sageDetailController.title).toBe("Sage Details: " + stubSage.name);
            });
        });

        describe("gotoEdit ->", function () {

            var stubSage;
            beforeEach(function () {
                stubSage = { id: 20 };
            });

            it("should set $location.path to edit URL", function () {

                getByIdDeferred.resolve(stubSage);
                activateControllerDeferred.resolve();
                $rootScope.$digest(); // So Angular processes the resolved promise

                sageDetailController.gotoEdit();

                expect($location.path).toHaveBeenCalledWith("/sages/edit/" + stubSage.id);
            });
        });
    });
});
