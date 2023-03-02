function testsnapshot() {

  var constraints = { video: { width : {exact: 1920}, height : {exact: 1080} } };
 console.log('initial constraints: ' + JSON.stringify(constraints));

      navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            let streaming = false;
            let snapshotvideo = document.createElement('video');

            snapshotvideo.setAttribute('autoplay', '');
            snapshotvideo.setAttribute('playsinline', '');
            snapshotvideo.srcObject = stream;

            const mytrack = stream.getVideoTracks()[0];
            const myconstraints = mytrack.getConstraints();
            console.log('Result constraints: ' + JSON.stringify(myconstraints));

            window.snapshotstream = stream;

            snapshotvideo.addEventListener("canplay", function(ev) {
              if (!streaming) {
                setTimeout(function() {
                    let canvas = document.createElement("canvas");
                    canvas.width = snapshotvideo.videoWidth;
                    canvas.height = snapshotvideo.videoHeight;

                    console.log('Result video: ' + snapshotvideo.videoWidth + 'x' + snapshotvideo.videoHeight);

                    const context = canvas.getContext("2d");
                    context.drawImage(snapshotvideo, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob(function(rotatedblob) {
                      window.objurl = URL.createObjectURL(rotatedblob);
                      

                      stream.getVideoTracks()[0].stop();
                    }, "image/jpeg", 0.8);
                  }, 200);
                streaming = true;
              }
            });
            snapshotvideo.play();
          })
          .catch(function(error) {
            console.log('snapshot getUserMedia() error: ', error);

          });
    }


