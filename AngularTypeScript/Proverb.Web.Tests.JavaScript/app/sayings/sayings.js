describe("Proverb.Web -> app-> controllers ->", function () {

    beforeEach(function () {

        module("app");
    });

    describe("sayings ->", function () {

        var $rootScope, common, datacontext,
            sage_getAll_deferred, saying_getAll_deferred,
            sayingsController;

        beforeEach(inject(function (_$controller_, _$rootScope_, _$q_, _common_, _datacontext_) {

            $rootScope = _$rootScope_;
            $q = _$q_;
            common = _common_;
            datacontext = _datacontext_;

            sage_getAll_deferred = $q.defer();
            saying_getAll_deferred = $q.defer();

            spyOn(datacontext.sage, "getAll").and.returnValue(sage_getAll_deferred.promise);
            spyOn(datacontext.saying, "getAll").and.returnValue(saying_getAll_deferred.promise);
            spyOn(common, "activateController").and.callThrough();
            spyOn(common.logger, "getLoggers").and.returnValue({
                info: jasmine.createSpy("logInfo")
            });

            sayingsController = _$controller_("sayings", {
                common: common,
                datacontext: datacontext
            });
        }));

        describe("on creation ->", function () {

            it("controller should have a title of 'Sayings'", function () {

                expect(sayingsController.title).toBe("Sayings");
            });

            it("controller should have no sages", function () {

                expect(sayingsController.sages.length).toBe(0);
            });

            it("controller should have no sayings", function () {

                expect(sayingsController.sayings.length).toBe(0);
            });

            it("controller should have no selectedSage", function () {

                expect(sayingsController.selectedSage).toBeUndefined();
            });

            it("datacontext.sage.getAll should be called", function () {

                expect(datacontext.sage.getAll).toHaveBeenCalled();
            });

            it("datacontext.saying.getAll should be called", function () {

                expect(datacontext.saying.getAll).toHaveBeenCalled();
            });
        });

        describe("activateController ->", function () {

            var stubSayings, stubSages;
            beforeEach(function () {
                stubSages = [{ id: 1, name: "John" }];
                stubSayings = [{ sageId: 1, id: 2, text: "Pithy pithy pithy" }];

                sage_getAll_deferred.resolve(stubSages);
                saying_getAll_deferred.resolve(stubSayings);;
                $rootScope.$digest(); // So Angular processes the resolved promise

            });

            it("should set sayings to be the resolved promise values", function () {

                expect(sayingsController.sayings).toBe(stubSayings);
            });

            it("should set sages to be the resolved promise values", function () {

                expect(sayingsController.sages).toBe(stubSages);
            });

            it("should log 'Activated Sayings View'", function () {

                expect(sayingsController.log.info).toHaveBeenCalledWith("Activated Sayings View");
            });
        });
    });
});
