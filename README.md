# Airless, a Javascript Platformer

Airless is a platforming game where the aim is to escape collision between blue circle(which is operated by users mouse and red tiles for as much as you can.


# Functionality & MVP

* Start, with the information about game's rules.
* User's mouse is directly connected to circle.
* Moving tiles of a random size.

# Wireframes

The app will consist of on level. The hardness of a game will be slowly increasing by the increasing score value.

![wireframes](https://s3.us-east-2.amazonaws.com/clone-app-dev/wire1.1.png)
![wireframes](https://s3.us-east-2.amazonaws.com/clone-app-dev/wire1.2.png)

# Architecture and Technologies

* `Javascript`. Whole project is written on Javascript.
* `Canvas`. Graphics(point and moving tiles) implemented to `HTML` via graphics container called Canvas operated by Javascript.
* `jQuery`, Javascript library used to connect `HTML` elements to Javascript functions in order to operate them.

# Implementation timeline

### Day 1
* Setup basic canvas scene.

### Day 2
* Webpack, styling

### Day 3
* Styling, finalizing, testing
* Hosting

## Future implementations

* Particle emitter
* Horizontal movements of tiles
* Randomly changing size of a circle

## Run locally
* Download or clone repository
* Navigate terminal to `Airless/lib/` directory
* Run `npm install` in  terminal
* Run `webpack --watch` in terminal
* Copy local path to index.html in root directory and paste into your browser's address bar
* Play game
