using log4net;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Proverb.Data.Models;
using Proverb.Services.Interfaces;
using Proverb.Web.Controllers;
using Proverb.Web.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Proverb.Web.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTests
    {
        private const string CATEGORY = "Proverb.Web -> HomeController";

        private Mock<IUserService> _userServiceMock;
        private Mock<IUserHelper> _userHelperMock;
        private Mock<ILog> _loggerMock;
        private HomeController _controller;

        [TestInitialize]
        public void Initialise()
        {
            _userServiceMock = new Mock<IUserService>();
            _userHelperMock = new Mock<IUserHelper>();
            _loggerMock = new Mock<ILog>();

            _controller = new HomeController(_userServiceMock.Object, _userHelperMock.Object, _loggerMock.Object);
        }

        [TestMethod, TestCategory(CATEGORY)]
        public void Index_returns_ViewResult()
        {
            ViewResult result = _controller.Index();
        }

        [TestMethod, TestCategory(CATEGORY)]
        public void About_sets_ViewBagMessage()
        {
            ViewResult result = _controller.About();

            Assert.AreEqual("Your application description page.", result.ViewBag.Message);
        }

        [TestMethod, TestCategory(CATEGORY)]
        public void Contact_sets_ViewBagMessage()
        {
            ViewResult result = _controller.Contact();

            Assert.AreEqual("Your contact page.", result.ViewBag.Message);
        }
    }

}
