const legend = `


Available commands / Dostepne komendy:

fd + NUMBER --> go forward / idź do przodu
bd + NUMBER --> go backward / idź do tyłu
rt + NUMBER --> turn right / odwróć sie w prawo
lt + NUMBER --> turn left / odwróć sie w lewo

pu --> turtle isn't making trail / żłów nie robi śladów
pd --> turtle is making trail / żłów robi ślady
sv --> save current state / zapisz obecny stan
ld --> load previous state / wczytaj poprzedni stan

repeat + NUMBER + [+COMMANDS+] --> loop / pętla

`;

const commands = {
  fd: len => {
    turtle.goForward(len);
    return 0;
  },

  bd: len => {
    turtle.goForward(-len);
    return 0;
  },

  rt: angle => {
    turtle.turnRight(angle);
    return 0;
  },

  lt: angle => {
    turtle.turnRight(-angle);
    return 0;
  },

  repeat: (repeatText, count) => {
    return turtleDraw(repeatText.trim(), count);
  },

  pu: () => {
    turtle.pushUp();
    return -1;
  },

  pd: () => {
    turtle.pushDown();
    return -1;
  },

  sv: () => {
    turtle.save();
    return -1;
  },

  ld: () => {
    turtle.loadPreviousState();
    return -1;
  }
};

let turtle;

function setup() {
  console.clear();
  console.log(legend);

  createCanvas(500, 600);

  const area = select("#code");
  area.input(turtleDecode);

  turtle = new Turtle();

  turtleDecode(area);
}

function turtleDecode(el) {
  turtle.reset();
  let code = el.target ? el.target.value : el.value();
  turtleDraw(code);
}

function turtleDraw(text, count = 1) {
  const codeO = text;
  const code = codeO.split(" ").filter(el => el !== "");

  let repeatText = codeO.split(/\[|\]/);
  let repeatCount = -1;

  for (let c = 1; c <= count; c++) {
    for (let i = 0; i < code.length; i += 2) {
      code[i] = code[i].trim();
      code[i + 1] = code[i + 1].trim();

      if (code[i] === "repeat") {
        repeatCount += 2;
        i += commands[code[i]](repeatText[repeatCount], code[i + 1]);
      } else {
        i += commands[code[i]](code[i + 1]);
      }
    }
  }

  return code.length;
}
