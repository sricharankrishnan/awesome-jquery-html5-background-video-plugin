# HTML5 Background Video Builder
This is a simple jquery based plugin that helps in building a responsive background html5 video. Placing background videos in the first fold section 
or any other place is a common and popular trend in website. This plugin helps simply the process. You'll just need to download the required files, 
place them in your web app as need, write some intialization code and run it.

As this plugin is based on jquery, please ensure that you download a suitable version of jquery to help support the required functionality.

## Get Started by Downloading the Files
First, get the needed files for this plugin. You'll need to use the javascript file and a stylesheet.
<a href="https://github.com/sricharankrishnan/html5-background-video-builder/tree/master/plugin-bundle-files">Click Here</a> to go to the files section. 
Then, download the ```html5-video-builder.js``` file and integrate it with a script tag. The stylesheets are in either **.scss** or **.css**, choose which ever is preferred, download it 
and then integrate it either through Sass based imports or a CSS stylesheet link tag.

Next, check if you have got things right. Refresh your browser, open the console and type ```buildHtmlVideo```, if you see a function type output, it means 
that you've done the installation and integration properly.

## Start Coding
1.  Lets do this with an example to help you understand this plugin. You'll first need a parent container html element. Lets say its a div:
    ```
    <div class="parentContainer" id="parentContainer"></div> 
    ```

2.  Your parent container needs to have a height value and should be atleast positioned relative in css.
    ```
    .parentContainer {
      width: 500px;
      height: 500x;
      position: relative;
    }
    ```

3.  Then lets add the video paths to this parentContainer div. This plugin will require you to have 2 types of video formats. One is the ```.mp4``` format and the other is a ```.webm```,
    please ensure you have both file types to handle any cross browser compatibilty requirements. Now lets continue with our example:
    ```
    <div class="parentContainer" id="parentContainer"
      data-mp4="/path/to/videos/example.mp4"
      data-webm="/path/to/videos/example.webm"
    ></div> 
    ```

4.  Now you've placed your video paths with the help of a html5 data attribute, lets now write the needed javascript code for this:
    ```javascript
      var pe = $("#parentContainer");
      var videoConfig = {
        parentElement: pe,
        playInMobile: true,
        playInTablet: true,
        playInDesktop: true,
        webmVideo: pe.attr("data-webm"),
        mp4Video: pe.attr("data-mp4"),
        callback: function() {
          console.log("Build complete");
        },
        fallbackImage: ""
      };
    ```

5.  You'll need to pass a configuration object set with certain mandatory properties. Once you've got a setup like the example shown above, call the 
    function to help build the element like so:
    ```javascript
    buildHtmlVideo(videoConfig);
    ```

6.  And thats it. You've now got a background html5 video playing in your container div. Not only that, its responsive as well.

## The Config Object
The config object that needs to be passed as an argument has the following details and properties:
1.  parentElement: **[required]** - this is the parent element inside of which you would need to have the plugin place the html5 video

2.  playInMobile, playInTablet, playInDesktop: **[required]** - these are all boolean types. Specifies the device size ranges in which you would need to have the video playing on the intial load.
    Does not get triggered on page resize. Mobile is considered max width upto 767px, Tablet is considered between 768px and 1199px width, Desktop is 1200px and above.

3.  webmVideo: **[required]** - this is the source/path of the webm file type of the video

4.  mp4Video: **[required]** - this is the source/path of the mp4 file type of the video

5.  callback: this is optional, specifying a callback function that needs to be called once the html elements are placed inside the parent element.

6.  fallbackImage: this is optional, this is the path to a background fallbackImage that would be placed. This is triggered when a user views your webapp from a device for which 
    the background video is disabled.

## Support This Project
If you like this project, please help support it. This would really help encourage me to become a better developer and build more projects like this. You don't need to do so much. 
Place a star on this project and it would mean a lot to me!

Have a nice day and Happy Coding!
