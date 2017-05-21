!function(e){function t(n){if(i[n])return i[n].exports;var s=i[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var i={};t.m=e,t.c=i,t.i=function(e){return e},t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="static/",t(t.s=2)}([function(e,t,i){"use strict";function n(e,t,i){e.set(t-1,i),e.set(t,i+2),e.set(t+1,i-1),e.set(t+1,i),e.set(t+1,i+3),e.set(t+1,i+4),e.set(t+1,i+5)}function s(e,t,i){e.set(t-1,i),e.set(t,i-1),e.set(t,i),e.set(t,i+1),e.set(t+1,i)}function r(e,t,i){e.set(t-1,i-1,0),e.set(t-1,i,0),e.set(t-1,i+1,0),e.set(t,i-1,0),e.set(t,i,0),e.set(t,i+1,0),e.set(t+1,i-1,0),e.set(t+1,i,0),e.set(t+1,i+1,0)}Object.defineProperty(t,"__esModule",{value:!0}),t.acorn=n,t.cross=s,t.erase=r},function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.MouseEventHandler=t.erase=t.cross=t.acorn=t.Renderer=t.Engine=void 0;var s=i(3),r=n(s),l=i(5),o=n(l),a=i(0),h=i(4),u=n(h);t.Engine=r.default,t.Renderer=o.default,t.acorn=a.acorn,t.cross=a.cross,t.erase=a.erase,t.MouseEventHandler=u.default},function(e,t,i){"use strict";var n=i(1);window.onload=function(){var e=document.querySelector("#universe"),t=~~(e.clientWidth/5),i=~~(e.clientHeight/5),s=new n.Engine(t,i),r=new n.Renderer(e,s,{desiredFPS:30,pixelsPerCell:5,strokeStyle:"rgba(62,134,147,0.5)",fillStyle:"rgba(104,167,179,0.5)"});(0,n.acorn)(s,~~(i/2),~~(t/4)),(0,n.acorn)(s,~~(i/2),~~(3*t/4)),(0,n.acorn)(s,0,0);new n.MouseEventHandler(e,s,r);r.start()}},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=function(){function e(t,i){n(this,e),this.width=t,this.height=i;var s=new ArrayBuffer(t*i);this._current=new Uint8Array(s);var r=new ArrayBuffer(t*i);this._next=new Uint8Array(r)}return s(e,[{key:"index",value:function(e,t){return-1===e?e=this.height-1:e===this.height&&(e=0),-1===t?t=this.width-1:t===this.width&&(t=0),e*this.width+t}},{key:"cell",value:function(e,t){return this._current[this.index(e,t)]}},{key:"next",value:function(e,t){return this._next[this.index(e,t)]}},{key:"computeNextState",value:function(){for(var e=void 0,t=0;t<this.height;t++)for(var i=0;i<this.width;i++)e=this.cell(t-1,i-1)+this.cell(t-1,i)+this.cell(t-1,i+1),e+=this.cell(t,i-1)+this.cell(t,i+1),e+=this.cell(t+1,i-1)+this.cell(t+1,i)+this.cell(t+1,i+1),this._next[t*this.width+i]=e<2||e>3?0:3===e?1:this._current[t*this.width+i];this._current.set(this._next)}},{key:"set",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;this._current[this.index(e,t)]=i}},{key:"setNext",value:function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;this._next[this.index(e,t)]=i}}]),e}();t.default=r},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=i(0),l=function(){function e(t,i,s){var r=this;n(this,e),this.canvas=t,this.engine=i,this.renderer=s,this.mouseDown=!1,this.listeners=[],this.addEvents([{eventType:"mousedown",callback:this.mouseIsDown.bind(this)},{eventType:"mouseup",callback:this.mouseIsUp.bind(this)},{eventType:"mousemove",callback:this.addCells.bind(this)},{eventType:"touchmove",callback:function(e){for(var t=0;t<e.touches.length;t++)r.addCells(e.touches[t],!0)}}])}return s(e,[{key:"addEvents",value:function(){var e=this;(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).forEach(function(t){e.listeners.push(t);var i=document;t.selector&&(i=document.querySelector(t.selector)),i.addEventListener(t.eventType,t.callback)})}},{key:"addCells",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i=this.canvas.getBoundingClientRect(),n={x:(e.clientX-i.left)/(i.right-i.left)*this.canvas.clientWidth,y:(e.clientY-i.top)/(i.bottom-i.top)*this.canvas.clientHeight},s={i:~~(n.y/this.renderer.pixelsPerCell),j:~~(n.x/this.renderer.pixelsPerCell)};(this.mouseDown||t)&&(e.ctrlKey?(0,r.erase)(this.engine,s.i,s.j):(0,r.cross)(this.engine,s.i,s.j))}},{key:"mouseIsDown",value:function(e){0===e.button&&(this.mouseDown=!0,this.addCells(e))}},{key:"mouseIsUp",value:function(e){this.mouseDown=!1}}]),e}();t.default=l},function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=function(){function e(t,i){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};n(this,e),this.canvas=t,this.context=t.getContext("2d"),this.engine=i,this.pixelsPerCell=s.pixelsPerCell||5,this.desiredFPS=s.desiredFPS||30,this.fpsNode=s.fpsNode||!1,this.strokeStyle=s.strokeStyle||"rgba(255,118,5,0.5)",this.fillStyle=s.fillStyle||"rgba(222,122,39,0.5)",this.play=!1,this.fpsTime=0,this.engineTime=0,this.fps=0,this.frameNumber=0,this.canvas.width=this.engine.width*this.pixelsPerCell,this.canvas.height=this.engine.height*this.pixelsPerCell}return s(e,[{key:"togglePlay",value:function(){this.play=!this.play}},{key:"draw",value:function(e){window.requestAnimationFrame(this.draw.bind(this)),this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.strokeStyle=this.strokeStyle,this.context.fillStyle=this.fillStyle;for(var t=0;t<this.engine.height;t++)for(var i=0;i<this.engine.width;i++)this.engine.cell(t,i)&&(this.context.strokeRect(this.pixelsPerCell*i,this.pixelsPerCell*t,this.pixelsPerCell,this.pixelsPerCell),this.context.fillRect(this.pixelsPerCell*i,this.pixelsPerCell*t,this.pixelsPerCell,this.pixelsPerCell));var n=e-this.engineTime;if(n>1e3/this.desiredFPS&&this.play&&(this.engine.computeNextState(),this.frameNumber+=1,this.engineTime=e-n%(1e3/this.desiredFPS)),this.fpsNode){var s=e-this.fpsTime;s>500&&(this.fps=1e3/s*this.frameNumber,this.fpsNode.textContent=this.fps.toFixed(2)+" FPS",this.fpsTime=e,this.frameNumber=0)}}},{key:"start",value:function(){this.engine.computeNextState(),this.play=!0,window.requestAnimationFrame(this.draw.bind(this))}}]),e}();t.default=r}]);