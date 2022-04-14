console.log('SW loading...');

self.addEventListener('push', (event) => {
  const data = event.data.json();
  console.log('Push received!');
  self.registration.showNotification(data.title, {
    body: 'New notification!',
    icon: './notification.png',
  });
});

console.log('SW loaded!');
