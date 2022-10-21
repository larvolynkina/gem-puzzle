const buttonsWrapper = document.createElement('div');
document.body.append(buttonsWrapper);
buttonsWrapper.classList.add('buttons-wrapper');

const infoWrapper = document.createElement('div');
document.body.append(infoWrapper);
infoWrapper.classList.add('info-wrapper');

let movesCount = 0;
let isMouseEvent = false;

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
  paragraph.innerText = `${item.text}: `;
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
    text: 'Load',
    class: 'load',
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
const restartBTN = document.querySelector('.restart');
const saveBTN = document.querySelector('.save');
const loadBTN = document.querySelector('.load');

const soundIco = document.createElement('div');
buttonsWrapper.append(soundIco);
soundIco.classList.add('sound-ico');

const linksWrapper = document.createElement('div');
linksWrapper.classList.add('links-wrapper');
document.body.append(linksWrapper);
const linkSpan = document.createElement('span');
linkSpan.innerText = 'Other sizes:';
linksWrapper.append(linkSpan);

const sizeLinksObject = [
  {
    text: '3x3',
    class: 'nine',
  },
  {
    text: '4x4',
    class: 'sixteen',
  },
  {
    text: '5x5',
    class: 'twentyfive',
  },
  {
    text: '6x6',
    class: 'thirtysix',
  },
  {
    text: '7x7',
    class: 'fortynine',
  },
  {
    text: '8x8',
    class: 'sixtyfour',
  },
];

sizeLinksObject.forEach((item) => {
  const element = document.createElement('a');
  element.innerText = item.text;
  element.classList.add('size-link');
  element.id = item.class;
  linksWrapper.append(element);
});

const sixteenLink = document.querySelector('#sixteen');
sixteenLink.classList.add('active');

const allSizeLinks = document.querySelectorAll('.size-link');

const settings = {
  nine: {
    digits: 9,
    width: '33.3',
    height: '33.3',
    winMatrix: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 0],
    ],
  },
  sixteen: {
    digits: 16,
    width: '25',
    height: '25',
    winMatrix: [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 0],
    ],
  },
  twentyfive: {
    digits: 25,
    width: '20',
    height: '20',
    winMatrix: [
      [1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20],
      [21, 22, 23, 24, 0],
    ],
  },
  thirtysix: {
    digits: 36,
    width: '16.6',
    height: '16.6',
    winMatrix: [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
      [31, 32, 33, 34, 35, 0],
    ],
  },
  fortynine: {
    digits: 49,
    width: '14.28',
    height: '14.28',
    winMatrix: [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 31, 32, 33, 34, 35],
      [36, 37, 38, 39, 40, 41, 42],
      [43, 44, 45, 46, 47, 48, 0],
    ],
  },
  sixtyfour: {
    digits: 64,
    width: '12.5',
    height: '12.5',
    winMatrix: [
      [1, 2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15, 16],
      [17, 18, 19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30, 31, 32],
      [33, 34, 35, 36, 37, 38, 39, 40],
      [41, 42, 43, 44, 45, 46, 47, 48],
      [49, 50, 51, 52, 53, 54, 55, 56],
      [57, 58, 59, 60, 61, 62, 63, 0],
    ],
  },
};

let currentSize;

function whichSizeActive() {
  allSizeLinks.forEach((item) => {
    if (item.classList.contains('active')) {
      currentSize = item.id;
    }
  });
}

whichSizeActive();

// создание игрового поля
const playingField = document.createElement('div');
document.body.append(playingField);
playingField.classList.add('playing-field');

// создание кнопок

function isPossibletoSolve(digits) {
  let amount = 0;

  for (let i = 0; i < digits.length; i += 1) {
    const afterCurrent = digits.slice(i + 1);
    const count = afterCurrent.filter(
      (value) => +value < +digits[i] && +value !== 0
    ).length;
    amount += count;
  }

  let flag = false;

  if (digits.length % 2 === 0) {
    amount += Math.ceil(
      (digits.indexOf(0) + 1) / Math.sqrt(settings[currentSize].digits)
    );
    if (amount % 2 === 0) {
      flag = true;
    } else {
      flag = false;
    }
  }

  if (digits.length % 2 !== 0) {
    if (amount % 2 === 0) {
      flag = true;
    } else {
      flag = false;
    }
  }
  return flag;
}

