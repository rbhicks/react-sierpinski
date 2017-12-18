import React, { Component } from 'react';

class App extends Component {

    constructor (props) {
        super (props);

        this.animationId        = null;
        
        this.ctx                = 0;
        this.lowerLeftX         = 0;
        this.lowerLeftY         = 0;
        this.lowerRightX        = 0;
        this.lowerRightY        = 0;
        this.apexX              = 0;
        this.apexY              = 0;
        this.vertexCount        = 600000;
        this.discardCount       = 1000;
        this.width              = 0;
        this.height             = 0;

        this.createTriangle = this.createTriangle.bind(this);
    }

    createTriangle (canvas, currentX, currentY, currentVertexIndex) {
        let currentVertex = 0;
        
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
            
            if (currentVertexIndex > this.discardCount) {
                this.ctx.fillStyle = 'blue';
                this.ctx.fillRect(currentX, currentY, 0.01, 0.01);
            }
        }
        
        if (currentVertexIndex < this.vertexCount) {
            window.requestAnimationFrame(timestamp => {
                this.createTriangle(canvas, currentX, currentY, currentVertexIndex + 250);
            });
        }
        else {
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
            console.log(currentVertexIndex);
            console.log(this.vertexCount);
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
                   let   verticalOffset     = 0;
                   let   horizontalOffset   = 0;
                   let   apexHeight         = 0;

                   this.width  = boundingClientRect.width;
                   this.height = boundingClientRect.height;
                   this.ctx    = canvas.getContext('2d');

                   // landscape
                   if (this.width > this.height) {                       
                       horizontalOffset = (this.width - this.height) / 2;
                       
                       this.lowerLeftX  = horizontalOffset;
                       this.lowerRightX = this.height + horizontalOffset;
                       this.apexX       = this.lowerLeftX + ((this.lowerRightX - this.lowerLeftX) / 2);

                       apexHeight       = ((Math.sqrt(3) / 2) * (this.lowerRightX - this.lowerLeftX));
                       verticalOffset   = (this.height - apexHeight) / 2;
                       
                       this.lowerLeftY  = this.height - verticalOffset;
                       this.lowerRightY = this.height - verticalOffset;
                       this.apexY       = this.height - apexHeight - verticalOffset;
                   }
                   // portrait
                   else if (this.width < this.height) {
                       this.lowerLeftX  = this.width * 0.05;
                       this.lowerRightX = this.width * 0.95;
                       this.apexX       = this.lowerLeftX + ((this.lowerRightX - this.lowerLeftX) / 2);

                       apexHeight       = ((Math.sqrt(3) / 2) * (this.lowerRightX - this.lowerLeftX));
                       verticalOffset   = (this.height - apexHeight) / 2;
                       
                       this.lowerLeftY  = this.height - verticalOffset;
                       this.lowerRightY = this.height - verticalOffset;
                       this.apexY       = this.height - apexHeight - verticalOffset;
                   }
                   // in case we end up with a square
                   else {
                       this.lowerLeftX  = this.width * 0.05;
                       this.lowerRightX = this.width * 0.95;
                       this.apexX       = this.lowerLeftX + ((this.lowerRightX - this.lowerLeftX) / 2);

                       apexHeight       = ((Math.sqrt(3) / 2) * (this.lowerRightX - this.lowerLeftX));
                       verticalOffset   = this.height * 0.05
                       
                       this.lowerLeftY  = this.height - verticalOffset;
                       this.lowerRightY = this.height - verticalOffset;
                       this.apexY       = this.height - apexHeight - verticalOffset;
                   }
                   
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
