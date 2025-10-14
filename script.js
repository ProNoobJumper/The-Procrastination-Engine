var rotation = {
    " ": [135, 135],
    "┘": [180, 270],
    "└": [0, 270],
    "┐": [90, 180],
    "┌": [0, 90],
    "-": [0, 180],
    "|": [90, 270]
};
var digits = {
    "0": [
        "┌", "-", "-", "┐",
        "|", "┌", "┐", "|",
        "|", "|", "|", "|",
        "|", "|", "|", "|",
        "|", "└", "┘", "|",
        "└", "-", "-", "┘",
    ],
    "1": [
        "┌", "-", "┐", " ",
        "└", "┐", "|", " ",
        " ", "|", "|", " ",
        " ", "|", "|", " ",
        "┌", "┘", "└", "┐",
        "└", "-", "-", "┘",
    ],
    "2": [
        "┌", "-", "-", "┐",
        "└", "-", "┐", "|",
        "┌", "-", "┘", "|",
        "|", "┌", "-", "┘",
        "|", "└", "-", "┐",
        "└", "-", "-", "┘",
    ],
    "3": [
        "┌", "-", "-", "┐",
        "└", "-", "┐", "|",
        " ", "┌", "┘", "|",
        " ", "└", "┐", "|",
        "┌", "-", "┘", "|",
        "└", "-", "-", "┘",
    ],
    "4": [
        "┌", "┐", "┌", "┐",
        "|", "|", "|", "|",
        "|", "└", "┘", "|",
        "└", "-", "┐", "|",
        " ", " ", "|", "|",
        " ", " ", "└", "┘",
    ],
    "5": [
        "┌", "-", "-", "┐",
        "|", "┌", "-", "┘",
        "|", "└", "-", "┐",
        "└", "-", "┐", "|",
        "┌", "-", "┘", "|",
        "└", "-", "-", "┘",
    ],
    "6": [
        "┌", "-", "-", "┐",
        "|", "┌", "-", "┘",
        "|", "└", "-", "┐",
        "|", "┌", "┐", "|",
        "|", "└", "┘", "|",
        "└", "-", "-", "┘",
    ],
    "7": [
        "┌", "-", "-", "┐",
        "└", "-", "┐", "|",
        " ", " ", "|", "|",
        " ", " ", "|", "|",
        " ", " ", "|", "|",
        " ", " ", "└", "┘",
    ],
    "8": [
        "┌", "-", "-", "┐",
        "|", "┌", "┐", "|",
        "|", "└", "┘", "|",
        "|", "┌", "┐", "|",
        "|", "└", "┘", "|",
        "└", "-", "-", "┘",
    ],
    "9": [
        "┌", "-", "-", "┐",
        "|", "┌", "┐", "|",
        "|", "└", "┘", "|",
        "└", "-", "┐", "|",
        "┌", "-", "┘", "|",
        "└", "-", "-", "┘",
    ]
};
var clockDisplay = document.querySelector(".clock-display");
var digitCount = 6; // HH MM SS
function createDigitElement() {
    var digitElement = document.createElement("div");
    digitElement.classList.add("digit");
    for (var i = 0; i < 24; i++) {
        var clock = document.createElement("div");
        clock.classList.add("clock");
        var hand1 = document.createElement("div");
        hand1.classList.add("hand");
        var hand2 = document.createElement("div");
        hand2.classList.add("hand");
        clock.appendChild(hand1);
        clock.appendChild(hand2);
        digitElement.appendChild(clock);
    }
    return digitElement;
}
var digitElements = [];
for (var i = 0; i < digitCount; i++) {
    digitElements.push(createDigitElement());
    clockDisplay.appendChild(digitElements[i]);
    if (i === 1 || i === 3) {
        var separator = document.createElement("div");
        separator.classList.add("gap");
        clockDisplay.appendChild(separator);
    }
}
function updateDigit(digitElement, numberChar) {
    var pattern = digits[numberChar];
    digitElement.querySelectorAll(".clock").forEach(function (clock, index) {
        var hands = clock.querySelectorAll(".hand");
        var pair = rotation[" "];
        if (pattern) {
            var symbol = pattern[index];
            if (rotation[symbol]) {
                pair = rotation[symbol];
            }
        }
        var angle1 = pair[0], angle2 = pair[1];
        if (hands.length === 2) {
            hands[0].style.transform = "translate(0%, -50%) rotate(".concat(angle1, "deg)");
            hands[1].style.transform = "translate(0%, -50%) rotate(".concat(angle2, "deg)");
        }
    });
}
function updateClock() {
    var now = new Date();
    var timeString = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    var cleanTimeString = timeString.replace(/[^0-9]/g, "");
    var timeDigits = cleanTimeString.split("");
    timeDigits.forEach(function (digitChar, index) {
        if (digitElements[index]) {
            updateDigit(digitElements[index], digitChar);
        }
    });
}
updateClock();
setInterval(updateClock, 1000);