function mixTags(n) {
  // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15];
  // const arr = [1, 2, 3, 4, 5, 6, 7, 0, 8];

  const arr = [];
  for (let i = 0; arr.length < n; i += 1) {
    const digit = Math.floor(Math.random() * n);
    if (!arr.includes(digit)) {
      arr.push(digit);
    }
  }
  const checkFlag = isPossibletoSolve(arr);

  if (checkFlag) {
    return arr;
  }
  return mixTags(n);
}

let digits;
let matrix;

function createGameMatrix(n, saveArr) {
  if (saveArr) {
    digits = saveArr;
  } else {
    digits = mixTags(settings[currentSize].digits);
  }
  matrix = digits.reduce(
    (rows, key, index) =>
      (index % Math.sqrt(n) === 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    []
  );
}

createGameMatrix(settings[currentSize].digits);

function createTagsHTML(n) {
  for (let i = 0; i < n; i += 1) {
    const tag = document.createElement('div');
    tag.id = i;
    if (digits[i] === 0) {
      tag.classList.add('empty');
    } else {
      tag.classList.add('tag');
      tag.innerText = digits[i];
    }
    tag.style.width = `${settings[currentSize].width}%`;
    tag.style.height = `${settings[currentSize].height}%`;
    playingField.appendChild(tag);
  }
}
createTagsHTML(settings[currentSize].digits);

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
        if (!isMouseEvent) {
          tag.classList.add('animate-up');
        } else {
          tag.classList.add('animate-up-mouse');
        }
        matrix[indexI][indexJ] = 0;
        matrix[indexI - 1][indexJ] = +tag.innerText;
        digits = fromMatrixToArray(matrix);
        movesCount += 1;
        movesSpan.innerText = movesCount;
      }
    });
  }
  if (matrix[indexI + 1] && matrix[indexI + 1][indexJ] === 0) {
    tags.forEach((tag) => {
      if (tag.innerText === matrix[indexI][indexJ].toString()) {
        if (!isMouseEvent) {
          tag.classList.add('animate-down');
        } else {
          tag.classList.add('animate-down-mouse');
        }
        matrix[indexI][indexJ] = 0;
        matrix[indexI + 1][indexJ] = +tag.innerText;
        digits = fromMatrixToArray(matrix);
        movesCount += 1;
        movesSpan.innerText = movesCount;
      }
    });
  }
  if (matrix[indexI][indexJ - 1] === 0) {
    tags.forEach((tag) => {
      if (tag.innerText === matrix[indexI][indexJ].toString()) {
        if (!isMouseEvent) {
          tag.classList.add('animate-left');
        } else {
          tag.classList.add('animate-left-mouse');
        }
        matrix[indexI][indexJ] = 0;
        matrix[indexI][indexJ - 1] = +tag.innerText;
        digits = fromMatrixToArray(matrix);
        movesCount += 1;
        movesSpan.innerText = movesCount;
      }
    });
  }
  if (matrix[indexI][indexJ + 1] === 0) {
    tags.forEach((tag) => {
      if (tag.innerText === matrix[indexI][indexJ].toString()) {
        if (!isMouseEvent) {
          tag.classList.add('animate-right');
        } else {
          tag.classList.add('animate-right-mouse');
        }
        matrix[indexI][indexJ] = 0;
        matrix[indexI][indexJ + 1] = +tag.innerText;
        digits = fromMatrixToArray(matrix);
        movesCount += 1;
        movesSpan.innerText = movesCount;
      }
    });
  }
  isMouseEvent = false;
}

