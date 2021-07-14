status = "";

siren = "";

objects = [];



function preload(){

    siren = loadSound("Air-raid-siren.mp3");

}



function setup(){
    
    canvas = createCanvas(380, 380);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    objectDetection = ml5.objectDetector("cocossd", modelLoaded);

    document.getElementById("status").innerHTML = "Status: Detecting Baby......";
}


function modelLoaded(){
    console.log("cocossd is initialized!!!");

    status = 'true';
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status != ""){   
        
        objectDetection.detect(video, gotResults);
        document.getElementById('status').innerHTML = "Object Detected!!";
    
        for(i = 0; i < objects.length; i++){
    
            r = random(255);
            g = random(255);
            b = random(255);
    
            fill(r,g,b);
            confidence = floor(objects[i].confidence * 100);
            text(objects[i].label +" "+ confidence + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == 'person'){
                document.getElementById("baby_status").innerHTML = "Baby Found!!";
                siren.stop();
            }
            else{
                document.getElementById("baby_status").innerHTML = "⚠️⚠️!BABY NOT FOUND!⚠️⚠️";
                siren.play();
            }
        }
        
        if(objects.length == 0){
            document.getElementById("baby_status").innerHTML = "⚠️⚠️!BABY NOT FOUND!⚠️⚠️";
            siren.play();
        }
    }

} 


function gotResults(error, results){

    if(error){
        console.log(error);
    }
    else{ 

        console.log(results);
        objects = results

                
    }

}


