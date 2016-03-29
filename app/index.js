require('../css/animate.css');
require('../scss/index.scss');

var $ = require('webpack-zepto');
var Hammer = require("hammerjs");
var S;


/*slide-canvas*/
function slideCanvasShow() {
    var canvas = document.getElementById("slide-canvas");
    var context = canvas.getContext("2d");
    var width = canvas.width = window.innerWidth;
    var height = canvas.height = window.innerHeight;
    
    var particle = [];

    var particleCount = 0,
        gravity = 0.3,
        colors = [
            '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
            '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
            '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
            '#FF5722', '#795548'
        ];

    for (var i = 0; i < 300; i++) {
        particle.push({
            x: width / 2,
            y: height / 2,
            boxW: randomRange(5, 20),
            boxH: randomRange(5, 20),
            size: randomRange(2, 8),
            spikeran: randomRange(3, 5),
            velX: randomRange(-8, 8),
            velY: randomRange(-50, -10),
            angle: convertToRadians(randomRange(0, 360)),
            color: colors[Math.floor(Math.random() * colors.length)],
            anglespin: randomRange(-0.2, 0.2),
            draw: function() {
                context.save();
                context.translate(this.x, this.y);
                context.rotate(this.angle);
                context.fillStyle = this.color;
                context.beginPath();
                // drawStar(0, 0, 5, this.boxW, this.boxH);
                context.fillRect(this.boxW / 2 * -1, this.boxH / 2 * -1, this.boxW, this.boxH);
                context.fill();
                context.closePath();
                context.restore();
                this.angle += this.anglespin;
                this.velY *= 0.999;
                this.velY += 0.3;
                this.x += this.velX;
                this.y += this.velY;
                if (this.y < 0) {
                    this.velY *= -0.2;
                    this.velX *= 0.9;
                };
                if (this.y > height) {
                    this.anglespin = 0;
                    this.y = height;
                    this.velY *= -0.2;
                    this.velX *= 0.9;
                };
                if (this.x > width || this.x < 0) {
                    this.velX *= -0.5;
                };
            },
        });
    }
    r1 = {
        x: width / 2 - 150,
        y: height / 2 - 150,
        width: 300,
        height: 300,
        velX: 0,
        velY: -10,
        alphatop: 0
    };

    function drawScreen() {
        size = 50;
        pFontName = "Lucida Sans Unicode";
        context.font = size + "pt " + pFontName;
        if (r1.alphatop < 1) {
            r1.alphatop += 0.01;
        } else {
            r1.alphatop = 1;
        }
        context.globalAlpha = r1.alphatop;
        context.textAlign = 'center';
        if (r1.alphatop === 1) {
            r1.velY *= 0.999;
            r1.velY += 0.3;
            r1.x += r1.velX;
            r1.y += r1.velY;
        }
        if (r1.y + r1.height > height) {
            r1.anglespin = 0;
            r1.y = height - r1.height;
            r1.velY *= -0.8;
            r1.velX *= 0.9;
        };
        context.globalAlpha = 1;
        for (var i = 0; i < particle.length; i++) {
            particle[i].draw();
        }
    }

    function update() {
        context.clearRect(0, 0, width, height);
        drawScreen();
        requestAnimationFrame(update);
    }
    update();

    function randomRange(min, max) {
        return min + Math.random() * (max - min);
    }

    function randomInt(min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    }

    function convertToRadians(degree) {
        return degree * (Math.PI / 180);
    }

    function drawStar(cx, cy, spikes, outerRadius, innerRadius, color) {
        var rot = Math.PI / 2 * 3;
        var x = cx;
        var y = cy;
        var step = Math.PI / spikes;
        context.strokeSyle = "#000";
        context.beginPath();
        context.moveTo(cx, cy - outerRadius)
        for (i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            context.lineTo(x, y)
            rot += step
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            context.lineTo(x, y)
            rot += step
        }
        context.lineTo(cx, cy - outerRadius)
        context.closePath();
        context.fillStyle = color;
        context.fill();
    }
}

