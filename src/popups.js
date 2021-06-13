const DEFAULT_Z_INDEX = 1000;

const popups = [];

const removeLastPopup = () => {
  if (popups.length > 0) {
    popups.pop().remove();
  }
};

document.addEventListener('keyup', (event) => {
  if (event.key === 'Escape') {
    removeLastPopup();
  }
});

const createPopup = ({
  text,
  buttons,
}) => {
  const wrapper = document.createElement('div');
  wrapper.className = 'popupWrapper';
  wrapper.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      removeLastPopup();
    }
  });

  const newPopup = document.createElement('div');
  newPopup.className = 'popup';
  newPopup.innerText = text;

  const closePopup = document.createElement('div');
  closePopup.className = 'popupClose';
  closePopup.innerText = 'Закрыть';
  closePopup.addEventListener('click', () => {
    removeLastPopup();
  });
  newPopup.appendChild(closePopup);

  const buttonsWrapper = document.createElement('div');
  buttonsWrapper.className = 'buttonsWrapper';
  buttonsWrapper.style.justifyContent = buttons.length > 1 ? 'space-between' : 'center';

  const zIndex = DEFAULT_Z_INDEX + popups.length * 3 + 3;
  wrapper.zIndex = zIndex;
  newPopup.zIndex = zIndex + 1;
  closePopup.zIndex = zIndex + 2;

  popups.push(wrapper);

  buttons.forEach((button) => buttonsWrapper.appendChild(button));

  newPopup.appendChild(buttonsWrapper);

  wrapper.appendChild(newPopup);

  document.body.appendChild(wrapper);
};

export const confirm = async (text) => new Promise((resolve) => {
  const confirmBtn = document.createElement('button');
  confirmBtn.innerText = 'Подтвердить';
  confirmBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    removeLastPopup();
    resolve(true);
  });

  const dismissBtn = document.createElement('button');
  dismissBtn.innerText = 'Отклонить';
  dismissBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    removeLastPopup();
    resolve(false);
  });

  createPopup({
    text,
    buttons: [confirmBtn, dismissBtn],
  });
});

export const notify = async (text) => new Promise((resolve) => {
  const okBtn = document.createElement('button');
  okBtn.innerText = 'Ок';
  okBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    removeLastPopup();
    resolve();
  });

  createPopup({
    text,
    buttons: [okBtn],
  });
});
