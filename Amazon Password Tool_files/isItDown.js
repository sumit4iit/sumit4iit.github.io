// Is It Down? outage stripe for Password Service
(function () {
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = "https://is-it-down.amazon.com/PasswordTool/components/5358/stripe.js"
  var firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(s, firstScript);
})();