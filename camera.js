<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Camera App</title>
    <style>
        #video {
            width: 100%;
            max-width: 640px;
            height: auto;
        }
        #canvas {
            display: none;
        }
    </style>
</head>
<canvas id="canvas" style="position: absolute; top: 0; left: 0;"></canvas>

<body>
    
    <h1>Camera App</h1>
    <video id="video" autoplay></video>
    <canvas id="canvas"></canvas>

    <script src="https://cdn.jsdelivr.net/npm/tracking/build/tracking-min.js"></script>
    <script>
        navigator.mediaDevices.enumerateDevices()
          .then(function(devices) {
            devices.forEach(function(device) {
              console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
            });
          })
          .catch(function(err) {
            console.error("Error: " + err);
          });

        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const tracker = new tracking.ObjectTracker('face');

        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1);

        tracking.track('#video', tracker);

        tracker.on('track', function(event) {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.clearRect(0, 0, canvas.width, canvas.height);

            event.data.forEach(function(rect) {
                context.strokeStyle = '#00ff00';
                context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                
                // 각 얼굴 위치에 이미지를 그리기
                const img1 = new Image();
                img1.src = '1.jpg';
                context.drawImage(img1, rect.x + rect.width / 4, rect.y - rect.height / 2, rect.width / 2, rect.height / 2);

                const img2 = new Image();
                img2.src = '2.jpg';
                context.drawImage(img2, rect.x + rect.width / 4, rect.y + rect.height / 2, rect.width / 2, rect.height / 2);

                const img3 = new Image();
                img3.src = '3.jpg';
                context.drawImage(img3, rect.x, rect.y + rect.height / 4, rect.width / 2, rect.height / 2);
            });
        });

        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function(error) {
                console.error("Error accessing camera:", error);
            });
    </script>
</body>
</html>
