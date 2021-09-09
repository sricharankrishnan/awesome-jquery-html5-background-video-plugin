# Awesome Jquery HTML5 Background Video Plugin
![Version](https://img.shields.io/github/v/release/sricharankrishnan/awesome-jquery-html5-background-video-plugin?sort=semver)
![Open Issues](https://img.shields.io/github/issues-raw/sricharankrishnan/awesome-jquery-html5-background-video-plugin)
![Closed Issues](https://img.shields.io/github/issues-closed-raw/sricharankrishnan/awesome-jquery-html5-background-video-plugin)
![License](https://img.shields.io/github/license/sricharankrishnan/awesome-jquery-html5-background-video-plugin)
<br/><br/>

### About
A simple Jquery based Frontend Plugin that helps build a responsive HTML5 Background Video. Having a background video in websites especially in 
the first fold (AKA Jumbotron?) is a popular trend in Frontend Web Development. This plugin helps you do just that. All you have to do is download 
the required files and write some initialization code, then run it.
As this plugin is based on jquery, please ensure that you download a suitable version of jquery to help support the required functionality.
<strong>Like to see a demo of how this works? Check out the [Plugin Website](https://sricharankrishnan.github.io/awesome-jquery-html5-background-video-plugin/)</strong>
<br/><br/>

### Discussions
A discussions channel has been opened up for this plugin. If you have any questions about this particular plugin, do feel free to write in and I would do my best to help you out. You can access the discussions page by clicking on the 'Discussion' tab above or go to <https://github.com/sricharankrishnan/awesome-jquery-html5-background-video-plugin/discussions>
<br/><br/>

### Built Using
- HTML
- CSS/Sass/Less (Plugin Bundle File Options)
- Jquery
<br/><br/>

### Getting Started
Well, you first need to have the files needed to use this plugin. Follow these really simple steps one at a time and you should be ready to go.
+ The <strong>/plugin-bundle-files</strong> directory has all the required files for you to use this plugin. This is the first thing you need to know
+ The plugin requires you to have 2 types of video files, a <strong>.mp4</strong> and a </strong>.webm</strong>. This is based on my understanding of what works 
  in major browsers.
+ Make a choice for your preferred stylesheet. There are 3 variants - <strong>Sass</strong>, <strong>Less</strong> and <strong>Regular CSS</strong>. Choose 
  what suits you and download that file - <em>awesome-jquery-html5-background-video.scss</em>, <em>awesome-jquery-html5-background-video.less</em> or 
  <em>awesome-jquery-html5-background-video.css</em>
+ Next, like I said, this plugin is made with Jquery, make sure you have jquery with you in your web application
+ Then download the jquery file which is <em>awesome-jquery-html5-background-video.js</em> and have it placed in your web application as requierd with a script tag
+ Once you have these files, refresh your browser. Open your console and type <em>buildHtmlVideo</em>, press enter. If you see a function output, the it means that you're 
  installation is good and you are ready to go
+ Reminder for those of you who are using either Sass or Less - please import the file into which ever css (if need be), with the correct import syntax and path to the file 
<br/><br/>

### Configuration Object
The function that we would be calling, requires a configuration object to be passed as a parameter. Here are the details for that:

```javascript
var configObject = {
  parentElement: /* html element type - required */,
  playInMobile: /* boolean data type - required */,
  playInTablet: /* boolean data type - required */,
  playInDesktop: /* boolean data type - required */,
  webmVideo: /* path to your webm file - string type - required */,
  mp4Video: /* path to your mp4 file - string type - required */,
  callback: /* function type - optional */,
  fallbackImage: /* string type - optional - if no value place an empty string */
};
```
+ <strong>configObject.parentElement:</strong><br/>
  The HTML element that would serve as the main parent element or the root element. When you finally invoke the required function and inspect the parent element, 
  you will see that this element will be the host for the background video in your web application. <strong>Required Field</strong>

+ <strong>configObject.playInMobile, configObject.playInTablet, configObject.playInDesktop:</strong><br/>
  The HTML video will be played dynamically after the page loads, this is how this plugin works. You can configure on which devices you prefer to have the video element 
  playing. Each of these device playable fields is a Boolean data type. So, if you say configObject.playInMobile as false, then once your web app loads and if it happens 
  to be in a mobile device size, it will not play. <strong>Required Field</strong>
  Sizes:
  1. Mobile - max width of 767px
  2. IPAD/Tables - from 768px to 1199px
  3. Desktops and Larger - above 1200px

+ <strong>configObject.webmVideo:</strong><br/>
  The source path of the video file of WebM format. <strong>Required Field</strong>

+ <strong>configObject.mp4Video:</strong><br/>
  The source path of the video file of MP4 format. <strong>Required Field</strong>

+ <strong>configObject.callback:</strong><br/>
  The callback function that would be called once the video is loaded and is playing. Please note this field is optional

+ <strong>configObject.fallbackImage:</strong><br/>
  Useful in cases where you wish to have a fallback image. Some users may choose to opt for data saving modes or disable videos playing. This field with a path to an 
  image can help in those situations. Place an empty string value for this field in case you dont have any images.
<br/><br/>

### Start Coding
+ Lets do this with an example to help you understand this plugin. You'll first need a parent container html element. Lets say its a div:
  ```
  <div class="parentContainer" id="parentContainer"></div> 
  ```
+  Your parent container needs to have a height value and should be atleast positioned relative in css.
    ```
    .parentContainer {
      width: 500px;
      height: 500x;
      position: relative;
    }
    ```
+  Then lets add the video paths to this parentContainer div. This plugin will require you to have 2 types of video formats. One is the ```.mp4``` format and the other is a ```.webm```,
   please ensure you have both file types to handle any cross browser compatibilty requirements. Now lets continue with our example:
    ```
    <div class="parentContainer" id="parentContainer"
      data-mp4="/path/to/videos/example.mp4"
      data-webm="/path/to/videos/example.webm"
    ></div> 
    ```
+  Now you've placed your video paths with the help of a html5 data attribute, lets now write the needed javascript code for this:
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
+  You'll need to pass a configuration object set with certain mandatory properties. Once you've got a setup like the example shown above, call the 
    function to help build the element like so:
    ```javascript
    buildHtmlVideo(videoConfig);
    ```
+  And thats it. You've now got a background html5 video playing in your container div. Not only that, its responsive as well.
<br/><br/>

###  Keep This in Mind
When you inspect your parent element, you will see that a div class named "videoParent" is placed inside it. The z-index value of this element is at '0'. If you wish to have 
additional child divs (example, positioned as absolute), please ensure to increase the z-index as needed. Example:
```
<div class="parentContainer" id="parentContainer"
  data-mp4="/path/to/videos/example.mp4"
  data-webm="/path/to/videos/example.webm"
>
  <div class="childDiv"></div>
</div> 


.parentContainer .childDiv {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  width: 100%;
  padding: 15px;
  z-index: 10; /* this is what I'm trying to say... */
}
```
<br/><br/>

###  Support This Project
If you like this project, please help support it. This would really help encourage me to become a better developer and build more projects like this. You don't need to do so much. 
Place a star on this project and it would mean a lot to me! Inform your friends and colleagues too about this project.
Have a nice day and Happy Coding!
