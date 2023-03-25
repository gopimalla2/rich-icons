var hasLocalStorage = function() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
};

backgroundScrollStart = function() {
  var BACKGROUND_DELAY = 14; // higher is slower
  var BACKGROUND_OFFSET = 15;
  var BACKGROUND_SCROLL_FACTOR = 3;
  var backgroundStop = .5 * BACKGROUND_OFFSET;

  var windowElem = $(window);
  var bodyElem = $('body');
  
  var xp = 0, yp = 0, loop = null, mouseX = 0, mouseY = 0, scrollY = windowElem.scrollTop(), backgroundX, backgroundY;
  
  windowElem.scroll(function(event) {
    scrollY = -windowElem.scrollTop();
    
    if (loop === null) {
      startLoop();
    }
  });
  
  $(document).mousemove(function(e){
    mouseX = e.pageX - windowElem.scrollLeft();
    mouseY = e.pageY - windowElem.scrollTop();
    if (loop === null) {
      startLoop();
    }
  });
  
  var startLoop = function() {
    loop = setInterval(function() {
      if (xp !== mouseX) {
      var offX = mouseX - xp; 
        
        if (Math.abs(offX) < backgroundStop) {
          xp = mouseX;
        } else {
          xp += offX / BACKGROUND_DELAY;
        }
      }
      
      var targetY = mouseY + scrollY * BACKGROUND_SCROLL_FACTOR;
      if (yp !== targetY) {
        var offY = targetY - yp;
      
        if (Math.abs(offY) < backgroundStop) {
          yp = targetY;
        } else {
          yp += offY / BACKGROUND_DELAY;
        }
      }

      if (xp === mouseX && yp === targetY) {
        clearInterval(loop);
        loop = null;
      }
      
      var newBackgroundX = Math.round(xp / BACKGROUND_OFFSET);
      var newBackgroundY = Math.round(yp / BACKGROUND_OFFSET);
    
      if (newBackgroundX !== backgroundX || newBackgroundY !== backgroundY) {
        backgroundX = newBackgroundX;
        backgroundY = newBackgroundY;
        bodyElem.css({ backgroundPosition: backgroundX + 'px ' + backgroundY + 'px' });
      }  
    }, 30);
  };
  
  if (hasLocalStorage()) {
    var backgroundValsJson = localStorage.getItem('backgroundVals');
  
    if (backgroundValsJson) {
      var backgroundVals = JSON.parse(backgroundValsJson);
      backgroundX = backgroundVals[0];
      backgroundY = backgroundVals[1];
      mouseX = backgroundVals[2];
      mouseY = backgroundVals[3];
      xp = backgroundVals[4];
      yp = backgroundVals[5];
      bodyElem.css({ backgroundPosition: backgroundX + 'px ' + backgroundY + 'px' });
      startLoop();
    }
    
    $(window).unload(function() {
      var backgroundValsJson = JSON.stringify([backgroundX,backgroundY, mouseX, mouseY, xp, yp]);
      localStorage.setItem('backgroundVals', backgroundValsJson);
    }); 
  }
};