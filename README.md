This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

This is a short proof of concept for integrating an HTML5 canvas with React. The algorithm is a simple way to generate a Sierpinski triangle:

- give coordinates to the three vertices of an equilateral triangle and assign them the values 0, 1, 2
- pick a random starting point
- randomly choose 0, 1, or 2
- draw a new point half half between the previous point and the randomly chosen vertex
- interate the last two steps as many times as desired, the more the better filled out the triangel becomes

Typically, it's desirous to not plot the first points, somewhere between 50 and 1000. This is in case the starting point falls outside the Sierpinski Triangle; once a point lies inside the set of Sierpinski Triangle points all other generated points will remaining inside this set.

It's a very simple and elegant algorithm that produces a surprisingly complex result.
