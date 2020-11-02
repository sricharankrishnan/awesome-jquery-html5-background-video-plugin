(function($mainRoot, w, d) {
  var app;

  function ThisApp() {}
  /* starter */
  ThisApp.main = function() {
    app = new ThisApp();
    app.deploy();
  };
  /* deploys the object and starts the page functions */
  ThisApp.prototype.deploy = function() {
    var $this = this;
    $this.jumbotronSection();
  };
  /* checks the window scroll pos and then, will trigger the necessary callback fuction */
  ThisApp.prototype.checkWindowScrollPosition = function(thisParentElement, thisCallback) {
    try {
      if (!thisParentElement || !thisCallback) {
        throw new Error(
          "requires 2 mandatory arugments for functioning. Please check what has been passed"
        );
      } else if (typeof thisCallback !== "function") {
        throw new Error(
          "requires the argument 'thisCallback' to be of function type only"
        );
      } else {
        $(window).on("scroll", function() {
          var elementTopPos = thisParentElement.offset().top,
            elementBotPos = elementTopPos + thisParentElement.outerHeight(),
            viewportTopPos = $(window).scrollTop(),
            viewportBotPos = viewportTopPos + $(window).height(),
            hasDataLoaded = thisParentElement.attr("data-hasloaded");

          if (
            elementBotPos > viewportTopPos &&
            elementTopPos < viewportBotPos &&
            hasDataLoaded === "false"
          ) {
            thisCallback();
          }
        });
      }
    } catch (thisError) {
      console.error("checkWindowScrollPosition() -> " + thisError);
    }
  };
  /* smooth scroll on element click */
  ThisApp.prototype.smoothyScroll = function(thisEl) {
    try {
      if(thisEl.get(0).nodeType !== 1) {
        throw new Error("- requires @thisEl argument to be an HTML Node, please check.");
        return;
      }
      thisEl.on("click", function(event) {
        event.preventDefault();
        var hashValue = $(this.hash);
        $('html, body').stop().animate({
         scrollTop: $(hashValue).offset().top
        }, 800);
        return false;
      });
    }
    catch(thisErr) {
      console.error("Smoothy Scroll: " + thisErr);
    }
  };
  /* handles the jumbotron section */
  ThisApp.prototype.jumbotronSection = function() {
    var v1 = $mainRoot.find("#vid1");

    var config1 = {
      parentElement: v1,
      playInMobile: true,
      playInTablet: true,
      playInDesktop: true,
      webmVideo: v1.attr("data-webm"),
      mp4Video: v1.attr("data-mp4"),
      callback: function() {
        console.log("Build complete");
      },
      fallbackImage: ""
    };
    buildHtmlVideo(config1);
  };

  function centralController() {
    ThisApp.main();
  }

  $(d).ready(centralController);
})($("#appRoot"), window, document);
