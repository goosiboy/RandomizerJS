'use strict';

let Randomizer = {
    positionArray: [],
    MENU_1_ACTIVE: false,
    MENU_2_ACTIVE: false,
    MENU_3_ACTIVE: false,
    initRandomizer: function() {
        Randomizer.pushToPositionArray(0);
        Randomizer.pushToPositionArray(120);
        Randomizer.pushToPositionArray(230); 
        console.log("Randomizer initialized");
    },
    startRandomizer: function(param) {
        let arrow = null;
        let initialOffset = null;

        if(this.positionArray.length === 0) {
            Randomizer.initRandomizer();
        }
        
        if(null != param) {
            switch(param) {
                case Consts.MENU_1:
                    if(!this.MENU_1_ACTIVE) {
                        arrow = document.querySelector('#arrow1');
                        initialOffset = Randomizer.offSet(arrow);                   
                        Randomizer.initAnimation(initialOffset, arrow.id, Consts.MENU_1);
                    }
                break;
                case Consts.MENU_2:
                    if(!this.MENU_2_ACTIVE) {
                        arrow = document.querySelector('#arrow2');
                        initialOffset = Randomizer.offSet(arrow);                    
                        Randomizer.initAnimation(initialOffset, arrow.id, Consts.MENU_2);
                    }
                break;
                case Consts.MENU_3:
                    if(!this.MENU_3_ACTIVE) {
                        arrow = document.querySelector('#arrow3');
                        initialOffset = Randomizer.offSet(arrow);                   
                        Randomizer.initAnimation(initialOffset, arrow.id, Consts.MENU_3);
                    }
                break;
            }
        }
    },
    offSet: function (el) {
	    var rect = el.getBoundingClientRect(),
	    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
	    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    },
    initAnimation: function (initialOffset, arrowId, menuId) {
        console.log("[DEBUG] Randomizer start");
        let configObject = {
            elem: document.getElementById(arrowId),
            pos: Randomizer.positionArray[0],
            id: setInterval(frame, 10),
            RANDOM_NUM: Math.floor(Math.random() * 20) + 7,
            CURRENT_NUM: 0,
            speed1: 5,
            speed2: 6,
            lastPosition: Randomizer.positionArray[0],
            firstPosition: Randomizer.positionArray[0]
        }
        let elem = document.getElementById(arrowId);   
        let pos = Randomizer.positionArray[0];
        let id = setInterval(frame, 10);
        let RANDOM_NUM = Math.floor(Math.random() * 20) + 7;
        let CURRENT_NUM = 0;
        let speed1 = 5;
        let speed2 = 6;
        let lastPosition = Randomizer.positionArray[0];
        let firstPosition = Randomizer.positionArray[0];
        function frame() {
            runAnimation(menuId);
        }
        console.log("[DEBUG] Randomizer stop");
    },
    runAnimation: function(menuId) {
        if(menuId === Consts.MENU_1) {
            this.MENU_1_ACTIVE = true;
            if(CURRENT_NUM <= RANDOM_NUM) {
                if(lastPosition == Randomizer.positionArray[0]) {
                    pos += speed1;
                    elem.style.left = pos + "px"; 
                    if(pos >= Randomizer.positionArray[1]) {
                        lastPosition = Randomizer.positionArray[1];
                        CURRENT_NUM++;
                    }
                } else if(lastPosition == Randomizer.positionArray[1]) {
                    pos -= speed1;
                    elem.style.left = pos + "px"; 
                    if(pos <= Randomizer.positionArray[0]) {
                        lastPosition = Randomizer.positionArray[0];
                        CURRENT_NUM++;
                    }
                }
            } else {
                clearInterval(id);
                this.MENU_1_ACTIVE = false;
            }
        } else {
            if(CURRENT_NUM <= RANDOM_NUM) {
                if(lastPosition == Randomizer.positionArray[0]) {
                    pos += speed2;
                    elem.style.left = pos + "px"; 
                    if(pos >= Randomizer.positionArray[1]) {
                        lastPosition = Randomizer.positionArray[1];
                        firstPosition = Randomizer.positionArray[0];
                        CURRENT_NUM++;
                    }
                } else if(lastPosition == Randomizer.positionArray[1] && firstPosition == Randomizer.positionArray[0]) {
                    pos += speed2;
                    elem.style.left = pos + "px"; 
                    if(pos >= Randomizer.positionArray[2]) {
                        lastPosition = Randomizer.positionArray[2];
                        firstPosition = Randomizer.positionArray[1];
                        CURRENT_NUM++;
                    }
                } else if(lastPosition == Randomizer.positionArray[2] && firstPosition == Randomizer.positionArray[1]) {
                    pos -= speed2;
                    elem.style.left = pos + "px"; 
                    if(pos <= Randomizer.positionArray[1]) {
                        lastPosition = Randomizer.positionArray[1];
                        firstPosition = Randomizer.positionArray[2];
                        CURRENT_NUM++;
                    }
                } else if(lastPosition == Randomizer.positionArray[1] && firstPosition == Randomizer.positionArray[2]) {
                    pos -= speed2;
                    elem.style.left = pos + "px"; 
                    if(pos <= Randomizer.positionArray[0]) {
                        lastPosition = Randomizer.positionArray[0];
                        firstPosition = Randomizer.positionArray[1];
                        CURRENT_NUM++;
                    }
                } 
            } else {
                clearInterval(id);
            }
        }  
    },
    pushToPositionArray: function(positionX) {
        this.positionArray.push(positionX);
    }
}
