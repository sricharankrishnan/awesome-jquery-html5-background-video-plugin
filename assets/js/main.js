(function($mainRoot, w, d) {
  /* checks the window scroll pos and then, will trigger the necessary callback fuction */
  function checkWindowScrollPosition(thisParentElement, thisCallback) {
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
  }

  /* smooth scroll on element click */
  function smoothyScroll(thisEl) {
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
  }

  /* handles the jumbotron section */
  function jumbotronSection() {
    var pe = $mainRoot.find("#jumbotronSection"),
        mp4VideoSrc = pe.attr("data-mp4"),
        webmVideoSrc = pe.attr("data-webm");

    if(mp4VideoSrc !== "" && webmVideoSrc !== "") {
      var configObject = {
        parentElement: pe,
        playInMobile: false,
        playInTablet: true,
        playInDesktop: true,
        webmVideo: webmVideoSrc,
        mp4Video: mp4VideoSrc,
        fallbackImage: "",
        callback: function() {
          console.log("callback");
        }
      };
      buildHtmlVideo(configObject);
    }

    /* smooth scroll trigger */
    smoothyScroll($mainRoot.find("#demoTrigger"));
  }

  /* helps to handle the project link section */
  function projectLinkSection() {
    var pe = $mainRoot.find("#linksSection");
    checkWindowScrollPosition(pe, function() {
      pe.attr("data-hasloaded", "true");

      var videoConfig = {
        parentElement: pe,
        fallbackImage: "",
        playInMobile: false,
        playInTablet: true,
        playInDesktop: true,
        webmVideo: pe.attr("data-webm"),
        mp4Video: pe.attr("data-mp4")
      };
      buildHtmlVideo(videoConfig);
    });
  }

  /* helps to handle the demo section for the page */
  function demoSectionInit() {
    var pe = $mainRoot.find("#demoSection");
    var demoSegs = pe.find(".segment");
    
    /* activate the background images for the section */
    demoSegs.addClass("bgActive");

    checkWindowScrollPosition(pe, function() {
      pe.attr("data-hasloaded", "true");
      demoSegs.on("click", function() {
        demoSegs.find(".videoParent").remove();
        var $this = $(this);
        if(!$this.hasClass("videoActive"))  {
          $this.addClass("videoActive");
          var mp4Src = $this.attr("data-mp4");
          var webmSrc = $this.attr("data-webm");
          var configObject = {
            parentElement: $this,
            playInMobile: true,
            playInTablet: true,
            playInDesktop: true,
            webmVideo: webmSrc,
            mp4Video: mp4Src
          };
          buildHtmlVideo(configObject);
        }
      });
    });
  }

  function centralController() {
    jumbotronSection();
    projectLinkSection();
    demoSectionInit();
  }

  $(d).ready(centralController);
})($("#appRoot"), window, document);
