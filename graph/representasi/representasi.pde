void setup(){
  size(640, 360);
  background(51);
  for(int i = 0; i <200; i++){
    float x = random(width);
    float y = random(height);
    float red = random(100, 255);
    float blue = random(100, 255);
    noStroke();
    fill(red, 0, blue);
    ellipse(x, y, 16, 16);
  }
  save("image.png");
  exit();
}
