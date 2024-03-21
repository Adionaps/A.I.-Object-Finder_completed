Objects=[]
status1=""
function preload(){
 

}

function setup(){
Canvas=createCanvas(480,380)
Canvas.center()
camera=createCapture(VIDEO)
camera.size(480,380)
camera.hide()
}

function draw(){
image(camera,0,0,480,380)
if(status1 != ""){
    objectDetector.detect(camera,gotResult)
    for(i=0;i<Objects.length;i++){
        document.getElementById("status").innerHTML="status: Object Detected"
        document.getElementById("no_of_obj").innerHTML="No. of Objects Detected are: "+Objects.length
        fill("red")
        percent=floor(Objects[i].confidence*100)
        text(Objects[i].label+" "+percent+"%",Objects[i].x,Objects[i].y)
        noFill()
        stroke("#FF0000")
        rect(Objects[i].x,Objects[i].y,Objects[i].width,Objects[i].height)

        if(Objects[i].label==Object_name){
            document.getElementById("status").innerHTML=Object_name+" found"
            synth=window.speechSynthesis
            utter=new SpeechSynthesisUtterance(Object_name+"found")
            synth.speak(utter)

        }
        else{
            document.getElementById("status").innerHTML=Object_name+" Not found"
        }
            }
}

}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="status : detecting objects: "
    Object_name=document.getElementById("Objectname").value
}

function modelLoaded(){
    console.log("modelLoaded")
    status1=true


}

function gotResult(error,results){
if(error){
    console.log(error)
}
console.log(results)
Objects=results
}