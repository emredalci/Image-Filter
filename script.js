var image = null;
var is_okay;
var canvas = document.getElementById("imgcanvas");
var image_gray=null;
var image_red = null;
var image_rainbow= null;
var image_special = null;
var image_blur = null;
var image_copy = null;

function loadImage(){
  var file = document.getElementById("file");
  image_gray = new SimpleImage(file);
  image_red = new SimpleImage(file);
  image_rainbow = new SimpleImage(file);
  image_special = new SimpleImage(file);
  image_blur = new SimpleImage(file);
  image_copy = new SimpleImage(file);
  image = new SimpleImage(file);
  image.drawTo(canvas);
}
function is_upload(){
  if(image == null || !image.complete()){
    is_okay = 0;
    return alert("Image is not uploaded"), is_okay;
  }
  else{
    is_okay = 1;
  }
  return is_okay;
}
function doGrayScale(){
  if(is_upload() == 1){
    for(var pixel of image_gray.values()){
      var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
      pixel.setRed(avg);
      pixel.setGreen(avg);
      pixel.setBlue(avg);
    }
    image_gray.drawTo(canvas);
  }
}
function doRed(){
  if(is_upload()==1){
    var canvas = document.getElementById("imgcanvas");
    for(var pixel of image_red.values()){
      var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
      if(avg <128){
        pixel.setRed(2*avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      }
      else{
        pixel.setRed(255);
        pixel.setGreen(2*avg-255);
        pixel.setBlue(2*avg-255);
      }
    }
    image_red.drawTo(canvas);
  }
}
function doRainbow(){
  if(is_upload()==1){
    for(var pixel of image_rainbow.values()){
      var avg = (pixel.getRed()+pixel.getGreen()+pixel.getBlue())/3;
      //Red
      if(pixel.getY()<=image_rainbow.height/7){
        if(avg<128){
          pixel.setRed(2*avg);
          pixel.setGreen(0);
          pixel.setBlue(0);
        }
        else{
          pixel.setRed(255);
          pixel.setGreen(2*avg-255);
          pixel.setBlue(2*avg-255);
        }
      }
      //Orange
      else if(pixel.getY()<=image_rainbow.height/7*2 ){
        if(avg<128){
          pixel.setRed(2*avg);
          pixel.setGreen(0.8*avg);
          pixel.setBlue(0);
        }
        else{
          pixel.setRed(255);
          pixel.setGreen(1.2*avg-51);
          pixel.setBlue(2*avg-255);
        }
      }
      //Yellow
      else if(pixel.getY()<=image_rainbow.height/7*3){
        if(avg<128){
          pixel.setRed(2*avg);
          pixel.setGreen(2*avg);
          pixel.setBlue(0);
        }
        else{
          pixel.setRed(255);
          pixel.setGreen(255);
          pixel.setBlue(2*avg-255);
        }
      }
      //Green
      else if(pixel.getY()<=image_rainbow.height/7*4){
        if(avg<128){
          pixel.setRed(0);
          pixel.setGreen(2*avg);
          pixel.setBlue(0);
        }
        else{
          pixel.setRed(2*avg-255);
          pixel.setGreen(255);
          pixel.setBlue(2*avg-255);
        }
      }
      // Blue
      else if(pixel.getY()<=image_rainbow.height/7*5){
        if(avg<128){
          pixel.setRed(0);
          pixel.setGreen(0);
          pixel.setBlue(2*avg);
        }
        else{
          pixel.setRed(2*avg-255);
          pixel.setGreen(2*avg-255);
          pixel.setBlue(255);
        }
      }
      //Indigo
      else if(pixel.getY()<=image_rainbow.height/7*6){
        if(avg<128){
          pixel.setRed(0.8*avg);
          pixel.setGreen(0);
          pixel.setBlue(2*avg);
        }
        else{
          pixel.setRed(1.2*avg-51);
          pixel.setGreen(2*avg-255);
          pixel.setBlue(255);
        }
      }
      //Violet
      else if (pixel.getY()<=image_rainbow.height){
        if(avg<128){
          pixel.setRed(1.6*avg);
          pixel.setGreen(0);
          pixel.setBlue(1.6*avg);
        }
        else{
          pixel.setRed(0.4*avg+153);
          pixel.setGreen(2*avg-255);
          pixel.setBlue(0.4*avg-153);
        }
      }
    }
    image_rainbow.drawTo(canvas);
  }
}
function doBlur(){
  if(is_upload()==1){
    for(var pixel of image_blur.values()){
      var randomNumber = Math.random();
      var x = pixel.getX();
      var y = pixel.getY();
      if(randomNumber < 0.5){
        image_blur.setPixel(x,y,pixel);
      }
      else{
        var newpix = getNearPix(x,y,image_blur);
        image_blur.setPixel(x,y,newpix);
      }
    }
    image_blur.drawTo(canvas);
  }
}
function getNearPix(x,y,image){
  var dx = Math.floor(Math.random()*11);
  var dy = Math.floor(Math.random()*11);
  var a = checkInBorder(x+dx, image.getWidth());
  var b = checkInBorder(y+dy, image.getHeight());
  return image.getPixel(a,b);
}
function checkInBorder(x,size){
  if(x<0){
    return 0;
  }
  else if(x>size-1){
    return size-1;
  }
  else{
    return x;
  }
}

function Brightness(){
  if(is_upload() == 1){
    output = new SimpleImage(image_copy.getWidth(), image_copy.getHeight());
    var scale = document.getElementById("slider").value;
    for(var pixel of image_copy.values()){
      var newPix = output.getPixel(pixel.getX(),pixel.getY());
      newPix.setRed(pixel.getRed()*scale/100);
      newPix.setGreen(pixel.getGreen()*scale/100);
      newPix.setBlue(pixel.getBlue()*scale/100);
    }
    output.drawTo(canvas);
    var value = document.getElementById("value");
    var slider = document.getElementById("slider");
    value.innerText = slider.value-100;
  }
}
function resetImage(){
  image.drawTo(canvas);
}