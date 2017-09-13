function collisions(obj1, obj2){
  const collX = between((obj1.x + obj1.rad), obj2.x, (obj2.x + obj2.w)) ||
     between((obj1.x - obj1.rad), obj2.x, (obj2.x + obj2.w));
  const collY = between((obj1.y + obj1.rad), obj2.y, (obj2.y + obj2.h)) ||
     between((obj1.y - obj1.rad), obj2.y, (obj2.y + obj2.h));
     if(collX && collY){
       return true;
     } else {
       return false;
     }
}

function between(val, lim1, lim2){
  if (val >= lim1 && val <= lim2){
    return true;
  }
  return false;
}






module.exports = collisions;
