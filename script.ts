interface Angles {
    [key: string]: [number, number];
}

interface DigitMap {
    [key: string]: string[];
}

const rotation: Angles = {
    " ": [135, 135],
    "┘": [180, 270],
    "└": [0, 270],
    "┐": [90, 180],
    "┌": [0, 90],
    "-": [0, 180],
    "|": [90, 270]
};

const digits: DigitMap = {
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

const clockDisplay = document.querySelector(".clock-display") as HTMLElement;
const digitCount = 6; // HH MM SS

function createDigitElement(): HTMLElement {
    const digitElement = document.createElement("div");
    digitElement.classList.add("digit");
    for (let i = 0; i < 24; i++) {
        const clock = document.createElement("div");
        clock.classList.add("clock");
        const hand1 = document.createElement("div");
        hand1.classList.add("hand");
        const hand2 = document.createElement("div");
        hand2.classList.add("hand");
        clock.appendChild(hand1);
        clock.appendChild(hand2);
        digitElement.appendChild(clock);
    }
    return digitElement;
}

const digitElements: HTMLElement[] = [];
for (let i = 0; i < digitCount; i++) {
    digitElements.push(createDigitElement());
    clockDisplay.appendChild(digitElements[i]);
    if (i === 1 || i === 3) {
        const separator = document.createElement("div");
        separator.classList.add("gap");
        clockDisplay.appendChild(separator);
    }
}

function updateDigit(digitElement: HTMLElement, numberChar: string): void {
    const pattern = digits[numberChar];

    digitElement.querySelectorAll(".clock").forEach((clock, index) => {
        const hands = clock.querySelectorAll(".hand") as NodeListOf<HTMLElement>;
        let pair = rotation[" "];

        if (pattern) {
            const symbol = pattern[index];
            if (rotation[symbol]) {
                pair = rotation[symbol];
            }
        }

        const [angle1, angle2] = pair;

        if (hands.length === 2) {
            hands[0].style.transform = `translate(0%, -50%) rotate(${angle1}deg)`;
            hands[1].style.transform = `translate(0%, -50%) rotate(${angle2}deg)`;
        }
    });
}

function updateClock(): void {
    const now = new Date();
    const timeString = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    const cleanTimeString = timeString.replace(/[^0-9]/g, "");
    const timeDigits = cleanTimeString.split("");

    timeDigits.forEach((digitChar, index) => {
        if (digitElements[index]) {
            updateDigit(digitElements[index], digitChar);
        }
    });
}

updateClock();
setInterval(updateClock, 1000);