const five = require("johnny-five"), board, accel;
board = new five.Board();

board.on("ready", ()=>{
    accel = new five.Accelerometer({
        controller: "ADXL335",
        pins: ["A3","A4","A5"],
        sensitivity:96,
        zeroV:478
    });
    
    // untuk handle data yang terbaca
    accel.on("data", (data)=>{
        console.log("data: "+ data);
    });

    // untuk handle perubahan data
    accel.on("inclination", (data)=>{
        console.log("change: "+ data);
    });
});

