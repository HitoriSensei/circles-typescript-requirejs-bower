///<reference path='declarations/jquery.d.ts' />
///<reference path='declarations/sugar.d.ts' />

import $ = require('jquery');

interface BlockingObject{
    getNearestDistance(x:number,y:number):number
}

class WindowBorders implements BlockingObject{
    width: number;
    height: number;

    constructor(width:number,height:number){
        this.width = width;
        this.height = height;
    }

    getNearestDistance(x,y){
        return Math.min(Math.min(x,this.width-x),Math.min(y,this.height-y));
    }
}

class Circle implements BlockingObject{
    x: number;
    y: number;
    radius: number;

    constructor(x:number,y:number,radius:number){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    getNearestDistance(x,y){
        var xd = Math.abs(x-this.x);
        var yd = Math.abs(y-this.y);
        return Math.abs(Math.sqrt(xd*xd+yd*yd)-this.radius)
    }
}

export module app{
    export function init(){
        var mainCanvas:JQuery = $("canvas#canvas");
        var workCanvas:JQuery = $("canvas#tmpLayer");

        var $window = $(window);
        var width = $window.width();
        var height = $window.height();

        var workCanvasNode = <HTMLCanvasElement>workCanvas[0];
        var mainCanvasNode = <HTMLCanvasElement>mainCanvas[0];

        workCanvasNode.width = mainCanvasNode.width = width;
        workCanvasNode.height = mainCanvasNode.height = height;

        var mainContext:CanvasRenderingContext2D = mainCanvasNode.getContext("2d");
        var workContext:CanvasRenderingContext2D = workCanvasNode.getContext("2d");

        var objects:BlockingObject[] = [
            new WindowBorders(width, height)
        ];


        $(workCanvas).on("mousemove",(ev:JQueryMouseEventObject)=>{
            var x = ev.pageX;
            var y = ev.pageY;
            var maxSize = objects.map((o)=>{
                return o.getNearestDistance(x,y);
            }).min();

            workContext.clearRect(0,0,width,height);
            workContext.beginPath();
            //var dist = ;
            workContext.arc(x, y, maxSize,0,90);
            workContext.stroke();
            workContext.closePath();
        });

        $(workCanvas).on("click",(ev:JQueryMouseEventObject)=>{
            var x = ev.pageX;
            var y = ev.pageY;
            var maxSize = objects.map((o)=>{
                return o.getNearestDistance(x,y);
            }).min();
            objects.push(new Circle(x,y,maxSize));
            mainContext.beginPath();
            mainContext.arc(x, y, maxSize,0,90);
            mainContext.stroke();
            mainContext.closePath();
        });
    }
}