status = "";
objects = [];

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}


function draw(){
    image(video, 0, 0, 480, 380);

    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
         document.getElementById("status").innerHTML = "Status : Objects Detected";   
         document.getElementById("objects_found").innerHTML = "Number of objects detected are : " + objects.length;
      
         fill("#FF69B4");
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
         noFill();
         stroke("#FF69B4");
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    variable_name_holds_webcamLiveView.stop();
} 

function modelLoaded(){
     console.log("Model Loaded!");
     status = true;
}
