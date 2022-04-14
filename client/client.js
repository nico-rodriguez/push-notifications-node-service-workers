// This is a public key, so there's no problem exposing it
const publicVAPIDKey =
  'BMpl306Hkka2x5aVNUfE-W9RN61IN6NoUi4nD2IPz1TolboC-dhMlX78y1AI61rMHEwT50GYx1EncSyn_vD8EY4';

// Check for a service worker
if ('serviceWorker' in navigator) {
  registerSW()
    // wait for the SW registration to complete
    .then((swRegistration) => navigator.serviceWorker.ready)
    .then(registerPush)
    .then(sendPushSubscription)
    .catch(console.error);
}

// Register SW
function registerSW() {
  console.log('Registering SW...');
  const swRegistration = navigator.serviceWorker.register('./worker.js', {
    scope: '/',
  });
  console.log('SW registered!');
  return swRegistration;
}

// Register push
function registerPush(swRegistration) {
  console.log('Registering push...');
  const subscription = swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVAPIDKey,
  });
  console.log('Push registered!');
  return subscription;
}

// Send push notification
function sendPushSubscription(subscription) {
  console.log('Sending push subscription...');
  const response = fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify({ subscription }),
    headers: {
      'content-type': 'application/json',
    },
  });
  console.log('Push subscription sent!');
  return response;
}