/*canvas-page*/
(function canvasDraw(){
    S = {
      init: function () {
        
        S.Drawing.init('.canvas');
        document.getElementById('canvas-page').classList.add('body--ready');

       // if(location.hash.indexOf("address") == -1) {
       //  S.UI.simulate('our|love|will|go|on|and|on|./img/heart.png');
       // } else {
       //  S.UI.simulate('2016|03|26|welcome|to|our|wedding|./img/heart.png');
       // }

        S.UI.simulate('2016|03|26|./img/heart.png');

        S.Drawing.loop(function () {
          S.Shape.render();
        });

        setTimeout(function(){
            document.getElementById('canvas-bottom-txt').className = "bottom-txt";
        }, 12000);

        setTimeout(function(){
          if(location.hash.indexOf("address") != -1) {
            document.getElementById('canvas-bottom-p-address').className = "flipInX animated";
          }
        }, 13000);

        setTimeout(function(){
          document.getElementById('canvas-bottom-em').className = "flipInX animated";
        }, 14000);


        setTimeout(function(){
          document.getElementById('canvas-bottom-power').className = "power lightSpeedIn animated";
        }, 15000);
      }
    };


    S.Drawing = (function () {
      var canvas,
          context,
          renderFn
          requestFrame = window.requestAnimationFrame       ||
                         window.webkitRequestAnimationFrame ||
                         window.mozRequestAnimationFrame    ||
                         window.oRequestAnimationFrame      ||
                         window.msRequestAnimationFrame     ||
                         function(callback) {
                           window.setTimeout(callback, 1000 / 60);
                         };

      return {
        init: function (el) {
          canvas = document.querySelector(el);
          context = canvas.getContext('2d');
          this.adjustCanvas();

          window.addEventListener('resize', function (e) {
            S.Drawing.adjustCanvas();
          });
        },

        loop: function (fn) {
          renderFn = !renderFn ? fn : renderFn;
          this.clearFrame();
          renderFn();
          requestFrame.call(window, this.loop.bind(this));
        },

        adjustCanvas: function () {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        },

        clearFrame: function () {
          context.clearRect(0, 0, canvas.width, canvas.height);
        },

        getArea: function () {
          return { w: canvas.width, h: canvas.height };
        },

        drawCircle: function (p, c) {
          context.fillStyle = c.render();
          context.beginPath();
          context.arc(p.x, p.y, p.z, 0, 2 * Math.PI, true);
          context.closePath();
          context.fill();
        }
      }
    }());


    S.UI = (function () {
      var input = document.querySelector('.ui-input'),
          ui = document.querySelector('.ui'),
          help = document.querySelector('.help'),
          commands = document.querySelector('.commands'),
          overlay = document.querySelector('.overlay'),
          canvas = document.querySelector('.canvas'),
          interval,
          isTouch = false, //('ontouchstart' in window || navigator.msMaxTouchPoints),
          currentAction,
          resizeTimer,
          time,
          maxShapeSize = 30,
          firstAction = true,
          sequence = [],
          cmd = '#';

      function formatTime(date) {
        var h = date.getHours(),
            m = date.getMinutes(),
        m = m < 10 ? '0' + m : m;
        return h + ':' + m;
      }

      function getValue(value) {
        return value && value.split(' ')[1];
      }

      function getAction(value) {
        value = value && value.split(' ')[0];
        return value && value[0] === cmd && value.substring(1);
      }

      function timedAction(fn, delay, max, reverse) {
        clearInterval(interval);
        currentAction = reverse ? max : 1;
        fn(currentAction);

        if (!max || (!reverse && currentAction < max) || (reverse && currentAction > 0)) {
          interval = setInterval(function () {
            currentAction = reverse ? currentAction - 1 : currentAction + 1;
            fn(currentAction);

            if ((!reverse && max && currentAction === max) || (reverse && currentAction === 0)) {
              clearInterval(interval);
            }
          }, delay);
        }
      }



      function performAction(value) {
        var action,
            value,
            current;

        sequence = typeof(value) === 'object' ? value : sequence.concat(value.split('|'));

        timedAction(function (index) {
          current = sequence.shift();
          action = getAction(current);
          value = getValue(current);

          switch (action) {
            case 'countdown':
              value = parseInt(value) || 10;
              value = value > 0 ? value : 10;

              timedAction(function (index) {
                if (index === 0) {
                  if (sequence.length === 0) {
                    S.Shape.switchShape(S.ShapeBuilder.letter(''));
                  } else {
                    performAction(sequence);
                  }
                } else {
                  S.Shape.switchShape(S.ShapeBuilder.letter(index), true);
                }
              }, 1000, value, true);
              break;

            case 'rectangle':
              value = value && value.split('x');
              value = (value && value.length === 2) ? value : [maxShapeSize, maxShapeSize / 2];

              S.Shape.switchShape(S.ShapeBuilder.rectangle(Math.min(maxShapeSize, parseInt(value[0])), Math.min(maxShapeSize, parseInt(value[1]))));
              break;

            case 'circle':
              value = parseInt(value) || maxShapeSize;
              value = Math.min(value, maxShapeSize);
              S.Shape.switchShape(S.ShapeBuilder.circle(value));
              break;

            case 'time':
              var t = formatTime(new Date());

              if (sequence.length > 0) {
                S.Shape.switchShape(S.ShapeBuilder.letter(t));
              } else {
                timedAction(function () {
                  t = formatTime(new Date());
                  if (t !== time) {
                    time = t;
                    S.Shape.switchShape(S.ShapeBuilder.letter(time));
                  }
                }, 1000);
              }
              break;

            default:
              if (current[0] == '.') {
                 S.ShapeBuilder.imageFile(current,S.Shape.switchShape);
              } else {
                S.Shape.switchShape(S.ShapeBuilder.letter(current));
              }
          }
        }, 3000, sequence.length);
      }


      function bindEvents() {
        
      }

      function init() {
        bindEvents();
        isTouch && document.body.classList.add('touch');
      }

      // Init
      init();

      return {
        simulate: function (action) {
          performAction(action);
        }
      }
    }());


    S.Point = function (args) {
      this.x = args.x;
      this.y = args.y;
      this.z = args.z;
      this.a = args.a;
      this.h = args.h;
    };


    S.Color = function (r, g, b, a) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    };

    S.Color.prototype = {
      render: function () {
        return 'rgba(' + this.r + ',' +  + this.g + ',' + this.b + ',' + this.a + ')';
      }
    };


    S.Dot = function (x, y) {
      this.p = new S.Point({
        x: x,
        y: y,
        z: 5,
        a: 1,
        h: 0
      });

      this.e = 0.07;
      this.s = true;

      this.c = new S.Color(255, 255, 255, this.p.a);

      this.t = this.clone();
      this.q = [];
    };

    S.Dot.prototype = {
      clone: function () {
        return new S.Point({
          x: this.x,
          y: this.y,
          z: this.z,
          a: this.a,
          h: this.h
        });
      },

      _draw: function () {
        this.c.a = this.p.a;
        S.Drawing.drawCircle(this.p, this.c);
      },

      _moveTowards: function (n) {
        var details = this.distanceTo(n, true),
            dx = details[0],
            dy = details[1],
            d = details[2],
            e = this.e * d;

        if (this.p.h === -1) {
          this.p.x = n.x;
          this.p.y = n.y;
          return true;
        }

        if (d > 1) {
          this.p.x -= ((dx / d) * e);
          this.p.y -= ((dy / d) * e);
        } else {
          if (this.p.h > 0) {
            this.p.h--;
          } else {
            return true;
          }
        }

        return false;
      },

      _update: function () {
        if (this._moveTowards(this.t)) {
          var p = this.q.shift();

          if (p) {
            this.t.x = p.x || this.p.x;
            this.t.y = p.y || this.p.y;
            this.t.z = p.z || this.p.z;
            this.t.a = p.a || this.p.a;
            this.p.h = p.h || 0;
          } else {
            if (this.s) {
              this.p.x -= Math.sin(Math.random() * 3.142);
              this.p.y -= Math.sin(Math.random() * 3.142);
            } else {
              this.move(new S.Point({
                x: this.p.x + (Math.random() * 50) - 25,
                y: this.p.y + (Math.random() * 50) - 25,
              }));
            }
          }
        }

        d = this.p.a - this.t.a;
        this.p.a = Math.max(0.1, this.p.a - (d * 0.05));
        d = this.p.z - this.t.z;
        this.p.z = 3;
        // this.p.z = Math.max(1, this.p.z - (d * 0.05));
      },

      distanceTo: function (n, details) {
        var dx = this.p.x - n.x,
            dy = this.p.y - n.y,
            d = Math.sqrt(dx * dx + dy * dy);

        return details ? [dx, dy, d] : d;
      },

      move: function (p, avoidStatic) {
        if (!avoidStatic || (avoidStatic && this.distanceTo(p) > 1)) {
          this.q.push(p);
        }
      },

      render: function () {
        this._update();
        this._draw();
      }
    }


    S.ShapeBuilder = (function () {
      var gap = 7,
          shapeCanvas = document.createElement('canvas'),
          shapeContext = shapeCanvas.getContext('2d'),
          fontSize = 500,
          fontFamily = 'Avenir, Helvetica Neue, Helvetica, Arial, sans-serif';

      function fit() {
        shapeCanvas.width = Math.floor(window.innerWidth / gap) * gap;
        shapeCanvas.height = Math.floor(window.innerHeight / gap) * gap;
        shapeContext.fillStyle = 'red';
        shapeContext.textBaseline = 'middle';
        shapeContext.textAlign = 'center';
      }

      function processCanvas() {
        var pixels = shapeContext.getImageData(0, 0, shapeCanvas.width, shapeCanvas.height).data;
            dots = [],
            pixels,
            x = 0,
            y = 0,
            fx = shapeCanvas.width,
            fy = shapeCanvas.height,
            w = 0,
            h = 0;

        for (var p = 0; p < pixels.length; p += (4 * gap)) {
          if (pixels[p + 3] > 0) {
            dots.push(new S.Point({
              x: x,
              y: y
            }));

            w = x > w ? x : w;
            h = y > h ? y : h;
            fx = x < fx ? x : fx;
            fy = y < fy ? y : fy;
          }

          x += gap;

          if (x >= shapeCanvas.width) {
            x = 0;
            y += gap;
            p += gap * 4 * shapeCanvas.width;
          }
        }

        return { dots: dots, w: w + fx, h: h + fy };
      }

      function setFontSize(s) {
        shapeContext.font = 'bold ' + s + 'px ' + fontFamily;
      }

      function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }

      function init() {
        fit();
        window.addEventListener('resize', fit);
      }

      // Init
      init();

      return {
        imageFile: function (url, callback) {
          var image = new Image(),
              a = S.Drawing.getArea();

          image.onload = function () {
            shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
            shapeContext.drawImage(this, 0, 0, a.w * 0.4, a.w * 1.375);
            callback(processCanvas());
          };

          image.onerror = function () {
            callback(S.ShapeBuilder.letter('What?'));
          }

          image.src = url;
        },

        circle: function (d) {
          var r = Math.max(0, d) / 2;
          shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
          shapeContext.beginPath();
          shapeContext.arc(r * gap, r * gap, r * gap, 0, 2 * Math.PI, false);
          shapeContext.fill();
          shapeContext.closePath();

          return processCanvas();
        },

        letter: function (l) {
          var s = 0;

          setFontSize(fontSize);
          s = Math.min(fontSize,
                      (shapeCanvas.width / shapeContext.measureText(l).width) * 0.8 * fontSize, 
                      (shapeCanvas.height / fontSize) * (isNumber(l) ? 1 : 0.45) * fontSize);
          setFontSize(s);

          shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
          shapeContext.fillText(l, shapeCanvas.width / 2, shapeCanvas.height / 2);

          return processCanvas();
        },

        rectangle: function (w, h) {
          var dots = [],
              width = gap * w,
              height = gap * h;

          for (var y = 0; y < height; y += gap) {
            for (var x = 0; x < width; x += gap) {
              dots.push(new S.Point({
                x: x,
                y: y
              }));
            }
          }

          return { dots: dots, w: width, h: height };
        }
      };
    }());


    S.Shape = (function () {
      var dots = [],
          width = 0,
          height = 0,
          cx = 0,
          cy = 0;

      function compensate() {
        var a = S.Drawing.getArea();

        cx = a.w / 2 - width / 2;
        cy = a.h / 2 - height / 2;
      }

      return {


        switchShape: function (n, fast) {
          var size,
              a = S.Drawing.getArea();

          width = n.w;
          height = n.h;

          compensate();

          if (n.dots.length > dots.length) {
            size = n.dots.length - dots.length;
            for (var d = 1; d <= size; d++) {
              dots.push(new S.Dot(a.w / 2, a.h / 2));
            }
          }

          var d = 0,
              i = 0;

          while (n.dots.length > 0) {
            i = Math.floor(Math.random() * n.dots.length);
            dots[d].e = fast ? 0.25 : (dots[d].s ? 0.14 : 0.11);

            if (dots[d].s) {
              dots[d].move(new S.Point({
                z: Math.random() * 20 + 10,
                a: Math.random(),
                h: 18
              }));
            } else {
              dots[d].move(new S.Point({
                z: Math.random() * 5 + 5,
                h: fast ? 18 : 30
              }));
            }

            dots[d].s = true;
            dots[d].move(new S.Point({
              x: n.dots[i].x + cx,
              y: n.dots[i].y + cy,
              a: 1,
              z: 5,
              h: 0
            }));

            n.dots = n.dots.slice(0, i).concat(n.dots.slice(i + 1));
            d++;
          }

          for (var i = d; i < dots.length; i++) {
            if (dots[i].s) {
              dots[i].move(new S.Point({
                z: Math.random() * 20 + 10,
                a: Math.random(),
                h: 20
              }));

              dots[i].s = false;
              dots[i].e = 0.04;
              dots[i].move(new S.Point({ 
                x: Math.random() * a.w,
                y: Math.random() * a.h,
                a: 0.3, //.4
                z: Math.random() * 4,
                h: 0
              }));
            }
          }
        },

        render: function () {
          for (var d = 0; d < dots.length; d++) {
            dots[d].render();
          }
        }
      }
    }());
}());


