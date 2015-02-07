(function(config){
    "use strict";
    (function(style){
        style.width=config.tileX+"px";
        style.height=config.tileY+"px";
    })(document.querySelector("div.ContainerMain").style);
    var touches={length:0};
    var targetTest=document.querySelector("div.TargetTest");
    function debug(){console.info(arguments);}
    function moveTarget(x,y){
        targetTest.style.left=x-targetTest.offsetWidth/2;
        targetTest.style.top=y-targetTest.offsetHeight/2;
    }
    function recalculate(rt){
        if(80<rt&&rt<350){
            targetTest.style.display="none";
            return;
        }targetTest.style.display="block";
        rt=(140-rt+360)%360;
        var cy=134;
        var cx=180-Math.cos(Math.PI*rt/180)*256;
        moveTarget(cx,cy);
    }
    function setRtAbsolute(div,dx,dy){
        div.style.backgroundPosition="-"+dx+"px -"+dy+"px";
    }
    function controller(div,config){
        var rt=-1;
        return function(abs){
            if(abs===undefined)return rt;
            var art=(abs+360*1000)%360;
            if(art!=rt){
                rt=art;
                var tile=parseInt(config.bundle*rt/360);
                var x=tile%config.tiles,y=parseInt(tile/config.tiles);
                setRtAbsolute(div,x*config.tileX,y*config.tileY);
                recalculate(rt);
            }
        };
    }
    var viewMain=document.querySelector("div.ViewMain");
    (function(style){
        style.backgroundSize=config.tileX*config.tiles+"px";
        var hd=new Image();
        hd.onload=function(){
            // DEBUG, FIXME
            setTimeout(function(){
                style.backgroundImage="url("+hd.src+")";
            },3000);
        };hd.src="image-hd.bin";
    })(viewMain.style);
    var control=controller(viewMain,config);
    setInterval(drawFrame,parseInt(1000/config.FPS));
    control(0);
    var accel=-3;
    function drawFrame(){
        if(touches.length)
            accel=-8;
        else if(accel<5) accel+=0.1;
        if(accel>0)control(control()+accel);
    }
    var containerMain=document.querySelector("div.ContainerMain");
    function nativeEC(ev){
        ev.preventDefault();
        ev=ev.changedTouches;
        if(ev.length!=1){
            alert("nativeTS: cluttered events!");
            throw "IllegalStateException";
        }ev=ev[0];
        ev.offsetX=ev.pageX-containerMain.offsetLeft;
        ev.offsetY=ev.pageY-containerMain.offsetTop;
        return ev;
    }
    function onTouch(rt,x,y){
        console.info(rt,x,y);
    }
    function nativeTS(ev){
        ev=nativeEC(ev);
        // if(ev.target.className!="ViewMain")return;
        touches[ev.identifier]={
            moved:false,
            x:ev.clientX,
            rt:control(),
            atx:0
        };++touches.length;
    }
    function nativeTM(ev){
        ev=nativeEC(ev);
        // if(ev.target.className!="ViewMain")return;
        var dx=(ev.clientX-touches[ev.identifier].x)/config.scale;
        var rt=touches[ev.identifier].rt-dx;
        control(rt);
        if((touches[ev.identifier].atx+Math.abs(dx))>=config.tolerate)
            touches[ev.identifier].moved=true;
    }
    function nativeTE(ev){
        ev=nativeEC(ev);
        if(!touches[ev.identifier].moved)
            onTouch(control(),ev.offsetX,ev.offsetY);
        delete touches[ev.identifier];
        --touches.length;
    }
    function nativeTC(ev){
        ev=nativeEC(ev);
        delete touches[ev.identifier];
        --touches.length;
    }
    viewMain.addEventListener("touchstart", nativeTS);
    viewMain.addEventListener("touchmove",  nativeTM);
    viewMain.addEventListener("touchend",   nativeTE);
    viewMain.addEventListener("touchcancel",nativeTC);
    targetTest.addEventListener("click",function(){alert("Shit!");});
})({FPS:30,scale:3,bundle:77,tolerate:3,tileX:500,tileY:295,tiles:10});