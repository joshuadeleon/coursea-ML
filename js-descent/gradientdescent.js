console.log("Machine Learning in JS");
console.log("----------------------");

//  TODO: read from json
// data setup
var data = [ 
    { x: 1, y: 6 },
    { x: 2, y: 5 },
    { x: 3, y: 7 },
    { x: 4, y: 10 }
]

/*
// new data 
var data = [ 
    { x: .5, y: .2 },
    { x: 1, y: 1 },
    { x: 1, y: .5 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: 2 },
    { x: 2.5, y: 2 },
    { x: 3, y: 2 },
    { x: 3, y: 2.5 },
    { x: 3, y: 4 },
    { x: 3.5, y: 2 },
    { x: 4, y: 4 },
    { x: 4, y: 3 },
    { x: 4, y: 1 },
    { x: 5, y: 7 },
    { x: 5, y: 5 },
    { x: 5, y: 4 }
]*/
 
//  initial values
var m = data.length;
var theta0 = 2;
var theta1 = 0;
var alpha = .1;
var iterations = 10;    //  TODO: command line argument


//  hypothesis function - linear function
var h = function (theta0, theta1, x) {
    return theta0 + theta1 * x; 
}

//  cost function - thing to be minimized
var J = function (m, theta0, theta1, data) {
    var sum = 0;
    for (var i = 0; i < m; ++i) {
        var base = (h(theta0, theta1, data[i].x) - data[i].y);
        sum += Math.pow(base, 2);
    }    
    return sum/(2*m);
}

//  computes theta0: sum[ (h-y) ]
function minTheta0(m, theta0, theta1, data) {
    var sum = 0;    
    for (var i = 0; i < m; ++i) {
        sum += (h(theta0, theta1, data[i].x) - data[i].y)
    }
    return sum;    
}

//  computes theta1: sum[ (h-y) * x ]
function minTheta1(m, theta0, theta1, data) {
    var sum = 0;    
    for (var i = 0; i < m; ++i) {
        sum += (h(theta0, theta1, data[i].x) - data[i].y) * data[i].x
    }
    return sum;    
}

//  One step of the gradient 
function gradientDescent(m, alpha, theta0, theta1, data) {
    var factor = alpha/m;
    var _theta0 = theta0 - (factor * minTheta0(m, theta0, theta1, data));
    var _theta1 = theta1 - (factor * minTheta1(m, theta0, theta1, data));
    
    return [_theta0, _theta1];
}

//  runs a linear regression with given iterations
function runRegression(iterations, m, alpha, theta0, theta1, data) {
    for (var i = 0; i < iterations; ++i) {
        var min = gradientDescent(m, alpha, theta0, theta1, data)
        theta0 = min[0];
        theta1 = min[1];
        cost = J(m, theta0, theta1, data);
        console.log("Iteration: " + i + " | Cost: " + cost + " | Theta0: " + theta0.toFixed(2) + " | Theta1: " + theta1.toFixed(2));
    }
}

runRegression(iterations, m, alpha, theta0, theta1, data);