var page = {
    slideFlag: false,
    slideIndex: 1,
    init: function(){
        this.loading();
        this.bindTouchEvents();
        this.bindPhotoEvents();
    },
    loading: function(){
        var self = this,
            loadingPage = $('.loading-page'),
            loadingGif = loadingPage.find('img'),
            loadingStatusCtn = loadingPage.find('.loading-status'),
            percent = 0;

        function showEntry(){
            percent = 100;
            loadingStatusCtn.text(percent + '%');
            loadingStatusCtn.addClass('fadeOut');

            setTimeout(function(){
                loadingStatusCtn.text('即将开始');
                loadingStatusCtn.removeClass('fadeOut').addClass('fadeIn page-entry');
            }, 1000);
            
            setTimeout(function(){
                loadingPage.addClass('fadeOut');
                self['showSlidePage' + 1]();
            }, 2000);

            setTimeout(function(){
                loadingPage.remove();
            }, 3000);
        }

        var count = function(){
            if (percent < 99) {
                percent ++;
                loadingStatusCtn.text(percent + '%');
                setTimeout(count, 300);
            }
        };

        count();

        if (window.isPageLoaded){
            showEntry();
        }

        $(window).on("load", showEntry);


    },
    bindTouchEvents: function(){
        var self = this,
            pageList = $("#fs-page-list"),
            hammertime = new Hammer.Manager(pageList.get(0));

        hammertime.add(new Hammer.Swipe());

        hammertime.on("swipeup", function(){
            if(self.slideFlag && self.slideIndex < 5) {
                self.disableSlide();
                self.slideIndex ++;
                pageList.attr("data-index", "" + self.slideIndex);
                self['showSlidePage' + self.slideIndex] && self['showSlidePage' + self.slideIndex]();
                setTimeout(function(){
                    var lastPage = pageList.find(".page").eq(self.slideIndex-2);
                    lastPage.removeClass('page-active');
                    lastPage.find('.active').each(function(i,el){
                        var classNames = el.className;
                        $(el).removeClass().addClass(classNames.replace('In', 'Out')).removeClass('active');
                    });
                }, 1000);
            }
        });

        hammertime.on("swipedown", function(){
            if(self.slideFlag && self.slideIndex > 1) {
                self.disableSlide();
                self.slideIndex --;
                pageList.attr("data-index", "" + self.slideIndex);
                self['showSlidePage' + self.slideIndex] && self['showSlidePage' + self.slideIndex]();
                setTimeout(function(){
                    var lastPage = pageList.find(".page").eq(self.slideIndex);
                    lastPage.removeClass('page-active');
                    lastPage.find('.active').each(function(i,el){
                        var classNames = el.className;
                        $(el).removeClass().addClass(classNames.replace('In', 'Out')).removeClass('active');
                    });
                }, 1000);
            }
        });
    },
    bindPhotoEvents: function(){
        var self = this,
            photoPage = $('.photo-page'),
            photos = photoPage.find('img'),
            mask = photoPage.find('.photo-mask'),
            arrow = $("#arrow");

        photos.on("click", function(){
            var $this = $(this);

            if($this.hasClass('active')){
                $this.removeClass('active').addClass('actived');
                mask.removeClass('active');
                self.enableSlide();
            } else {
                $this.removeClass('actived').addClass('active');
                mask.addClass('active');
                self.disableSlide();
            }
        });

        mask.on("click", function(){
            $(this).removeClass('active');
            photos.filter('.active').removeClass('active').addClass('actived');
            self.enableSlide();
        });
    },
    enableSlide: function(){
        this.slideFlag = true;
        $("#arrow").addClass("active");
    },
    disableSlide: function(){
        this.slideFlag = false;
        $("#arrow").removeClass("active");
    },
    
    showSlidePage1: function() {
        var self = this,
            currentPage = $('.slide-page-1'),
            title = currentPage.find('h1'),
            poem = currentPage.find('.poem'),
            us = currentPage.find('.us'),
            city = currentPage.find('.city');

        currentPage.addClass('page-active');

        setTimeout(function() {
            title.removeClass('bounceOutDown').addClass("active bounceInDown");
        }, 1000);

        setTimeout(function() {
            city.removeClass('fadeOut').addClass("active fadeIn");
        }, 1000);

        setTimeout(function() {
            us.addClass("active");
        }, 2000);

        setTimeout(function() {
            poem.removeClass('zoomOut').addClass("active zoomIn");
        }, 3000);

        setTimeout(function() {
            self.enableSlide();
        }, 4500);
    },
    showSlidePage2: function() {
        var self = this,
            currentPage = $('.slide-page-2'),
            title = currentPage.find('h1'),
            poem = currentPage.find('.poem'),
            us = currentPage.find('.us'),
            city1 = currentPage.find('.city1'),
            city2 = currentPage.find('.city2');

        currentPage.addClass('page-active');

        setTimeout(function() {
            title.removeClass('zoomOut').addClass("active zoomIn");
        }, 2000);

        setTimeout(function() {
            city1.removeClass('slideOutUp').addClass("active slideInUp");
            city2.removeClass('slideOutDown').addClass("active slideInDown");
        }, 1000);

        setTimeout(function() {
            us.addClass("active");
        }, 3000);

        setTimeout(function() {
            title.find('.railway img').addClass('moving');

            us.find('.yy img').addClass("animated infinite wobble");
            us.find('.tt img').addClass("animated infinite pulse");

            poem.removeClass('zoomOutLeft').addClass("active zoomInLeft");
        }, 5000);

        setTimeout(function() {
            self.enableSlide();
        }, 6500);
    },
    showSlidePage3: function() {
        var self = this,
            currentPage = $('.slide-page-3'),
            title = currentPage.find('h1'),
            poem1 = currentPage.find('.poem1'),
            poem2 = currentPage.find('.poem2'),
            us = currentPage.find('.us'),
            xi = currentPage.find('.xi'),
            city = currentPage.find('.city');

        currentPage.addClass('page-active');

        setTimeout(function() {
            poem1.removeClass('fadeOutRight').addClass("active fadeInRight");
        }, 500);

        setTimeout(function() {
            poem2.removeClass('fadeOutLeft').addClass("active fadeInLeft");
        }, 1500);

        setTimeout(function() {
            city.removeClass('slideOutUp').addClass("active slideInUp");
        }, 2500);

        setTimeout(function() {
            title.removeClass('flipOutX').addClass("active flipInX");
        }, 3500);

        setTimeout(function() {
            us.removeClass('flipOutY').addClass("active flipInY");
        }, 4500);

        setTimeout(function() {
            xi.removeClass('fadeOut').addClass("active fadeIn");
        }, 5500);

        setTimeout(function() {
            slideCanvasShow();
        }, 5500);

        setTimeout(function() {
            self.enableSlide();
        }, 8000);
    },
    showSlidePage4: function() {
        var self = this;
        var photoPage = $(".photo-page");

        setTimeout(function() {
            photoPage.addClass("page-active");
        }, 1000);

        setTimeout(function() {
            self.enableSlide();
        }, 2000);
    },
    showSlidePage5: function() {
        var self = this;
        var canvasPage = $(".canvas-page");

        setTimeout(function() {
            S.init();
        }, 1000);

        setTimeout(function() {
            self.slideFlag = true;
        }, 20000);
    }
};

page.init();