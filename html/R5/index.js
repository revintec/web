"use strict";
(function(window,document,config){
    function $(sel){
        var elem=document.querySelector(sel);
        elem.on=function(event,listener){
            this.addEventListener(event,listener);
            return this;
        };return elem;
    }
    var nowDisplaying=0;
    var d0=$(".Map").style;
    d0.width=config.map.bundle*100+"%";
    d0.height="100%";
    var divScroller=$(".Scroller");
    var d1=$(".Snap1").style;
    var d2=$(".Snap2").style;
    var maskFallback=$(".MaskFallback").style;
    var w0=$(".Bear").style;
    var w1=$(".BearParts").style;
    w0.width=w1.width=config.walkies.scalar+"%";
    w0.left=w1.left=(100-config.walkies.scalar)/2+"%";
    w0.height=w1.top=config.walkies.scalar/config.walkies.width*config.walkies.h0+"%";
    w1.height=config.walkies.scalar/config.walkies.width*config.walkies.height+"%";
    w0.backgroundSize="100% "+(config.walkies.h0+config.walkies.bundle*config.walkies.height)/config.walkies.h0*100+"%";
    w1.backgroundSize="100% "+(config.walkies.h0+config.walkies.bundle*config.walkies.height)/config.walkies.height*100+"%";
    var icPointer=$(".Pointer").style;
    icPointer.left=config.POI[0]-3+"%";
    icPointer.top=config.POI[1]-3+"%";
    var icHint=$(".Hint").style;
    var icHint2=$(".Hint2").style;
    if(config.flashinterval){
        var likeTheFirstTime=true;
        var hintTimer=setInterval(animationFunc,config.flashinterval);
    }
    function animationFunc(){
        if(!likeTheFirstTime)return clearInterval(hintTimer);
        icPointer.opacity=icHint.opacity=icHint2.opacity=1;
        setTimeout(function(){
            icPointer.opacity=icHint.opacity=icHint2.opacity=0;
        },config.flashinterval/2);
    }icPointer.opacity=icHint.opacity=icHint2.opacity=0;
    var more=$(".More");
    function HD(){
        more.style.display="none";
        document.style.backgroundImage="url(img/Loading.gif)";
        document.classList.remove("FUCK");
        if(config.sim){
            var elems=[d0,d1,d2,w0,w1,icPointer,icHint,icHint2];
            for(var i=0;i<elems.length;++i)
                elems[i].display="none";
            setTimeout(function rx(){
                var i=parseInt(Math.random()*elems.length);
                var e=elems.splice(i,1)[0];
                e.display="";
                if(elems.length)
                    setTimeout(rx,Math.random()*800);
            },Math.random()*3000);
        }if(config.fallback){
            d1.display=d2.display="none";
            maskFallback.backgroundImage="url(img/MaskFallback.png)";
            maskFallback.display="block";
        }
    }if(config.autohd)window.addEventListener("load",function(){setTimeout(HD,0);});
    setTimeout(function(elems){
        document.classList.add("FUCK");/*FallbackUserClientKitttttttttttttty*/
        if(config.probe)(function FUCK(file,tolerate){
            function returnTRUE(){return true;}
            if(config.probe==returnTRUE())return HD();
            var XHR=new XMLHttpRequest();
            XHR.open("GET",file);
            XHR.onload=HD;
            XHR.send();
            setTimeout(function(){XHR.abort();},tolerate);
        })("KCUF.bin",config.probe);
        more.on("touchend",HD);
        for(var i=0;i<elems.length;++i){
            var elem=elems[i];
            elem.transition=elem.webkitTransition="-webkit-transform 1s,opacity 1s";
        }animationFunc();
    },0,config.snapping?[d0,d1,d2,icPointer,icHint]:[icPointer,icHint]);
    function walkStep(step){
        while((step+=config.walkies.bundle)<0);
        step=parseInt(step)%config.walkies.bundle;
        var base=config.walkies.h0/(config.walkies.h0+(config.walkies.bundle-1)*config.walkies.height);
        var shift=config.walkies.height/(config.walkies.h0+(config.walkies.bundle-1)*config.walkies.height);
        w1.backgroundPosition="0% "+(base+step*shift)*100+"%";
    }walkStep(0);
    if(config.debug){
        d1.zIndex=d2.zIndex=1;
        d1.backgroundColor=d2.backgroundColor="#f00";
    }
    (function(div){
        var touch,stepping=0,stimer;
        function nativeEC(ev){
            ev=ev.changedTouches;
            if(ev.length!=1){
                // alert("nativeTS: cluttered events!");
                throw "IllegalArgumentException";
            }ev=ev[0];
            ev.offsetX=ev.pageX-div.offsetLeft;
            ev.offsetY=ev.pageY-div.offsetTop;
            return ev;
        }
        function onTouch(x,y){
            var rx=x/document.clientWidth;
            var ry=y/document.clientHeight;
            rx=parseInt(rx*100);
            ry=parseInt(ry*100);
            if(config.dumppoi)console.info(rx,ry);
            for(var i=0;i<config.POI.length/2;++i){
                var dx=rx-config.POI[i*2];
                var dy=ry-config.POI[i*2+1];
                if(dx*dx+dy*dy<=config.tolerate){
                    if(config.callback)config.callback(i);
                    else if(!config.dumppoi)alert("POI: "+i);
                    break;
                }
            }
        }
        function nativeTS(ev){
            if(!document.classList.contains("FUCK"))
                likeTheFirstTime=false;
            if(!config.unlockscrolling&&config.snapping)ev.preventDefault();
            ev=nativeEC(ev);
            if(!touch){
                touch={
                    offsetX: ev.offsetX,
                    offsetY: ev.offsetY,
                    clientX: ev.clientX,
                    clientY: ev.clientY
                };
            }else throw "IllegalStateException";
        }
        function enroll(direction){
            if(!config.warping){
                if(direction<0&&nowDisplaying+1==config.snaps.bundle)return;
                if(direction>0&&nowDisplaying===0)return;
            }
            if(direction<0)nowDisplaying=(nowDisplaying+1)%config.snaps.bundle;
            else nowDisplaying=(nowDisplaying+config.snaps.bundle-1)%config.snaps.bundle;
            d0.transform=d0.webkitTransform="translate("+(-nowDisplaying*100/config.map.bundle)+"%,0%)";
            if(!config.fallback){
                var trans="translate(0%,"+(config.snaps.base+config.snaps.scalar*config.snaps.floor)+"%)";
                d1.transform=d1.webkitTransform="rotate(-45deg) "+trans;
                d2.transform=d2.webkitTransform="rotate(+45deg) "+trans;
                if(config.snaps.alpha)d1.opacity=d2.opacity=0;
            }if(!stimer)stimer=setInterval(function(){walkStep(++stepping);},1000/config.walkies.constfps);
        }
        function nativeTM(event){
            if(!touch)return event.preventDefault();
            var ev=nativeEC(event);
            var dx,dy;
            if(config.snapping){
                dx=Math.abs(ev.clientX-touch.clientX);
                dy=Math.abs(ev.clientY-touch.clientY);
            }if(dx*dy)touch.moved=true;
            if(!document.classList.contains("FUCK")&&config.instant&&config.snapping){
                dx=ev.clientX-touch.clientX;
                if(Math.abs(dx)>config.snapping){
                    enroll(dx);
                    touch=null;
                }
            }
        }
        function nativeTE(ev){
            if(!touch)return;
            ev=nativeEC(ev);
            if(touch.moved){
                if(!document.classList.contains("FUCK")){
                    if(!config.instant&&config.snapping){
                        var dx=ev.clientX-touch.clientX;
                        if(Math.abs(dx)>config.snapping)enroll(dx);
                    }
                }
            }else onTouch(touch.offsetX+(config.snapping?nowDisplaying*divScroller.clientWidth:divScroller.scrollLeft),touch.offsetY);
            touch=null;
        }
        function nativeTC(ev){
            if(!touch)return;
            ev=nativeEC(ev);
            touch=null;
        }
        div.addEventListener("touchstart", nativeTS);
        div.addEventListener("touchmove",  nativeTM);
        div.addEventListener("touchend",   nativeTE);
        div.addEventListener("touchcancel",nativeTC);
        function transend(){
            d1.backgroundPosition=d2.backgroundPosition=nowDisplaying/(config.snaps.bundle-1)*100+"% 0%";
            var trans="translate(0%,"+(config.snaps.base+config.snaps.scalar*config.snaps.ceiling)+"%)";
            d1.transform=d1.webkitTransform="rotate(-45deg) "+trans;
            d2.transform=d2.webkitTransform="rotate(+45deg) "+trans;
            if(config.snaps.alpha)d1.opacity=d2.opacity=1;
            clearInterval(stimer);
            stimer=null;
        }if(config.snapping){
            $(".Map").on("transitionend",transend).on("webkitTransitionEnd",transend);
            divScroller.style.overflow="hidden";
            document.classList.add("Snapping");
        }else divScroller.style.overflow="scroll";
    })(document);
    function updateFrame(){
        var x=divScroller.scrollLeft;
        var cx=divScroller.clientWidth;
        var snap=x/cx+0.5;
        walkStep(snap*config.walkies.frameset*config.walkies.bundle);
        var phase=Math.cos(2*snap*Math.PI);
        var y=phase+config.snaps.shift;
        snap=parseInt(snap);
        if(y<config.snaps.ceiling)y=config.snaps.ceiling;
        var trans="translate(0%,"+(config.snaps.base+config.snaps.scalar*y)+"%)";
        d1.transform=d1.webkitTransform="rotate(-45deg) "+trans;
        d2.transform=d2.webkitTransform="rotate(+45deg) "+trans;
        if(config.snaps.alpha)d1.opacity=d2.opacity=config.snaps.alpha-phase;
        if(nowDisplaying!=snap&&y>config.snaps.floor){
            nowDisplaying=snap;
            d1.backgroundPosition=d2.backgroundPosition=nowDisplaying/(config.snaps.bundle-1)*100+"% 0%";
        }
    }
    if(!config.fallback){
        var width=50,height=config.snaps.aspect*width;
        d1.backgroundSize=d2.backgroundSize=config.snaps.bundle*100+"% 100%";
        d1.width=d2.width=width+"%";
        d1.height=d2.height=height+"%";
        d1.left=-(width-height)/2+"%";
        d2.right=-(width-height)/2+"%";
        divScroller.style.webkitMaskBoxImage="url(img/Mask.png)";
        updateFrame();
    }if(!config.snapping)divScroller.on("scroll",updateFrame);
    if(config.debug)console.info(config);
    if(config.debug)alert("OK");
    if(config.map.bundle!=config.snaps.bundle)alert("Wrong configuration:\r\nmap.bundle!=snaps.bundle");
})(window,document.querySelector("#MainMain"),(function(config){
    if(config)return config;
    var params=location.search.substring(1);
    function determine(field,defaults){
        var reg=new RegExp("\\b"+field+"(=\\d+|=false)?");
        var rel=reg.exec(params);
        if(!rel)return defaults;
        if(!rel[1])return true;
        if(rel[1]=="=false")return false;
        return parseFloat(rel[1].substring(1));
    }
    return{
        debug: determine("debug",false),
        fallback: determine("fallback",!!navigator.userAgent.match(/\bAndroid\b/)),
        instant: determine("instant",true),
        snapping: determine("snapping",!navigator.userAgent.match(/\biPhone OS (?:4|5)/)&&80),
        callback: window.showImg, tolerate:50,
        map:{bundle:6},
        snaps:{bundle:6,aspect:0.333,scalar:70,base:55,ceiling:0,floor:1.1,shift:0.3,alpha:0.5},
        walkies:{bundle:4,frameset:3,constfps:10,width:206,h0:169,height:56,scalar:30},
        dumppoi: determine("dumppoi"),
        unlockscrolling: determine("unlockscrolling"),
        warping: determine("warp"),
        flashinterval: determine("flashinterval",1800),
        autohd: determine("hd",false),
        sim: determine("sim",false),
        probe: determine("probe",100),
        POI:[
            27,25,
            66,68,
            117,61,
            173,25,
            212,40,
            260,52,
            320,62,
            376,57,
            418,60,
            463,70,
            525,63
        ]
    };
})(window.config));