'use strict';

(function () {
  window.animation = function (element, draw, duration, timingFunction, end) {
    var start = performance.now();

    var animate = function (time) {
      var timeFraction = (time - start) / duration;

      if (timeFraction > 1) {
        timeFraction = 1;
      }

      if (timeFraction < 0) {
        timeFraction = 0;
      }

      var progress = timingFunction(timeFraction);

      draw(element, progress);

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }

      if (timeFraction === 1) {
        end();
      }
    };

    requestAnimationFrame(animate);
  };
})();
