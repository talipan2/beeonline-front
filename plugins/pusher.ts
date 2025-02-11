import Pusher from 'pusher-js';

export default defineNuxtPlugin((nuxtApp) => {
	window.Pusher = Pusher;
});
