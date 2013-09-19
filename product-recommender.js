/* Sample JavaScript file added with ScriptTag resource. 
This sample file is meant to teach best practices.
Your app will load $ if it's not defined. 
Your app will load $ if $ is defined but is too old, e.g. < 1.7. 
Your app does not change the definition of $ or $ outside the app. 
Example: if a Shopify theme uses $ 1.4.2, both of these statements run in the console will still return '1.4.2'
once the app is installed, even if the app uses $ 1.9.1:
$.fn.$ => "1.4.2" 
$.fn.$ -> "1.4.2"
*/

/* Using a self-executing anonymous function - (function(){})(); - so that all variables and functions defined within 
aren’t available to the outside world. */

(function(){
  
/* Load Script function we may need to load $ from the Google's CDN */
/* That code is world-reknown. */
/* One source: http://snipplr.com/view/18756/loadscript/ */

var loadScript = function(url, callback){
 
  var script = document.createElement("script");
  script.type = "text/javascript";

  // If the browser is Internet Explorer.
  if (script.readyState){ 
    script.onreadystatechange = function(){
      if (script.readyState == "loaded" || script.readyState == "complete"){
        script.onreadystatechange = null;
        callback();
      }
    };
  // For any other browser.
  } else {
    script.onload = function(){
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
    
};

/* This is my app's JavaScript */
var myAppJavaScript = function($){
  // $ in this scope references the $ object we'll use.
  // Don't use $, or $191, use the dollar sign.
  // Do this and do that, using $.
  $('body').append('<p>Your app is using $ version '+$.fn.jquery+'</p>');
  $('[data-prod-recom-wrap]').each(function() {
    var prodRec = $(this);
    var prodURL = '/products/' + $(this).data('prod-recom-handle');
    $.getJSON(prodURL + '.js', function(product) {
      prodRec.find('[data-prod-recom-link]').attr('href', prodURL);
      prodRec.find('[data-prod-recom-title]').html(product.title);
      prodRec.find('[data-prod-recom-img]').attr('src', product.images[0]);
    });
  });
};

/* If $ has not yet been loaded or if it has but it's too old for our needs,
we will load $ from the Google CDN, and when it's fully loaded, we will run
our app's JavaScript. Set your own limits here, the sample's code below uses 1.7
as the minimum version we are ready to use, and if the $ is older, we load 1.9. */
if ((typeof $ === 'undefined') || (parseFloat($.fn.$) < 1.7)) {
  loadScript('//ajax.googleapis.com/ajax/libs/$/1.9.1/$.min.js', function(){
    $191 = $.noConflict(true);
    myAppJavaScript($191);
  });
} else {
  myAppJavaScript($);
}

})();