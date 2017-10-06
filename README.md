[Live Link](https://mischatch.github.io/Airless/)

# Airless, a Javascript Platformer

Airless is a platforming game where the aim is to escape collision between blue circle(which is operated by users mouse and red tiles for as much as you can.


# Functionality & MVP

* Start, with the information about game's rules.
* User's mouse is directly connected to circle.
* Moving tiles of a random size.
* Speed and complexity increases every 1500 points.

# Wireframes

The app will consist of on level. The hardness of a game will be slowly increasing by the increasing score value.

![wireframes](https://s3.us-east-2.amazonaws.com/clone-app-dev/wire1.1.png)
![wireframes](https://s3.us-east-2.amazonaws.com/clone-app-dev/wire1.2.png)

# Architecture and Technologies

* `Javascript`. Whole project is written on Javascript.
* `Canvas`. Graphics(point and moving tiles) implemented to `HTML` via graphics container called Canvas operated by Javascript.
* `jQuery`, Javascript library used to connect `HTML` elements to Javascript functions in order to operate them.
* Custom `collision detection` function

* ![collisions](https://s3.us-east-2.amazonaws.com/clone-app-dev/collision.png)

# Implementation timeline

### Day 1
* Setup basic canvas scene.

### Day 2
* Webpack
* Styling

### Day 3
* Styling
* Finalizing
* Testing
* Hosting

## To run locally
* Download or clone repository
* Navigate terminal to `Airless/lib/` directory
* Run `npm install` in  terminal
* Run `webpack --watch` in terminal
* Copy local path to index.html in root directory and paste into your browser's address bar
* Play game
