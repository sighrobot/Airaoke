var total = 0;
var differencePast = 0;
var differenceAvg = 0;
var lastMove = 0;

doppler.init(function(bandwidth) { 
    difference = bandwidth.left - bandwidth.right - 1;
    differenceAvg += difference;
    differenceAvg = differenceAvg / 2;
    // console.log(differenceAvg);
    
    //cumulative function adds movement up so slower movements can still be registered
    if (difference !== differencePast) {
        total += difference;
        console.log(total);
        lastMove = Date.now();
    }
    //resets the additive function if there is no movement past 1 second 
    if (difference == differencePast && Date.now() - lastMove > 1000) {
        total = 0;
        console.log("reset");
    }
    differencePast = difference;

});
