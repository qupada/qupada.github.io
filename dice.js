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
                enableButtons();
            }
        }, ((500/x) + Math.random()));
    };
    var rollD6 = function(die, x) {
        var colours = [ "orange", "green", "blue", "red"] ;
        setTimeout(function() {
            var digit = getRandomInt(1, 6);
            die.innerHTML = `<div class="circle">${digit}</div>`;
            die.className = [
                "d6",
                colours[getRandomInt(0, 3)]
            ].join(" ");
            if (--x > 10) {
                rollD6(die, x);
            }
            else {
                die.className = [
                    "d6",
                    colours[getRandomInt(0, 3)]
                ].join(" ")
                enableButtons();
            }
        }, ((500/x) + Math.random()));
    };
    var count = 0;
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
            else {
                count--;
                if (count == 0) {
                    enableButtons();
                    summarise();
                }
            }
        }, ((500/x) + Math.random()));
    };

    /*
     * so here's an example. Someone is trying to do something like climb a difficult thing, I'll say 'roll courage and this will need 3 successes because it's quite difficult', they have 4 dice for courage, so they roll 4 dice to see if they can create 3 successes. If they roll 3 successes from 2 dice and the other 2 dice are red or orange, they pass. If they don't roll enough successes to pass, then we count the reds and oranges to see how much they fail by coz that has it's own consequences
     */

    var summarise = function() {
        var red = document.querySelectorAll("div.aqwdie.red").length;
        var orange = document.querySelectorAll("div.aqwdie.orange").length;
        var blue = document.querySelectorAll("div.aqwdie.blue").length;
        var green = document.querySelectorAll("div.aqwdie.green").length;
        var total = red + orange + blue + green;

        var successes = 2 * blue + green;
        var failures = 2 * red + orange;

        var table = document.getElementById("table")

        var clearDiv = document.createElement("div");
        clearDiv.className = "clear";
        table.appendChild(clearDiv)

        var results = document.createElement("table");
        results.cellSpacing = 0;

        var header = document.createElement("tr");
        header.innerHTML = `<th>If you needed</th><th>Then</th>`;
        results.appendChild(header);

        var successRow = document.createElement("tr");
        if (successes == 1) {
            successRow.innerHTML = `<td>1 success</td> <td> Congratulations! </td>`;
        }
        else {
            successRow.innerHTML = `<td>${successes} or fewer successes</td> <td> Congratulations! </td>`;
        }
        results.appendChild(successRow);

        var failuresRow = document.createElement("tr");
        failuresRow.innerHTML = `<td>${successes+1} or more successes</td> <td>You had ${failures} failures</td>`;
        if (failures != 0) {
            results.appendChild(failuresRow);
        }

        table.appendChild(results);
    }

    var disableButtons = function() {
        document.querySelectorAll("button").forEach(function(el) {
            el.disabled = "disabled";
        });
    }

    var enableButtons = function() {
        document.querySelectorAll("button").forEach(function(el) {
            el.disabled = "";
        });
    }

    window.roll = function(qty, type) {
        var table = document.getElementById("table")
        table.innerHTML = "";
        disableButtons();

        switch(type) {
            case ("d100"):
                for (var x = 0; x < qty; x++) {
                    var die = document.createElement("div");
                    die.className = "d100";
                    table.appendChild(die);
                    rollD100(die, 75);
                }
                break;

            case ("d6"):
                for (var x = 0; x < qty; x++) {
                    var die = document.createElement("div");
                    die.className = "d6";
                    table.appendChild(die);
                    rollD6(die, 75);
                }
                break;

            case ("aqw"):
                for (var x = 0; x < qty; x++) {
                    var die = document.createElement("div");
                    die.className = "aqwdie";
                    table.appendChild(die);
                    rollAqwDie(die, 50);
                    count++;
                }
                break;
        }

    }
})();
