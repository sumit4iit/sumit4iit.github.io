var _your_site_name = 'VirtuaCop';
 
$(document).ready(function() {
    var loadDelight = document.createElement('script');
    loadDelight.type = 'text/javascript';
    loadDelight.async = true;
    loadDelight.src =  "https://internal-cdn.amazon.com/delight.amazon.com/js/delightometer.js?v=5";
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(loadDelight, firstScript);
});