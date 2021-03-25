var app = (function () {

    var stompClient = null;

    function setConnected(connected) {
        $("#connect").prop("disabled", connected);
        $("#disconnect").prop("disabled", !connected);
        if (connected) {
            $("#pointslist").show();
            $("#canvas").show();
        }
        else {
            $("#pointslist").hide();
            $("#canvas").hide();
        }
        $("#points").html("");
    }

    var connect = function () {
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            setConnected(true);
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/newpoint', function (point) {
                showPoints(JSON.parse(point.body));
                addPointToCanvas(JSON.parse(point.body));
            });
        });
    };

    function disconnect() {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
        setConnected(false);
        console.log("Disconnected");
    }

    function sendPoint() {
        stompClient.send("/app/hello", {}, JSON.stringify(
                {
                    'x': $("#x").val(),
                    'y': $("#y").val()
                }
        ));
    }
    
    function addPointToCanvas(point) {        
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
        ctx.stroke();
    };
    
    function showPoints(point) {
        $("#points").append("<tr><td>" + 
                "{x: " + point.x + ", y: " + point.y + "}" + "</td></tr>");
    }

    return {
        connect: connect,
        disconnect: disconnect,
        sendPoint: sendPoint
    };
})();