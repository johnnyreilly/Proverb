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
    public class SayingControllerTests
    {
        private Mock<ISayingService> _sayingServiceMock;
        private Mock<IUserHelper> _userHelperMock;
        private Mock<ILog> _loggerMock;
        private SayingController _controller;

        [TestInitialize]
        public void Initialise()
        {
            _sayingServiceMock = new Mock<ISayingService>();
            _userHelperMock = new Mock<IUserHelper>();
            _loggerMock = new Mock<ILog>();

            _controller = new SayingController(_sayingServiceMock.Object, _userHelperMock.Object, _loggerMock.Object);
        }
        /*
        private void Index_setup()
        {
            _sayingServiceMock
                .Setup(x => x.GetAll())
                .Returns(new List<SayingController>());
        }

        [TestMethod]
        public void Index_gets_Proverbs_from_repository()
        {
            Index_setup();

            ViewResult result = _controller.Index();

            _sayingServiceMock
                .Verify(x => x.GetAll(), Times.Once);
        }

        [TestMethod]
        public void Index_returns_Proverbs_as_model()
        {
            Index_setup();

            ViewResult result = _controller.Index();

            Assert.IsInstanceOfType(result.Model, typeof(ICollection<Proverb>));
        }
        */
    }

}
