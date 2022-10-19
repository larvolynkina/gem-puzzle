const buttonsWrapper = document.createElement('div');
document.body.append(buttonsWrapper);
buttonsWrapper.classList.add('buttons-wrapper');

const soundIco = document.createElement('div');
buttonsWrapper.append(soundIco);
soundIco.classList.add('sound-ico');

// создание игрового поля
const playingField = document.createElement('div');
document.body.append(playingField);
playingField.classList.add('playing-field');

// создание кнопок
function mixTags(n) {
  const arr = [];
  for (let i = 0; arr.length < n; i += 1) {
    const digit = Math.floor(Math.random() * n);
    if (!arr.includes(digit)) {
      arr.push(digit);
    }
  }
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

playingField.addEventListener('click', (e) => {
  const tag = e.target;
  moveCurrentTag(tag);
  soundOn();
});

playingField.addEventListener('transitionend', () => {
  while (playingField.firstChild) {
    playingField.removeChild(playingField.lastChild);
  }
  createTagsHTML();
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
