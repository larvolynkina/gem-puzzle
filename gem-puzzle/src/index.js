const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.append(overlay);

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
    text: 'Pause',
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
const resultsBTN = document.querySelector('.result');

const soundIco = document.createElement('div');
infoWrapper.append(soundIco);
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
    size: '3x3',
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
    size: '4x4',
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
    size: '5x5',
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
    size: '6x6',
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
    size: '7x7',
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
    size: '8x8',
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

// const resultsObject = [
//   {
//     size: '3x3',
//     moves: 44,
//     time: '01:12',
//   },
//   {
//     size: '3x3',
//     moves: 140,
//     time: '02:12',
//   },
//   {
//     size: '4x4',
//     moves: 17,
//     time: '03:12',
//   },
// ];

function sortResults(arr) {
  const result = arr.sort((a, b) => a.moves - b.moves);
  return result;
}

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

  function necessaryCommonActions() {
    digits = fromMatrixToArray(matrix);
    movesCount += 1;
    movesSpan.innerText = movesCount;
    soundOn();
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
        necessaryCommonActions();
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
        necessaryCommonActions();
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
        necessaryCommonActions();
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
        necessaryCommonActions();
      }
    });
  }
  isMouseEvent = false;
}

let resultsObject = [];

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
    overlay.classList.add('active');

    stopTimer();

    const results = {
      size: settings[currentSize].size,
      moves: movesCount,
      time: timeSpan.textContent,
    };

    if (resultsObject.length < 10) {
      resultsObject.push(results);
    } else {
      resultsObject.pop();
      resultsObject.push(results);
    }

    resultsObject = sortResults(resultsObject);
    localStorage.setItem('array', JSON.stringify(resultsObject));
    resultsObject = JSON.parse(localStorage.getItem('array'));

    removeRowsFromTable();
    addRowWithResult();
  }
}

function moveTagAfterClick(event) {
  const tag = event.target;
  if (tag.classList.contains('tag')) {
    moveCurrentTag(tag);
    const timeout = setTimeout(isWinner, 300);
    // isWinner();
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

stopBTN.addEventListener('click', () => {
  if (stopBTN.textContent === 'Pause') {
    stopBTN.textContent = 'Continue';
    stopTimer();
    playingField.removeEventListener('click', moveTagAfterClick);
    playingField.removeEventListener('mousedown', moveTagWithMouse);
  } else {
    startTimer();
    stopBTN.textContent = 'Pause';
    playingField.addEventListener('click', moveTagAfterClick);
    playingField.addEventListener('mousedown', moveTagWithMouse);
  }
});

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
  stopBTN.textContent = 'Pause';
  playingField.addEventListener('click', moveTagAfterClick);
  playingField.addEventListener('mousedown', moveTagWithMouse);
});

// restart

restartBTN.addEventListener('click', () => {
  restartTimeAndMoveCounts();
  drawPlayingField();
  stopBTN.textContent = 'Pause';
  playingField.addEventListener('click', moveTagAfterClick);
  playingField.addEventListener('mousedown', moveTagWithMouse);
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
  stopBTN.textContent = 'Pause';
  playingField.addEventListener('click', moveTagAfterClick);
  playingField.addEventListener('mousedown', moveTagWithMouse);
});

if (localStorage.getItem('array')) {
  resultsObject = JSON.parse(localStorage.getItem('array'));
}

let sortedResults = sortResults(resultsObject);

const resultsHeaders = ['Size', 'Moves', 'Time'];

const tableWrapper = document.createElement('div');
tableWrapper.classList.add('table-wrapper');
const table = document.createElement('table');
table.classList.add('results');
const caption = document.createElement('caption');
caption.textContent = 'Top-10 results';
table.append(caption);
const headersRow = document.createElement('tr');
table.append(headersRow);

resultsHeaders.forEach((item, index, array) => {
  const element = document.createElement('th');
  element.textContent = array[index];
  headersRow.append(element);
});

function removeRowsFromTable() {
  const allResultsRows = document.querySelectorAll('tr');
  allResultsRows.forEach((item) => {
    if (item.classList.contains('row')) {
      table.removeChild(item);
    }
  });
}

function addRowWithResult() {
  if (localStorage.getItem('array')) {
    resultsObject = JSON.parse(localStorage.getItem('array'));
  }
  sortedResults = sortResults(resultsObject);

  sortedResults.forEach((item) => {
    const row = document.createElement('tr');
    row.classList.add('row');
    const size = document.createElement('td');
    size.textContent = item.size;
    row.append(size);
    const moves = document.createElement('td');
    moves.textContent = item.moves;
    row.append(moves);
    const time = document.createElement('td');
    time.textContent = item.time;
    row.append(time);
    table.append(row);
  });
}

addRowWithResult();

tableWrapper.append(table);
document.body.append(tableWrapper);

resultsBTN.addEventListener('click', () => {
  table.classList.add('active');
  overlay.classList.add('active');
  removeRowsFromTable();
  addRowWithResult();
  stopTimer();
});

overlay.addEventListener('click', () => {
  overlay.classList.remove('active');
  if (document.querySelector('.finish-popup')) {
    document.querySelector('.finish-popup').remove();
    restartTimeAndMoveCounts();
    drawPlayingField();
  }
  if (table.classList.contains('active')) {
    startTimer();
  }
  table.classList.remove('active');
});
