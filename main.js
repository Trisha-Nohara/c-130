song="";
leftWrist_x=0;
rightWrist_x=0;
leftWrist_y=0;
rightWrist_y=0;
score_leftwrist=0;
score_rightwrist=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotposes);

}

function modelLoaded(){
    console.log("poseNet model is initialized");
}

function gotposes(results){
    if(results.length>0){
        console.log(results);
        
        score_leftwrist=results[0].pose.keypoints[9].score;
        console.log("score_leftwrist= "+score_leftwrist);

        score_rightwrist=results[0].pose.keypoints[10].score;
        console.log("score_rightwrist= "+score_rightwrist);

        rightWrist_x=results[0].pose.rightWrist.x;
        rightWrist_y=results[0].pose.rightWrist.y;
        console.log("rightWrist_x= "+rightWrist_x+" ,rightWrist_y= "+rightWrist_y);

        leftWrist_x=results[0].pose.leftWrist.x;
        leftWrist_y=results[0].pose.leftWrist.y;
        console.log("leftWrist_x= "+leftWrist_x+" ,leftWrist_y= "+leftWrist_y);
    }
}

function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    if(score_leftwrist>0.2){
    circle(leftWrist_x,leftWrist_y,20);
    no_leftwristY= Number(leftWrist_y);
    remove_decimal_y= floor(no_leftwristY);
    volume= remove_decimal_y/500;
    document.getElementById("volume").innerHTML="volume= "+volume;
    song.setVolume(volume);
}
    if(score_rightwrist>0.2){
        circle(rightWrist_x,rightWrist_y,20);
        if(rightWrist_y>0 && rightWrist_y<=100){
            document.getElementById("speed").innerHTML="speed= 0.5x";
            song.rate(0.5);
        }
        else if(rightWrist_y>100 && rightWrist_y<=200){
            document.getElementById("speed").innerHTML="speed= 1.0x";
            song.rate(1);
        }
        else if(rightWrist_y>200 && rightWrist_y<=300){
            document.getElementById("speed").innerHTML="speed= 1.5x";
            song.rate(1.5);
        }
        else if(rightWrist_y>300 && rightWrist_y<=400){
            document.getElementById("speed").innerHTML="speed= 2.0x";
            song.rate(2);
        }
        else{
            document.getElementById("speed").innerHTML="speed= 2.5x";
            song.rate(2.5);
        }
    }
}

function preload(){
    song=loadSound("music.mp3");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}