function isWinner() {
  const { winMatrix } = settings[currentSize];
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

function moveTagAfterClick(event) {
  const tag = event.target;
  if (tag.classList.contains('tag')) {
    moveCurrentTag(tag);
    soundOn();
    isWinner();
  }
}

playingField.addEventListener('click', moveTagAfterClick);
playingField.addEventListener('transitionstart', () => {
  playingField.removeEventListener('click', moveTagAfterClick);
});

playingField.addEventListener('transitionend', () => {
  while (playingField.firstChild) {
    playingField.removeChild(playingField.lastChild);
  }
  createTagsHTML(settings[currentSize].digits);
  playingField.addEventListener('click', moveTagAfterClick);
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
startTimer();

// перерисовка на смену размера поля

function drawPlayingField() {
  whichSizeActive();
  createGameMatrix(settings[currentSize].digits);
  while (playingField.firstChild) {
    playingField.removeChild(playingField.lastChild);
  }
  createTagsHTML(settings[currentSize].digits);
  startTimer();
}

function restartTimeAndMoveCounts() {
  stopTimer();
  timeSpan.textContent = '00:00';
  startTime = 0;
  movesCount = 0;
  movesSpan.textContent = 0;
}

linksWrapper.addEventListener('click', (e) => {
  const currentLink = e.target;
  allSizeLinks.forEach((link) => {
    link.classList.remove('active');
  });
  currentLink.classList.add('active');
  restartTimeAndMoveCounts();
  drawPlayingField();
});

// restart

restartBTN.addEventListener('click', () => {
  restartTimeAndMoveCounts();
  drawPlayingField();
});

// drag-and-drop

function moveTagWithMouse(event) {
  const currentTag = event.target;
  const emptyIndex = digits.indexOf(0);
  const currentIndex = digits.indexOf(+currentTag.textContent);

  if (
    currentIndex + 1 === emptyIndex ||
    currentIndex - 1 === emptyIndex ||
    currentIndex + Math.sqrt(settings[currentSize].digits) === emptyIndex ||
    currentIndex - Math.sqrt(settings[currentSize].digits) === emptyIndex
  ) {
    currentTag.style.zIndex = 1000;

    const cursorXposition =
      currentTag.getBoundingClientRect().left +
      currentTag.getBoundingClientRect().width / 2;
    const cursorYposition =
      currentTag.getBoundingClientRect().top +
      currentTag.getBoundingClientRect().height / 2;

    function calcCurrentTagPosition(x, y) {
      currentTag.style.left = `${x - cursorXposition}px`;
      currentTag.style.top = `${y - cursorYposition}px`;
    }

    function moveTagWithMouse(event) {
      calcCurrentTagPosition(event.pageX, event.pageY);
      isMouseEvent = true;
    }

    document.body.addEventListener('mousemove', moveTagWithMouse);

    playingField.addEventListener('mouseup', () => {
      document.body.removeEventListener('mousemove', moveTagWithMouse);
    });
  }
}

playingField.addEventListener('mousedown', moveTagWithMouse);

// save and load

saveBTN.addEventListener('click', () => {
  localStorage.setItem('size', currentSize);
  localStorage.setItem('digits', digits);
  localStorage.setItem('moves', movesCount);
  localStorage.setItem('time', startTime);
});

loadBTN.addEventListener('click', () => {
  const size = localStorage.getItem('size', currentSize);
  const array = localStorage
    .getItem('digits', digits)
    .split(',')
    .map((x) => +x);
  const moves = +localStorage.getItem('moves', movesCount);
  const time = +localStorage.getItem('time', startTime);
  currentSize = size;
  createGameMatrix(settings[currentSize].digits, array);
  while (playingField.firstChild) {
    playingField.removeChild(playingField.lastChild);
  }
  createTagsHTML(settings[currentSize].digits);
  restartTimeAndMoveCounts();
  startTime = time;
  movesCount = moves;
  movesSpan.textContent = movesCount;
  startTimer();
  allSizeLinks.forEach((item) => {
    item.classList.remove('active');
  });
  allSizeLinks.forEach((item) => {
    if (item.id === size) {
      item.classList.add('active');
    }
  });
});
