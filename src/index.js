import './style.css';
import * as popups from './popups';

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerText = 'Нажатие Enter откроет новый Confirm, нажатие пробела откроет новый Notify';

  document.addEventListener('keyup', async (event) => {
    switch (event.key) {
      case 'Enter':
        const result = await popups.confirm(`Окно подтверждения №${Math.floor(Math.random() * 1000000)}`);
        console.log(result);
        break;
      case ' ':
        await popups.notify(`Окно уведомления №${Math.floor(Math.random() * 1000000)}`);
        break;
      default: break;
    }
  });
});
