import './index.scss';
import main from './app/main';

if (process.env.PLATFORM === 'cordova') {
    document.addEventListener('deviceready', () => {
        main();
    }, false);
} else {
    main();
}
