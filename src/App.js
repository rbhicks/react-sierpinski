import React, { Component } from 'react';

class App extends Component {

    constructor (props) {
        super (props);

        this.animationId    = null;
        this.canvasRef      = null;
        this.createTriangle = this.createTriangle.bind(this);
    }

    createTriangle (canvas, currentX, currentY, currentVertexIndex) {

        const boundingClientRect = canvas.getBoundingClientRect();
        const ctx                = canvas.getContext('2d');
        const verticalOffset     = 0.2;
        const lowerLeftX         = boundingClientRect.width * 0.33;
        const lowerLeftY         = boundingClientRect.height - (boundingClientRect.height * verticalOffset);
        const lowerRightX        = boundingClientRect.width * 0.66;
        const lowerRightY        = boundingClientRect.height - (boundingClientRect.height * verticalOffset);
        const apexX              = lowerLeftX + ((lowerRightX - lowerLeftX) / 2);
        const apexY              = (boundingClientRect.height -
                                   ((Math.sqrt(3) / 2) * (lowerRightX - lowerLeftX))) -
                                   (boundingClientRect.height * verticalOffset);

        const vertexCount   = 300000;
        const discardCount  = 1000;
        let   currentVertex = 0;
        
        for (let i = 0; i < 250; ++i) {
            
            currentVertex = Math.ceil(Math.random() * 3) - 1;
            
            // lower left vertex
            if      (currentVertex === 0) {
                currentX = (currentX + lowerLeftX) / 2;
                currentY = (currentY + lowerLeftY) / 2;
            }
            // lower right vertex
            else if (currentVertex === 1) {
                currentX = (currentX + lowerRightX) / 2;
                currentY = (currentY + lowerRightY) / 2;
            }
            // apex
            else if (currentVertex === 2) {
                currentX = (currentX + apexX) / 2;
                currentY = (currentY + apexY) / 2;
            }
            
            if (currentVertexIndex > discardCount) {
                ctx.fillStyle = 'blue';
                ctx.fillRect(currentX, currentY, 0.01, 0.01);
            }
        }

        
        if (currentVertexIndex < vertexCount) {
            window.requestAnimationFrame(timestamp => {
                this.createTriangle(canvas, currentX, currentY, currentVertexIndex + 250);
            });
        }
        else {
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            console.log(currentVertexIndex);
            console.log(vertexCount);
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");            
            window.cancelAnimationFrame(this.animationId);
        }
    }

    componentDidMount () {
        if (this.canvasRef != null) {

            this.animationId = window.requestAnimationFrame(timestamp => {
                               this.createTriangle(this.canvasRef, 0, 0, 0);});
        }
    }
    
    render () {

        return (
            <canvas
	       id="sierpinski"
	       width={window.innerWidth}
	       height={window.innerHeight}
               ref={ canvas => this.canvasRef = canvas }
	      >
	      <h3>
		Oh no! You do not have support for the html5 canvas API!
	      </h3>
	    </canvas>
        );
    }
}

export default App;
