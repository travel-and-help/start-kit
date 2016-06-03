import 'babel-polyfill';
import 'whatwg-fetch';

import './index.scss';
import main from './app/main';

if (process.env.PLATFORM === 'cordova') {
    const script = document.createElement('script');
    script.setAttribute('src', 'cordova.js');
    document.head.appendChild(script);

    document.addEventListener('deviceready', () => {
        main();
    }, false);
} else {
    main();
}
