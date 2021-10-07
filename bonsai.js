

// Global colors
var leaves;

var trunk;

var darkyellow;

var yellow;

var black;

var grey;

var white;

// Coordinate indices
var coordX;

var coordY;

// Setup()
function setup() {
    initializeFields();
    // Canvas size
    background(color(0x35, 0x34, 0x35));
    let cnv = createCanvas(360, 350);
    cnv.id('bonsai');
    // Draw Bonsai
    generate();
}



function generate() {
// Coordinates for branch growth.
var lastPointX;

var lastPointY;

var nextPointX;

var nextPointY;

var futurePointX;

var futurePointY;

// Generate a new tree
leaves = color('#86281e');
trunk = color('#ad7629');
    noFill();
    stroke(trunk);
    // Fetch growth variables
    var devianceValue = 15.6;
    var branchesValue = 155.6;
    var heightValue = 19.5;
    var directionValue = .5;
    lastPointX = 180;
    lastPointY = 270;
    strokeWeight(20);
    // Next branches point
    nextPointX = int(lastPointX + (random(-30, 30)));
    nextPointY = int(lastPointY + (random(-15, -5)));
    // Future branches point
    futurePointX = int(nextPointX + (random(-30, 30)));
    futurePointY = int(nextPointY + (random(-15, -5)));
    // Anchor points for drawing the first section of the stem.
    curve(lastPointX, lastPointY, lastPointX, lastPointY, nextPointX, nextPointY, futurePointX, futurePointY);
    // Regenerate plant pot graphic
    drawPlantPot();
    // Generate the rest of the tree
    for (var branches = 10; branches > 0; branches--) {
        stroke(trunk);
        noFill();
        strokeWeight(branches * 2);
        // Calculate next branches coordinate based on deviance and direction
        lastPointX = nextPointX;
        lastPointY = nextPointY;
        nextPointX = futurePointX;
        nextPointY = futurePointY;
        futurePointX = int(futurePointX + (random(-devianceValue, devianceValue)));
        futurePointX = futurePointX + int(directionValue);
        futurePointY = int(futurePointY + (random(-heightValue, -10)));
        // Anchor points for drawing a curved branch
        curve(lastPointX, lastPointY, lastPointX, lastPointY, nextPointX, nextPointY, futurePointX, futurePointY);
        // Draw sub-branches based on the branches variable
        if ((int((random(0, 400))) < branchesValue)) {
            // Preserve original branch point
            var oldBranchPoint = new Array(6);
            oldBranchPoint[0] = lastPointX;
            oldBranchPoint[1] = lastPointY;
            oldBranchPoint[2] = nextPointX;
            oldBranchPoint[3] = nextPointY;
            oldBranchPoint[4] = futurePointX;
            oldBranchPoint[5] = futurePointY;
            for (var subBranches = branches + (int(random(-5, 5))); subBranches > 0; subBranches--) {
                strokeWeight(subBranches);
                // Anchor points for drawing a curved branch
                curve(lastPointX, lastPointY, lastPointX, lastPointY, nextPointX, nextPointY, futurePointX, futurePointY);
                // Calculate next branches coordinate based on deviance and direction
                lastPointX = nextPointX;
                lastPointY = nextPointY;
                nextPointX = futurePointX;
                nextPointY = futurePointY;
                futurePointX = int(futurePointX + (random(-devianceValue, devianceValue)));
                futurePointX = futurePointX + int(directionValue);
                futurePointY = int(futurePointY + (random(-heightValue, -10)));
                // Draw leaves before subbranch loop exit
                if (subBranches == 1) {
                    for (var j = 0; j < 50; j++) {
                        noStroke();
                        fill(leaves);
                        ellipse(lastPointX + (random(-20, 20)), lastPointY + (random(-10, 10)), 7, 7);
                    }
                }
            }
            // Recover original branch point
            lastPointX = oldBranchPoint[0];
            lastPointY = oldBranchPoint[1];
            nextPointX = oldBranchPoint[2];
            nextPointY = oldBranchPoint[3];
            futurePointX = oldBranchPoint[4];
            futurePointY = oldBranchPoint[5];
        }
        // Draw leaves before branch loop exit
        if (branches == 1) {
            for (var i = 0; i < 50; i++) {
                noStroke();
                fill(leaves);
                ellipse(lastPointX + (random(-25, 25)), lastPointY + (random(-10, 10)), 8, 8);
            }
        }
    }
}


// Draw plant pot graphic
function drawPlantPot() {
    noStroke();
    // quad parameters: (x1, y1, x2, y2, x3, y3, x4, y4)
    // draw pot
    fill(darkyellow);
    quad(100, 280, 110, 310, 250, 310, 260, 280);
    quad(100, 330, 110, 320, 120, 320, 110, 330);
    quad(250, 330, 240, 320, 250, 320, 260, 330);
    // draw feet and accents
    fill(yellow);
    quad(95, 280, 95, 270, 265, 270, 265, 280);
    quad(105, 320, 105, 310, 255, 310, 255, 320);
}

// Slider

var barWidth, barHeight;

var xpos, ypos;

var value, newValue;

var valueMin, valueMax;

var resistance;

var over;

var locked;

var ratio;

function initializeFields() {
    leaves = color(192, 198, 75);
    trunk = color(132, 128, 115);
    darkyellow = color(220, 180, 70);
    yellow = color(255, 209, 82);
    black = color(40, 40, 45);
    grey = color(150, 150, 150);
    white = color(255, 255, 255);
    coordX = 0;
    coordY = 0;
    lastPointX = 0;
    lastPointY = 0;
    nextPointX = 0;
    nextPointY = 0;
    futurePointX = 0;
    futurePointY = 0;
    xpos = 0;
    ypos = 0;
}
