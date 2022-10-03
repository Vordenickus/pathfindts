(()=>{"use strict";var t,e,i=function(){function t(){this.array=[]}return t.prototype.peek=function(){return this.array[this.array.length-1]},t.prototype.push=function(t){this.array.push(t)},t.prototype.poll=function(){var t=this.array.pop();return this.restructure(),t},t.prototype.remove=function(t){this.array=this.array.filter((function(e){return e!==t})),this.restructure()},t.prototype.restructure=function(){var t=[];this.array.forEach((function(e){t.push(e)})),this.array=t},t.prototype.size=function(){return this.array.length},t}(),r=function(){function t(){this.states=new i}return t.prototype.pushState=function(t){this.states.push(t)},t.prototype.tick=function(){this.states.peek().tick()},t.prototype.draw=function(t,e){this.states.peek().draw(t,e)},t.prototype.keyPressed=function(t){this.states.peek().keyPressed(t)},t.prototype.mouseOver=function(t){this.states.peek().mouseOver(t)},t}(),n=function(t){this.gsm=t};!function(t){t[t.BFS=0]="BFS",t[t.ASTAR=1]="ASTAR"}(t||(t={})),function(t){t[t.START=0]="START",t[t.TARGET=1]="TARGET",t[t.WALL=2]="WALL",t[t.EARTH=3]="EARTH",t[t.STONE=4]="STONE",t[t.SAND=5]="SAND",t[t.WATER=6]="WATER"}(e||(e={}));var s,o=function(){function t(t){this.area=t,this.init(),this.path=[],this.virtualArea=this.initVirtualArea()}return t.prototype.initVirtualArea=function(){for(var t=[],e=0,i=this.area.length;e<i;e++){t.push([]);for(var r=0,n=this.area[e].length;r<n;r++)t[e].push({x:r,y:e,visited:!1})}return t},t.prototype.findStartAndTarget=function(){for(var t={start:{x:0,y:0},target:{x:0,y:0}},i=!1,r=!1,n=0,s=this.area.length;n<s;n++)for(var o=0,a=this.area[n].length;o<a;o++)if(this.area[n][o].type===e.START&&(t.start.x=o,t.start.y=n,i=!0),this.area[n][o].type===e.TARGET&&(t.target.x=o,t.target.y=n,r=!0),i&&r)return t;return t},t.prototype.init=function(){var t=this.findStartAndTarget();this.start=this.area[t.start.y][t.start.x],this.target=this.area[t.target.y][t.target.x]},t}(),a=function(){function t(t,e,i,r,n){this.x=t,this.y=e,this.parent=i,this.value=null!=r?r:Number.MAX_SAFE_INTEGER,this.valueAStar=null!=n?n:Number.MAX_SAFE_INTEGER}return t.prototype.getChildren=function(i){var r=[],n=i.length-1;return this.x>0&&i[this.y][this.x-1].type!==e.WALL&&r.push(new t(this.x-1,this.y,this)),this.x<n&&i[this.y][this.x+1].type!==e.WALL&&r.push(new t(this.x+1,this.y,this)),this.y>0&&i[this.y-1][this.x].type!==e.WALL&&r.push(new t(this.x,this.y-1,this)),this.y<n&&i[this.y+1][this.x].type!==e.WALL&&r.push(new t(this.x,this.y+1,this)),r},t.prototype.getChildrenAstar=function(i,r,n){var s=[],o=i.length-1;return this.x>0&&i[this.y][this.x-1].type!==e.WALL&&s.push(new t(this.x-1,this.y,this,this.getDistance(this.x-1,this.y,i),this.computeValueAStar(i,r,n,this.x-1,this.y))),this.x<o&&i[this.y][this.x+1].type!==e.WALL&&s.push(new t(this.x+1,this.y,this,this.getDistance(this.x+1,this.y,i),this.computeValueAStar(i,r,n,this.x+1,this.y))),this.y>0&&i[this.y-1][this.x].type!==e.WALL&&s.push(new t(this.x,this.y-1,this,this.getDistance(this.x,this.y-1,i),this.computeValueAStar(i,r,n,this.x,this.y-1))),this.y<o&&i[this.y+1][this.x].type!==e.WALL&&s.push(new t(this.x,this.y+1,this,this.getDistance(this.x,this.y+1,i),this.computeValueAStar(i,r,n,this.x,this.y+1))),s},t.prototype.getDistance=function(t,i,r){var n=10;switch(r[i][t].type){case e.EARTH:n=10;break;case e.STONE:n=1;break;case e.SAND:n=30;break;case e.WATER:n=200}return this.value+n},t.prototype.computeValueAStar=function(t,e,i,r,n){return this.getDistance(r,n,t)+20*this.getHeiuristic(e,i,r,n)},t.prototype.getHeiuristic=function(t,e,i,r){return Math.sqrt((t-i)*(t-i)+(e-r)*(e-r))},t.prototype.getX=function(){return this.x},t.prototype.getY=function(){return this.y},t.prototype.getParent=function(){return this.parent},t.prototype.getValueAStar=function(){return this.valueAStar},t}(),h=(s=function(t,e){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},s(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}s(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),u=function(e){function i(t){var i=e.call(this,t)||this;return i.found=!1,i}return h(i,e),i.prototype.tick=function(){var t=this;if(!this.found){0===this.path.length&&this.path.push(new a(this.start.getX(),this.start.getY(),null));var e=this.path.shift(),i=this.area[e.getY()][e.getX()];if(i.curr=!0,i.passThrough=!0,this.virtualArea[e.getY()][e.getX()].visited=!0,e.getX()===this.target.getX()&&e.getY()===this.target.getY()&&(i.passThrough=!1,this.found=!0,this.foundNode=e),!this.found)e.getChildren(this.area).forEach((function(e){t.virtualArea[e.getY()][e.getX()].visited||(t.path.push(e),t.virtualArea[e.getY()][e.getX()].visited=!0,t.area[e.getY()][e.getX()].passThrough=!0)}));0===this.path.length&&(this.found=!1,console.log("done"))}},i.prototype.isFound=function(){return this.found},i.ALGORITHM_NAME=t.BFS,i}(o),c=function(t){return(t+1>>>1)-1},p=function(t){return 1+(t<<1)},f=function(t){return t+1<<1},l=function(){function t(t){void 0===t&&(t=function(t,e){return t>e}),this.heap=[],this.comparator=t}return t.prototype.size=function(){return this.heap.length},t.prototype.isEmpty=function(){return 0===this.heap.length},t.prototype.peek=function(){return this.heap[0]},t.prototype.push=function(){for(var t=this,e=[],i=0;i<arguments.length;i++)e[i]=arguments[i];return e.forEach((function(e){t.heap.push(e),t.shiftUp()})),this.size()},t.prototype.pop=function(){var t=this.peek(),e=this.size()-1;return e>0&&this.swap(0,e),this.heap.pop(),this.shiftDown(),t},t.prototype.replace=function(t){var e=this.peek();return this.heap[0]=t,this.shiftDown(),e},t.prototype.isGreater=function(t,e){return this.comparator(this.heap[t],this.heap[e])},t.prototype.swap=function(t,e){var i;i=[this.heap[e],this.heap[t]],this.heap[t]=i[0],this.heap[e]=i[1]},t.prototype.shiftUp=function(){for(var t=this.size()-1;t>0&&this.isGreater(t,c(t));)this.swap(t,c(t)),t=c(t)},t.prototype.shiftDown=function(){for(var t=0;p(t)<this.size()&&this.isGreater(p(t),t)||f(t)<this.size()&&this.isGreater(f(t),t);){var e=f(t)<this.size()&&this.isGreater(f(t),p(t))?f(t):p(t);this.swap(t,e),t=e}},t}(),y=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function r(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}}(),A=function(e){function i(t){var i=e.call(this,t)||this;return i.found=!1,i.index=0,i.aStarPath=new l((function(t,e){return t.getValueAStar()<e.getValueAStar()})),i}return y(i,e),i.prototype.tick=function(){var t,e=this;if(!this.found){0===this.aStarPath.size()&&this.aStarPath.push(new a(this.start.getX(),this.start.getY(),null,0,0));var i=this.aStarPath.pop(),r=this.area[i.getY()][i.getX()];if(r.curr=!0,r.passThrough=!0,r.visited=!0,this.virtualArea[i.getY()][i.getX()].visited=!0,i.getX()===(null===(t=this.target)||void 0===t?void 0:t.getX())&&i.getY()===this.target.getY()&&(r.passThrough=!1,r.curr=!1,r.visited=!1,this.found=!0,this.foundNode=i),!this.found)i.getChildrenAstar(this.area,this.target.getX(),this.target.getY()).forEach((function(t){e.virtualArea[t.getY()][t.getX()].visited||(e.aStarPath.push(t),e.area[t.getY()][t.getX()].passThrough=!0,e.virtualArea[t.getY()][t.getX()].visited=!0)}))}},i.prototype.isFound=function(){return this.found},i.ALGORITHM_NAME=t.ASTAR,i}(o),g=function(){function t(t,e,i){this.path=!1,this.passThrough=!1,this.visited=!1,this.curr=!1,this.x=t,this.y=e,this.type=i}return t.prototype.draw=function(e,i){var r=e.fillStyle;e.fillStyle=this.calculateColor(this.type),e.rect(this.x,this.y,t.WIDTH,t.HEIGHT),e.fillRect(this.x,this.y,t.WIDTH,t.HEIGHT),e.fillStyle=r},t.prototype.calculateColor=function(t){var i;switch(t){case e.START:i="#ff00ff";break;case e.TARGET:i="#ffff00";break;case e.WALL:i="#fff";break;case e.SAND:i="#8B8000";break;case e.STONE:i="#918E85";break;case e.WATER:i="#d4f1f9";break;case e.EARTH:default:i="#000"}return this.curr&&this.type!==e.START&&this.type!==e.TARGET&&(i="orange"),this.passThrough&&this.type!==e.START&&this.type!==e.TARGET&&(i="aqua"),this.visited&&this.type!==e.START&&this.type!==e.TARGET&&(i="red"),this.path&&this.type!==e.START&&this.type!==e.TARGET&&(i="green"),i},t.prototype.getX=function(){return this.x/t.WIDTH},t.prototype.getY=function(){return this.y/t.HEIGHT},t.WIDTH=20,t.HEIGHT=20,t}(),d=function(){function i(t){var i=this;this.currentType=e.WALL,this.algorithm=null,this.started=!1,this.gameArea=this.initGameArea(t),this.width=t,window.addEventListener("typechanged",(function(t){i.currentType=t.detail})),window.addEventListener("cleararea",(function(){i.clearGameArea()})),window.addEventListener("startinited",(function(t){i.algorithm=i.pickAlgorythm(t.detail.algorithmName),i.started=!0})),window.addEventListener("pathclear",(function(t){i.algorithm=null,i.started=!1,i.gameArea=i.clearPathRelated(i.gameArea)}))}return i.prototype.draw=function(t,e){for(var i=0,r=this.gameArea.length;i<r;i++)for(var n=0,s=this.gameArea[i].length;n<s;n++)this.gameArea[i][n].draw(t,e)},i.prototype.tick=function(){var t,e,i;if(void 0!==this.algorithm&&this.started&&(null===(t=this.algorithm)||void 0===t||t.tick()),null===(e=this.algorithm)||void 0===e?void 0:e.foundNode){var r=null===(i=this.algorithm)||void 0===i?void 0:i.foundNode;this.gameArea[r.getY()][r.getX()].path=!0;for(var n=r.getParent();null!==n;)this.gameArea[n.getY()][n.getX()].path=!0,n=n.getParent();this.clearIntermediate()}},i.prototype.mouseOver=function(t){var e=t.offsetX,r=t.offsetY,n=Math.floor(e/i.WIDTH),s=Math.floor(r/i.WIDTH);1!==t.buttons&&"click"!==t.type||this.changeType(n,s,this.currentType)},i.prototype.clearIntermediate=function(){for(var t=0,e=this.gameArea.length;t<e;t++)for(var i=0,r=this.gameArea[t].length;i<r;i++){var n=this.gameArea[t][i];n.curr=!1,n.passThrough=!1,n.visited=!1}},i.prototype.initGameArea=function(t){for(var r=[],n=0;n<t/i.WIDTH;n++){r.push([]);for(var s=0;s<t/i.WIDTH;s++){var o=new g(s*i.WIDTH,n*i.WIDTH,e.EARTH);r[n].push(o)}}return r},i.prototype.clearGameArea=function(){this.gameArea=this.initGameArea(this.width),this.algorithm=null;var t=new CustomEvent("areachanged",{detail:{isReady:this.isStartSet()&&this.isTargetSet()}});window.dispatchEvent(t)},i.prototype.clearPathRelated=function(t){for(var e=0;e<t.length;e++)for(var i=0;i<t[e].length;i++){var r=t[e][i];r.curr=!1,r.passThrough=!1,r.path=!1,r.visited=!1}return t},i.prototype.changeType=function(t,i,r){switch(r){case e.START:if(this.isStartSet())return;break;case e.TARGET:if(this.isTargetSet())return}this.gameArea[i][t].type=r;var n=new CustomEvent("areachanged",{detail:{isReady:this.isStartSet()&&this.isTargetSet()}});window.dispatchEvent(n)},i.prototype.isStartSet=function(){for(var t=0,i=this.gameArea.length;t<i;t++)for(var r=0,n=this.gameArea[t].length;r<n;r++)if(this.gameArea[t][r].type===e.START)return!0;return!1},i.prototype.isTargetSet=function(){for(var t=0,i=this.gameArea.length;t<i;t++)for(var r=0,n=this.gameArea[t].length;r<n;r++)if(this.gameArea[t][r].type===e.TARGET)return!0;return!1},i.prototype.pickAlgorythm=function(e){var i;switch(e){case t.ASTAR:i=new A(this.gameArea);break;case t.BFS:default:i=new u(this.gameArea)}return i},i.prototype.getArea=function(){return this.gameArea},i.WIDTH=20,i}(),v=function(){var t=function(e,i){return t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},t(e,i)};return function(e,i){if("function"!=typeof i&&null!==i)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");function r(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(r.prototype=i.prototype,new r)}}(),T=function(t){function e(e){var i=t.call(this,e)||this;return i.gameArea=new d(1e3),i}return v(e,t),e.prototype.tick=function(){this.gameArea.tick()},e.prototype.draw=function(t,e){this.gameArea.draw(t,e)},e.prototype.keyPressed=function(t){},e.prototype.mouseOver=function(t){this.gameArea.mouseOver(t)},e}(n),S=function(){function t(t){var e=this;this.canvas=document.querySelector("#"+t),this.context=this.canvas.getContext("2d"),this.width=this.canvas.width,this.height=this.canvas.height,this.gsm=new r,window.addEventListener("keypress",(function(t){e.keyPressed(t)})),this.canvas.addEventListener("mousemove",(function(t){t.preventDefault(),e.mouseOver(t)})),this.canvas.addEventListener("click",(function(t){t.preventDefault(),e.mouseOver(t)})),this.canvas.addEventListener("contextmenu",(function(t){t.preventDefault()}))}return t.prototype.start=function(){this.clear,this.gsm.pushState(new T(this.gsm)),this.loop()},t.prototype.render=function(){var t;this.context.fillStyle="#000",null===(t=this.context)||void 0===t||t.fillRect(0,0,this.width,this.height),this.gsm.draw(this.context,this.canvas)},t.prototype.tick=function(){this.gsm.tick()},t.prototype.keyPressed=function(t){this.gsm.keyPressed(t)},t.prototype.mouseOver=function(t){this.gsm.mouseOver(t)},t.prototype.loop=function(){var t=this;this.tick(),this.render(),window.requestAnimationFrame((function(){return t.loop()}))},t.prototype.clear=function(){var t;null===(t=this.context)||void 0===t||t.clearRect(0,0,this.width,this.height)},t}(),m=function(){function i(){this.currAlgorithm=t.BFS,this.startActive=!1,this.typeButtons=document.querySelectorAll("."+i.TYPE_CLASS),this.algoButtons=document.querySelectorAll("."+i.ALGO_CLASS),this.clearButton=document.querySelector("."+i.CLEAR_CLASS),this.startButton=document.querySelector("."+i.START_CLASS),this.stopButton=document.querySelector("."+i.STOP_CLASS),this.initTypeListeners(),this.initClearListener(),this.initAlgoListeners(),this.initStartButton(),this.initStopButton()}return i.prototype.initTypeListeners=function(){var t=this;this.typeButtons.forEach((function(e){e.addEventListener("click",(function(){t.clearTypeActive(),e.classList.add(i.ACTIVE_TYPE_CLASS);var r=new CustomEvent("typechanged",{detail:t.calculateCurrentType(e.id)});window.dispatchEvent(r)}))}))},i.prototype.initAlgoListeners=function(){var t=this;this.algoButtons.forEach((function(e){e.addEventListener("click",(function(){t.clearAlgoActive(),e.classList.add(i.ACTIVE_ALGO_CLASS),t.currAlgorithm=t.calculateCurrentAlgo(e.id)}))}))},i.prototype.initStartButton=function(){var t=this;window.addEventListener("areachanged",(function(e){e.detail.isReady?(t.startButton.classList.remove(i.INACTIVE_START_CLASS),t.startActive=!0):(t.startActive=!1,t.startButton.classList.add(i.INACTIVE_START_CLASS))})),this.startButton.addEventListener("click",(function(){var e=new CustomEvent("startinited",{detail:{algorithmName:t.currAlgorithm}});t.startActive&&window.dispatchEvent(e)}))},i.prototype.initStopButton=function(){var t=this;window.addEventListener("startinited",(function(){t.stopButton.classList.remove(i.INACTIVE_STOP_CLASS),console.log(t.stopButton)})),this.stopButton.addEventListener("click",(function(){if(!t.stopButton.classList.contains(i.INACTIVE_STOP_CLASS)){var e=new CustomEvent("pathclear",{});window.dispatchEvent(e),t.stopButton.classList.add(i.INACTIVE_STOP_CLASS)}}))},i.prototype.initClearListener=function(){this.clearButton.addEventListener("click",(function(){var t=new CustomEvent("cleararea",{});window.dispatchEvent(t)}))},i.prototype.clearTypeActive=function(){this.typeButtons.forEach((function(t){t.classList.remove(i.ACTIVE_TYPE_CLASS)}))},i.prototype.clearAlgoActive=function(){this.algoButtons.forEach((function(t){t.classList.remove(i.ACTIVE_ALGO_CLASS)}))},i.prototype.calculateCurrentAlgo=function(e){return"ap-astar"===e?t.ASTAR:t.BFS},i.prototype.calculateCurrentType=function(t){switch(t){case"tp-target":return e.TARGET;case"tp-wall":return e.WALL;case"tp-start":return e.START;case"tp-sand":return e.SAND;case"tp-water":return e.WATER;case"tp-stone":return e.STONE;default:return e.EARTH}},i.TYPE_CLASS="b-type-picker__cell",i.ALGO_CLASS="b-algorithm-picker__cell",i.CLEAR_CLASS="b-clear",i.START_CLASS="b-start",i.STOP_CLASS="b-stop",i.ACTIVE_TYPE_CLASS="b-type-picker__cell--active",i.ACTIVE_ALGO_CLASS="b-algorithm-picker__cell--active",i.INACTIVE_START_CLASS="b-start--inactive",i.INACTIVE_STOP_CLASS="b-stop--inactive",i}();document.addEventListener("DOMContentLoaded",(function(){var t=new S("canvas");new m;t.start()}))})();
//# sourceMappingURL=main.87f4adfdb2457e690c79.js.map