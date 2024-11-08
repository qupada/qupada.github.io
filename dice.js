(function() {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var rollD100 = function(die, x) {
        var colours = [ "orange", "green", "blue", "red"] ;
        setTimeout(function() {
            var digit = getRandomInt(1, 100);
            die.innerHTML = `<div class="top"></div><div class="middle"><div class="circle">${digit}</div></div><div class="bottom"></div>`;
            die.className = [
                "d100",
                colours[getRandomInt(0, 3)]
            ].join(" ");
            if (--x > 10) {
                rollD100(die, x);
            }
            else {
                die.className = [
                    "d100",
                    colours[getRandomInt(0, 3)]
                ].join(" ")
            }
        }, ((500/x) + Math.random()));
    };
    var rollAqwDie = function(die, x) {
        var colours = [ "orange", "green", "blue", "orange", "green", "red"] ;
        var labels = [ "A", "Q", "W" ];
        setTimeout(function() {
            var letter = labels[getRandomInt(0, 2)];
            var colour = colours[getRandomInt(0, 5)];
            die.innerHTML = `<div class="circle">${letter}</div>`;
            die.className = [
                "aqwdie",
                colour,
                ("rotate"+getRandomInt(0,3))
            ].join(" ");
            if (--x > 10) {
                rollAqwDie(die, x);
            }
        }, ((500/x) + Math.random()));
    };

    window.roll = function(qty, type) {
        document.getElementById("table").innerHTML = "";
        switch(type) {
            case ("d100"):
                for (var x = 0; x < qty; x++) {
                    var die = document.createElement("div");
                    die.className = "d100";
                    document.getElementById("table").appendChild(die);
                    rollD100(die, 75);
                }
                break;

            case ("aqw"):
                for (var x = 0; x < qty; x++) {
                    var die = document.createElement("div");
                    die.className = "aqwdie";
                    document.getElementById("table").appendChild(die);
                    rollAqwDie(die, 50);
                }
                break;
        }
    }
})();
