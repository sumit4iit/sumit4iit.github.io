(function($) {

var delightApp = {
  delightHost: 'https://delight.amazon.com/',

  createWidget: function() {
    this.widget = $('<div/>')
      .appendTo(this.root)
      .hide()
      .css({
        position: 'absolute',
        width: 340,
        'background-color': 'white',
        border: 'solid 1px #C2DDF2',
        'border-radius': 6,
        '-moz-border-radius': 6,
        '-webkit-border-radius': 6,
        'box-shadow': '3px 3px 15px 0 rgba(0, 0, 0, 0.8)',
        '-moz-box-shadow': '3px 3px 15px 0 rgba(0, 0, 0, 0.8)',
        '-webkit-box-shadow': '3px 3px 15px 0 rgba(0, 0, 0, 0.8)',
        'z-index': 1000
      }).position({
        my: 'right top',
        at: 'right bottom',
        of: this.button,
        collision: 'fit none',
        offset: '0 8'
      });

    // Add title bar
    this.widget.append(
      $('<div/>').css({
        padding: 4,
        color: '#333333',
        'background-color': '#EAF3FE',
        'border-bottom': 'solid 1px #C2DDF2',
        padding: '8px 12px'
      })
      .append(
        $('<span/>').css({
          'font-size': 14,
          'font-weight': 'bold',
        })
        .text('How are we doing?')
      )
      .append(
        $('<a/>').css({
          float: 'right',
          'font-size': 12,
          color: '#146EB4'
        })
        .attr({
          href: '#'
        })
        .text('Close')
        .append(
          $('<span/>').css({
            background: 'url("//internal-cdn.amazon.com/dtux.amazon.com/images/sprite-popover.png") no-repeat scroll 0 -136px #EAF3FE',
            display: 'inline-block',
            height: 15,
            'margin-left': 4,
            overflow: 'hidden',
            position: 'relative',
            'vertical-align': 'bottom',
            width: 15,
          })
        )
        .click( function() {
          delightApp.widget.hide();
          return false;
        })
      )
    );

    // Create options
    this.options = $('<div/>').css({
        width: 315,
        margin: '12px auto 0px'
      })
      .appendTo(delightApp.widget);
    if (typeof _your_site_name == 'string') {
        this.options.html("<div><strong>Tell us how you're feeling about " + _your_site_name + "</strong></div>")
    } else {
        this.options.html("<div><strong>Tell us how you're feeling</strong></div>")
    }

    this.thankYouMessage = $('<div/>')
      .hide()
      .css({
        padding: 12,
      })
      .append(
        $('<span/>').css({
          'font-weight' : 'bold',
          'font-size': 14,
          color: '#333333'
        })
        .text('Thank You! We appreciate your feedback.')
      )
      .appendTo(delightApp.widget);

    var contactUrlBase = 'https://issues.amazon.com/issues/create?assignedFolder=55931db0-49a4-4545-8889-778be19615fc'
    var contactUrl = contactUrlBase + '&description=Problem clicking delight on URL ' + window.location.href
    var contactLink = '<a style="color: #146EB4;" href="' + contactUrl + '">here</a>'

    this.errorMessage = $('<div/>')
      .hide()
      .append(
        $('<p/>').css({
          width: 315,
          margin: '24px auto 12px',
          'font-size': 20
        }).text('Delight error!')
      )
      .append(
        $('<p/>')
          .css('margin', 10)
          .html('There was a problem providing feedback.  Either this site has not been configured properly, or there is a problem with the feedback system.  Please contact the delight.amazon.com maintainers ' + contactLink)
          // TODO : Maybe give delight.amazon.com its own contact queue?
      )
      .appendTo(delightApp.widget);

    function capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    $.each(['delighted', 'satisfied', 'disappointed'], function(index, option) {
      delightApp.options.append(
        $('<figure/>' )
          .addClass('delight-option')
          .css({
            width: 85,
            margin: 10,
            float: 'left',
            cursor: 'pointer'
          }).append(
            $('<div/>')
              .css({
                width: 64,
                height: 64,
                margin: '0px auto 6px',
                display: 'block',
               'background-image': 'url(' + delightApp.imageUrl('delight-sprite') + ')',
               'background-position': '-' + (index * 64 + (index) * 2) + 'px -19px'
              }).attr({
                title: option
              })
          ).append(
            $('<figcaption/>').css({
              'font-size': 12,
              color: '#333333',
              'text-align': 'center',
              'font-weight': 'bold'
              })
              .text(capitalize(option))
          ).click( function() {
            delightApp.submitFeedback(option);
            return false;
          })
      );
    });
  },

  install: function() {
    // If jQuery isn't loaded, wait and try again
    if (typeof jQuery == 'undefined' ) {
      setTimeout(this.install, 200);
      return false;
    }

    // Now we know that we have jquery ready, load jquery.ui.position
    // Unless it is already loaded, in which case, try to use the user provided version
    if ( typeof jQuery.ui == 'undefined' || typeof jQuery.ui.position == 'undefined') {
      // TODO : Move this out of the delight.js.erb, and pull it in as a partial or something
      /*
       * jQuery UI Position 1.8.18
       *
       * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
       * Dual licensed under the MIT or GPL Version 2 licenses.
       * http://jquery.org/license
       *
       * http://docs.jquery.com/UI/Position
       */
      (function(a,b){a.ui=a.ui||{};var c=/left|center|right/,d=/top|center|bottom/,e="center",f={},g=a.fn.position,h=a.fn.offset;a.fn.position=function(b){if(!b||!b.of)return g.apply(this,arguments);b=a.extend({},b);var h=a(b.of),i=h[0],j=(b.collision||"flip").split(" "),k=b.offset?b.offset.split(" "):[0,0],l,m,n;i.nodeType===9?(l=h.width(),m=h.height(),n={top:0,left:0}):i.setTimeout?(l=h.width(),m=h.height(),n={top:h.scrollTop(),left:h.scrollLeft()}):i.preventDefault?(b.at="left top",l=m=0,n={top:b.of.pageY,left:b.of.pageX}):(l=h.outerWidth(),m=h.outerHeight(),n=h.offset()),a.each(["my","at"],function(){var a=(b[this]||"").split(" ");a.length===1&&(a=c.test(a[0])?a.concat([e]):d.test(a[0])?[e].concat(a):[e,e]),a[0]=c.test(a[0])?a[0]:e,a[1]=d.test(a[1])?a[1]:e,b[this]=a}),j.length===1&&(j[1]=j[0]),k[0]=parseInt(k[0],10)||0,k.length===1&&(k[1]=k[0]),k[1]=parseInt(k[1],10)||0,b.at[0]==="right"?n.left+=l:b.at[0]===e&&(n.left+=l/2),b.at[1]==="bottom"?n.top+=m:b.at[1]===e&&(n.top+=m/2),n.left+=k[0],n.top+=k[1];return this.each(function(){var c=a(this),d=c.outerWidth(),g=c.outerHeight(),h=parseInt(a.css(this,"marginLeft",!0))||0,i=parseInt(a.css(this,"marginTop",!0))||0,o=d+h+(parseInt(a.css(this,"marginRight",!0))||0),p=g+i+(parseInt(a.css(this,"marginBottom",!0))||0),q=a.extend({},n),r;b.my[0]==="right"?q.left-=d:b.my[0]===e&&(q.left-=d/2),b.my[1]==="bottom"?q.top-=g:b.my[1]===e&&(q.top-=g/2),f.fractions||(q.left=Math.round(q.left),q.top=Math.round(q.top)),r={left:q.left-h,top:q.top-i},a.each(["left","top"],function(c,e){a.ui.position[j[c]]&&a.ui.position[j[c]][e](q,{targetWidth:l,targetHeight:m,elemWidth:d,elemHeight:g,collisionPosition:r,collisionWidth:o,collisionHeight:p,offset:k,my:b.my,at:b.at})}),a.fn.bgiframe&&c.bgiframe(),c.offset(a.extend(q,{using:b.using}))})},a.ui.position={fit:{left:function(b,c){var d=a(window),e=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft();b.left=e>0?b.left-e:Math.max(b.left-c.collisionPosition.left,b.left)},top:function(b,c){var d=a(window),e=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop();b.top=e>0?b.top-e:Math.max(b.top-c.collisionPosition.top,b.top)}},flip:{left:function(b,c){if(c.at[0]!==e){var d=a(window),f=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft(),g=c.my[0]==="left"?-c.elemWidth:c.my[0]==="right"?c.elemWidth:0,h=c.at[0]==="left"?c.targetWidth:-c.targetWidth,i=-2*c.offset[0];b.left+=c.collisionPosition.left<0?g+h+i:f>0?g+h+i:0}},top:function(b,c){if(c.at[1]!==e){var d=a(window),f=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop(),g=c.my[1]==="top"?-c.elemHeight:c.my[1]==="bottom"?c.elemHeight:0,h=c.at[1]==="top"?c.targetHeight:-c.targetHeight,i=-2*c.offset[1];b.top+=c.collisionPosition.top<0?g+h+i:f>0?g+h+i:0}}}},a.offset.setOffset||(a.offset.setOffset=function(b,c){/static/.test(a.css(b,"position"))&&(b.style.position="relative");var d=a(b),e=d.offset(),f=parseInt(a.css(b,"top",!0),10)||0,g=parseInt(a.css(b,"left",!0),10)||0,h={top:c.top-e.top+f,left:c.left-e.left+g};"using"in c?c.using.call(b,h):d.css(h)},a.fn.offset=function(b){var c=this[0];if(!c||!c.ownerDocument)return null;if(b)return this.each(function(){a.offset.setOffset(this,b)});return h.call(this)}),function(){var b=document.getElementsByTagName("body")[0],c=document.createElement("div"),d,e,g,h,i;d=document.createElement(b?"div":"body"),g={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},b&&a.extend(g,{position:"absolute",left:"-1000px",top:"-1000px"});for(var j in g)d.style[j]=g[j];d.appendChild(c),e=b||document.documentElement,e.insertBefore(d,e.firstChild),c.style.cssText="position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;",h=a(c).offset(function(a,b){return b}).offset(),d.innerHTML="",e.removeChild(d),i=h.top+h.left+(b?2e3:0),f.fractions=i>21&&i<22}()})(jQuery);
    }

    this.root = $('#delight').css({
      'padding-top': 3,
      'padding-left': 4,
      width: 41
    });

    // Place the delight button
    this.button = $('<div/>')
      .css({
          cursor: 'pointer',
          height: 17,
          width: 37,
          'background-image': 'url(' + this.imageUrl('delight-sprite') + ')'
      })
      .appendTo(this.root)
      .one('click', $.proxy(this.createWidget, this))
      .click(function(evt) {
        // When the delight button is pressed, move the delight widget into place
        // just below and to the left of the link
        delightApp.widget.toggle();
        if (delightApp.widget.is(':visible')) {
          delightApp.widget.position({
            my: 'right top',
            at: 'right bottom',
            of: this.button,
            collision: 'fit none',
            offset: '0 8'
          })
        }
        return false;
      });
  },
  imageUrl: function(option) {
    return 'https://internal-cdn.amazon.com/delight.amazon.com/images/' + option + '.png';
  },
  submitFeedback: function(feeling) {
    if (delightApp.options.hasClass('in-progress')) {
      return;
    }
    delightApp.options.addClass('in-progress')
           .css('opacity', 0.4);
    delightApp.widget.find('.delight-option').css('pointer','');

    var url = delightApp.delightHost + 'respond';

    var data = {
      format: 'json',
      method: '_post',
      feedback: {
        feeling: feeling,
        url: window.location.href
      }
    };

    // For sites with multiple base URLs, allow specifying the site ID instead
    // of using the hostname.
    if(typeof _your_site_name == 'string') {
      data["site_id"] = _your_site_name;
    } else {
      data["host"] = window.location.host;
    }

    $.ajax({
      traditional: false,
      type: 'GET',
      url: url,
      dataType: 'jsonp',
      timeout: 10000,
      data: data,
      crossDomain: true,
      success: function(response) {
        delightApp.options.hide();
        delightApp.thankYouMessage.show();
        if (typeof response.contact_url != 'undefined') {
          delightApp.showContactMessage(response.contact_url);
        }
      },
      error: function(jqXHR, response, exceptionThrown) {
        delightApp.options.hide();
        delightApp.errorMessage.show();
      }
    });
  },
  showContactMessage: function(href) {
    var contactMessage = $('<div/>')
    .css({
      'font-size': 12,
      color: '#666666',
      'font-style': 'italic',
      'line-height': 1.2
    })
    .html(
      'If you are having a problem and need assistance, or if you want to give us more detailed feedback, be sure to <a style="color: #146EB4;" href="' + href + '">contact&nbsp;us</a>.'
    )
    .appendTo(delightApp.thankYouMessage);
  }
};

$(document).ready(function() {
  delightApp.install();
});

})(jQuery);
