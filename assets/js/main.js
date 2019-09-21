(function(w, d, $mainRoot) {
  /* this function helps to build html video dynamically in the document 
    when the user is in the view of the respective html section */
  function buildHtmlVideo(configObject) {
    var _opts = Object.prototype.toString;
    try {
      if(_opts.call(configObject) !== "[object Object]") {
        throw new Error("- requires the configObject argument to be of object type, please check.");
        return;
      }
      else if(typeof configObject.webmVideo !== "string") {
        throw new Error("- requires the WebmVideo Property to be of string type. Please check.");
        return;
      }
      else if(typeof configObject.mp4Video !== "string") {
        throw new Error("- requires the Mp4Video Property to be of string type. Please check.");
        return;
      }
      else if(configObject.parentElement.get(0).nodeType !== 1) {
        throw new Error("- requires the ParentElement property to be of Node Type 1. Please Check.");
        return;
      }
      else if(typeof configObject.playInMobile !== "boolean") {
        throw new Error(" - requires property/field playInMobile to be of Boolean Type");
        return;
      }
      else if(typeof configObject.playInTablet !== "boolean") {
        throw new Error(" - requires property/field playInTablet to be of Boolean Type");
        return;
      }
      else if(typeof configObject.playInDesktop !== "boolean") {
        throw new Error(" - requires property/field playInDesktop to be of Boolean Type");
        return;
      }
      else if(typeof configObject.fallbackImage !== "string") {
        throw new Error(" - requires property/field fallbackImage to be of String Type.");
        return;
      }
      else {
        var pe = configObject.parentElement;
        
        function checkIE() {
          var undef,
              v = 3,
              div = document.createElement("div");
          while(div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><!endif-->',
                div.getElementsByTagName('i')[0]);
          return v > 4 ? v : undef;
        }
        var isIE = checkIE();

        /* makes sure that we have certain conditions that are ok */
        function conditionsMiddleware() {
          var mp4Status, webmStatus,
              formats = {
                mp4: 'video/mp4; codecs="avc1.42E01E"',
                webm: 'video/webm; codecs="vp8, vorbis"'
              };

          var v = document.createElement("video");
          mp4Status = v.canPlayType(formats["mp4"]) === "probably" ? true : false;
          webmStatus = v.canPlayType(formats["webm"]) === "probably" ? true : false;

          if(configObject.playInMobile === false && configObject.playInTablet === false && configObject.playInDesktop === false) {
            var bgurl = configObject.fallbackImage;
            buildHtmlVideo.buildBgPicture(pe, bgurl);
          }
          else if(isIE === true) {
            var bgurl = configObject.fallbackImage;
            buildHtmlVideo.buildBgPicture(pe, bgurl);
          }
          else if(mp4Status === false && webmStatus === false) {
            var bgurl = configObject.fallbackImage;
            buildHtmlVideo.buildBgPicture(pe, bgurl);
          }
          else if(mp4Status === true) {
            buildHtmlVideo.checkDeviceWidth(configObject, "mp4");
          }
          else {
            buildHtmlVideo.checkDeviceWidth(configObject, "webm");
          }
        }
        conditionsMiddleware();
      }
    }
    catch(thisErr) {
      console.error("Build HTML5 Video Function");
      console.error(thisErr);
    }
  }
  /* templates the requires video element with the url and parent element */
  buildHtmlVideo.checkDeviceWidth = function(configObject, vt) {
    var w = $(window),
        vurl = vt === "mp4" ? configObject.mp4Video : vt === "webm" ? configObject.webmVideo : false,
        pe = configObject.parentElement;

    if($(w).innerWidth() <= 767 && configObject.playInMobile === true) {
      buildHtmlVideo.templateElements(pe, vurl);
    }
    if($(w).innerWidth() <= 767 && configObject.playInMobile === false) {
      var bgurl = configObject.fallbackImage;
      buildHtmlVideo.buildBgPicture(pe, bgurl);
    }

    if($(w).innerWidth() >= 768 && $(w).innerWidth() <= 1199 && configObject.playInTablet === true) {
      buildHtmlVideo.templateElements(pe, vurl);
    }
    if($(w).innerWidth() >= 768 && $(w).innerWidth() <= 1199 && configObject.playInTablet === false) {
      var bgurl = configObject.fallbackImage;
      buildHtmlVideo.buildBgPicture(pe, bgurl);
    }

    if($(w).innerWidth() >= 1200 && configObject.playInDesktop === true) {
      buildHtmlVideo.templateElements(pe, vurl);
    }
    if($(w).innerWidth() >= 1200 && configObject.playInDesktop === false) {
      var bgurl = configObject.fallbackImage;
      buildHtmlVideo.buildBgPicture(pe, bgurl);
    }
  }
  /* builds the required html5 video elements */
  buildHtmlVideo.templateElements = function(pe, vurl) {
    var videoParent = $('<div class="videoParent"></div>'),
        videoTag = $('<video style="opacity:1;" autoplay loop muted playsinline></video>');
    
    videoTag.attr("src", vurl); 
    videoTag.appendTo(videoParent);
    videoParent.appendTo(pe);
    pe.find(".videoParent").removeClass("hiddenTransform");
  }
  /* templates the background image for the parent element */
  buildHtmlVideo.buildBgPicture = function(pe, bgurl) {
    if(bgurl !== "") {
      pe.css({
        'background': 'url(' + bgurl + ') no-repeat center center',
        'background-size': 'cover'
      });
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
        fallbackImage: "",
        playInMobile: true,
        playInTablet: true,
        playInDesktop: true,
        webmVideo: webmVideoSrc,
        mp4Video: mp4VideoSrc
      };
      buildHtmlVideo(configObject);
    }
  }

  function centralController() {
    jumbotronSection();
  }

  $(d).ready(centralController);
})(window, document, $("#appRoot"));
