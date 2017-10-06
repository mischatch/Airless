function collisions(obj1, obj2){

  const collisionX = between((obj1.x + obj1.rad), obj2.x, (obj2.x + obj2.w)) ||
                     between((obj1.x - obj1.rad), obj2.x, (obj2.x + obj2.w));
  const collisionY = between((obj1.y + obj1.rad), obj2.y, (obj2.y + obj2.h)) ||
                     between((obj1.y - obj1.rad), obj2.y, (obj2.y + obj2.h));

  if(collisionX && collisionY){
   return true;
  } else {
   return false;
  }
}

function between(value, limit1, limit2){
  if (value >= limit1 && value <= limit2){
    return true;
  }
  return false;
}

module.exports = collisions;
