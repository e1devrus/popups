import './style.css';
import * as popups from './popups';

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerText = 'Нажатие Enter откроет новый Confirm, нажатие пробела откроет новый Notify';

  document.addEventListener('keyup', async (event) => {
    switch (event.key) {
      case 'Enter':
        const result = await popups.confirm();
        console.log(result);
        break;
      case ' ':
        await popups.notify();
        break;
      default: break;
    }
  });
});
