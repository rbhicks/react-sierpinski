import React, { Component } from 'react';

class App extends Component {

    constructor (props) {
        super (props);

        this.animationId        = null;
        
        this.ctx                = 0;
        this.verticalOffset     = 0.2;
        this.lowerLeftX         = 0;
        this.lowerLeftY         = 0;
        this.lowerRightX        = 0;
        this.lowerRightY        = 0;
        this.apexX              = 0;
        this.apexY              = 0;

        this.createTriangle = this.createTriangle.bind(this);
    }

    createTriangle (canvas, currentX, currentY, currentVertexIndex) {

        const vertexCount   = 300000;
        const discardCount  = 1000;
        let   currentVertex = 0;
        
        for (let i = 0; i < 250; ++i) {
            
            currentVertex = Math.ceil(Math.random() * 3) - 1;
            
            // lower left vertex
            if      (currentVertex === 0) {
                currentX = (currentX + this.lowerLeftX) / 2;
                currentY = (currentY + this.lowerLeftY) / 2;
            }
            // lower right vertex
            else if (currentVertex === 1) {
                currentX = (currentX + this.lowerRightX) / 2;
                currentY = (currentY + this.lowerRightY) / 2;
            }
            // apex
            else if (currentVertex === 2) {
                currentX = (currentX + this.apexX) / 2;
                currentY = (currentY + this.apexY) / 2;
            }
            
            if (currentVertexIndex > discardCount) {
                this.ctx.fillStyle = 'blue';
                this.ctx.fillRect(currentX, currentY, 0.01, 0.01);
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
    
    render () {

        return (
            <canvas
	       id="sierpinski"
	       width={window.innerWidth}
	       height={window.innerHeight}
               ref={ canvas => {
                   const boundingClientRect = canvas.getBoundingClientRect();

                   this.ctx         = canvas.getContext('2d');
                   this.lowerLeftX  = boundingClientRect.width * 0.33;
                   this.lowerLeftY  = boundingClientRect.height - (boundingClientRect.height * this.verticalOffset);
                   this.lowerRightX = boundingClientRect.width * 0.66;
                   this.lowerRightY = boundingClientRect.height - (boundingClientRect.height * this.verticalOffset);
                   this.apexX       = this.lowerLeftX + ((this.lowerRightX - this.lowerLeftX) / 2);
                   this.apexY       = (boundingClientRect.height -
                                      ((Math.sqrt(3) / 2) * (this.lowerRightX - this.lowerLeftX))) -
                                      (boundingClientRect.height * this.verticalOffset);
                   
                   this.animationId = window.requestAnimationFrame(timestamp => {
                                      this.createTriangle(this.canvasRef, 0, 0, 0);});
              }}
	      >
	      <h3>
		Oh no! You do not have support for the html5 canvas API!
	      </h3>
	    </canvas>
        );
    }
}

export default App;
