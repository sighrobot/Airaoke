var bongo = new Tone.Sampler({
    "bongo_hit": "./samples/bongo/bongo_hit.wav",
    "bongo_slap": "./samples/bongo/bongo_slap.wav"
}).toMaster();

var snare = new Tone.Sampler({
    "snare": "./samples/snare/snare1.wav"
}).toMaster();

var guitar = new Tone.Sampler({
    "guitar1": "./samples/guitar/1.wav",
    "guitar2": "./samples/guitar/2.wav",
    "guitar3": "./samples/guitar/3.wav",
    "guitar4": "./samples/guitar/4.wav",
    "guitar5": "./samples/guitar/5.wav",
    "guitar6": "./samples/guitar/6.wav",
    "guitar7": "./samples/guitar/7.wav",
    "guitar8": "./samples/guitar/8.wav"
}).toMaster();


var lastMove = 0;
var lastVal = 0;

var isRecording = false;
var recordingStartTime = 0;
var recordingData = [];


doppler.init(function(bandwidth) {
    difference = bandwidth.right - bandwidth.left - 1;

    var velocity = (difference - 15) / 12
    console.log(velocity);

    if (toggle1.val.value) {
        playBongo(difference, velocity);
    }
    if (toggle2.val.value) {
        playSnare(difference);
    }
    if (toggle3.val.value) {
        playGuitar(difference);
    }
});

var bongoCount = 0,
    threshold = 15;

playBongo = function(diff, vel) {
    if (diff > threshold && Date.now() - lastMove > 75) {

        if (bongoCount < 3) {
            bongo.triggerAttack("bongo_hit", 0, vel);
            bongoCount++;
        } else {
            bongo.triggerAttack("bongo_slap", 0, vel);
            bongoCount = 0;
        }
        lastMove = Date.now();
        if (isRecording) recordHit(lastMove - recordingStartTime);
    }
    lastVal = diff;
}


playSnare = function(diff) {
    if (diff > threshold && Date.now() - lastMove > 50) {

        snare.triggerAttack("snare");
        lastMove = Date.now();
        if (isRecording) recordHit(lastMove - recordingStartTime);
    }
    lastVal = diff;
}


var guitarCount = 1;
playGuitar = function(diff) {
    if (diff > threshold && Date.now() - lastMove > 150) {

        if (guitarCount > 8) {
            guitarCount = 1;
        }
        var guitarNumber = "guitar" + guitarCount.toString();
        guitar.triggerAttack(guitarNumber);
        guitarCount++;

        lastMove = Date.now();
        if (isRecording) recordHit(lastMove - recordingStartTime);
    }
    lastVal = diff;
}


var recordHit = function(t) {
    recordingData.push(t);
    console.log('recorded hit ' + t / 1000 + 's from start');
    //console.log(recordingData);
}

var toggleRecordingOnOff = function() {
    if (isRecording) {
        isRecording = false;
        console.log('recording turned off');
    } else {
        recordingStartTime = Date.now();
        recordingData = [];
        isRecording = true;
        console.log('recording turned on');
    }
}


//saving for later
// var total = 0;
// var differencePast = 0;
// var differenceAvg = 0;
// var lastMove = 0;


// differenceAvg += difference;
// differenceAvg = differenceAvg / 2;
// console.log(difference);

// //cumulative function adds movement up so slower movements can still be registered
// if (difference !== differencePast) {
//     total += difference;
//     //console.log(total);
//     lastMove = Date.now();
// }
// //resets the additive function if there is no movement past 1 second 
// if (difference == differencePast && Date.now() - lastMove > 1000) {
//     total = 0;
//     //console.log("reset");
// }
// differencePast = difference;
