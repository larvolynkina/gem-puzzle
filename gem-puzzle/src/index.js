const buttonsWrapper = document.createElement('div');
document.body.append(buttonsWrapper);
buttonsWrapper.classList.add('buttons-wrapper');

const infoWrapper = document.createElement('div');
document.body.append(infoWrapper);
infoWrapper.classList.add('info-wrapper');

let movesCount = 0;

const info = [
  {
    text: 'Time',
    class: 'time',
  },
  {
    text: 'Moves',
    class: 'moves',
  },
];

info.forEach((item) => {
  const element = document.createElement('div');
  element.classList.add('info-element');
  infoWrapper.appendChild(element);
  const paragraph = document.createElement('p');
  paragraph.innerText = `${item.text}:`;
  element.appendChild(paragraph);
  const span = document.createElement('span');
  paragraph.appendChild(span);
  span.classList.add(item.class);
});

const movesSpan = document.querySelector('.moves');
movesSpan.innerText = '0';
const timeSpan = document.querySelector('.time');
timeSpan.innerText = '00:00';

const buttons = [
  {
    text: 'Restart',
    class: 'restart',
  },
  {
    text: 'Stop',
    class: 'stop',
  },
  {
    text: 'Save',
    class: 'save',
  },
  {
    text: 'Results',
    class: 'result',
  },
];

buttons.forEach((item) => {
  const element = document.createElement('button');
  buttonsWrapper.appendChild(element);
  element.innerText = item.text;
  element.classList.add('btn');
  element.classList.add(item.class);
});

const stopBTN = document.querySelector('.stop');

const soundIco = document.createElement('div');
buttonsWrapper.append(soundIco);
soundIco.classList.add('sound-ico');

// создание игрового поля
const playingField = document.createElement('div');
document.body.append(playingField);
playingField.classList.add('playing-field');

// создание кнопок
function mixTags(n) {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15];
  // const arr = [];
  // for (let i = 0; arr.length < n; i += 1) {
  //   const digit = Math.floor(Math.random() * n);
  //   if (!arr.includes(digit)) {
  //     arr.push(digit);
  //   }
  // }
  return arr;
}

let digits = mixTags(16);
const matrix = digits.reduce(
  (rows, key, index) =>
    (index % 4 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
    rows,
  []
);

function createTagsHTML() {
  for (let i = 0; i < 16; i += 1) {
    const tag = document.createElement('div');
    tag.id = i;
    if (digits[i] === 0) {
      tag.classList.add('empty');
    } else {
      tag.classList.add('tag');
      tag.innerText = digits[i];
    }
    playingField.appendChild(tag);
  }
}
createTagsHTML();

function fromMatrixToArray(mtrx) {
  const arr = [];
  for (let i = 0; i < mtrx.length; i += 1) {
    for (let j = 0; j < mtrx[i].length; j += 1) {
      arr.push(matrix[i][j]);
    }
  }
  return arr;
}

function moveCurrentTag(tag) {
  const tags = document.querySelectorAll('.tag');
  let indexI;
  let indexJ;
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      if (matrix[i][j] === +tag.innerText) {
        indexI = i;
        indexJ = j;
      }
    }
  }

  if (matrix[indexI - 1] && matrix[indexI - 1][indexJ] === 0) {
    tags.forEach((tag) => {
      if (tag.innerText === matrix[indexI][indexJ].toString()) {
        tag.classList.add('animate-up');
        matrix[indexI][indexJ] = 0;
        matrix[indexI - 1][indexJ] = +tag.innerText;
        digits = fromMatrixToArray(matrix);
      }
    });
  }
  if (matrix[indexI + 1] && matrix[indexI + 1][indexJ] === 0) {
    tags.forEach((tag) => {
      if (tag.innerText === matrix[indexI][indexJ].toString()) {
        tag.classList.add('animate-down');
        matrix[indexI][indexJ] = 0;
        matrix[indexI + 1][indexJ] = +tag.innerText;
        digits = fromMatrixToArray(matrix);
      }
    });
  }
  if (matrix[indexI][indexJ - 1] === 0) {
    tags.forEach((tag) => {
      if (tag.innerText === matrix[indexI][indexJ].toString()) {
        tag.classList.add('animate-left');
        matrix[indexI][indexJ] = 0;
        matrix[indexI][indexJ - 1] = +tag.innerText;
        digits = fromMatrixToArray(matrix);
      }
    });
  }
  if (matrix[indexI][indexJ + 1] === 0) {
    tags.forEach((tag) => {
      if (tag.innerText === matrix[indexI][indexJ].toString()) {
        tag.classList.add('animate-right');
        matrix[indexI][indexJ] = 0;
        matrix[indexI][indexJ + 1] = +tag.innerText;
        digits = fromMatrixToArray(matrix);
      }
    });
  }
}

function isWinner() {
  const winMatrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 0],
  ];
  if (winMatrix.toString() === matrix.toString()) {
    if (soundIco.classList.contains('active')) {
      const winnerSound = new Audio('./assets/sound/winner.mp3');
      winnerSound.autoplay = true;
    }
    const element = document.createElement('div');
    document.body.append(element);
    element.classList.add('finish-popup');
    const paragraph = document.createElement('p');
    element.append(paragraph);
    paragraph.innerText = `Hooray! You solved the puzzle in ${timeSpan.textContent} and ${movesSpan.textContent} moves!`;
    stopTimer();
  }
}

playingField.addEventListener('click', (e) => {
  const tag = e.target;
  moveCurrentTag(tag);
  soundOn();
  movesCount += 1;
  movesSpan.innerText = movesCount;
  isWinner();
});

playingField.addEventListener('transitionend', () => {
  while (playingField.firstChild) {
    playingField.removeChild(playingField.lastChild);
  }
  createTagsHTML();
  playingField.removeEventListener('click', startTimer);
});

// move sound

function soundOn() {
  const sound = new Audio('./assets/sound/move.mp3');
  if (soundIco.classList.contains('active')) {
    sound.autoplay = true;
  } else {
    sound.autoplay = false;
  }
}

soundIco.addEventListener('click', () => {
  soundIco.classList.toggle('active');
});

// clock

let startTime = 0;
let timer;

function convertTimeToString() {
  const current = startTime;
  const date = new Date(current * 10);
  const minutes = date.getUTCMinutes();
  const seconds = date.getSeconds();

  const result = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  timeSpan.textContent = result;
}

function startTimer() {
  timer = setInterval(() => {
    startTime += 1;

    convertTimeToString();
  }, 10);
}

function stopTimer() {
  clearInterval(timer);
}

stopBTN.addEventListener('click', stopTimer);
playingField.addEventListener('click', startTimer);
