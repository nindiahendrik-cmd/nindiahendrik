// Nama tamu dapat dikirim melalui tautan ?to=Nama%20Tamu
const params = new URLSearchParams(window.location.search);
const guest = params.get('to');
const guestNameElement = document.getElementById('guestName');
if (guest && guestNameElement) guestNameElement.textContent = guest.replace(/\+/g, ' ');

const openButton = document.getElementById('openInvitation');
const opening = document.getElementById('opening');
const mainContent = document.getElementById('mainContent');
const music = document.getElementById('weddingMusic');
const musicButton = document.getElementById('musicButton');

openButton?.addEventListener('click', async () => {
  opening.style.display = 'none';
  mainContent.classList.remove('hidden');
  window.scrollTo(0, 0);
  try { await music.play(); musicButton.textContent = '♫'; }
  catch (error) { console.info('Musik belum dapat diputar. Tambahkan file assets/music/lagu.mp3.', error); }
});

musicButton?.addEventListener('click', async () => {
  if (music.paused) {
    try { await music.play(); musicButton.textContent = '♫'; }
    catch (error) { console.info('Musik belum dapat diputar.', error); }
  } else { music.pause(); musicButton.textContent = '🔇'; }
});

// Waktu 12.00 WIB dipakai sebagai perkiraan karena undangan hanya menyebut Siang / Malam.
const weddingDate = new Date('2026-12-15T12:00:00+07:00').getTime();
function updateCountdown() {
  const distance = weddingDate - Date.now();
  const values = distance <= 0 ? [0, 0, 0, 0] : [
    Math.floor(distance / 86400000),
    Math.floor((distance / 3600000) % 24),
    Math.floor((distance / 60000) % 60),
    Math.floor((distance / 1000) % 60)
  ];
  ['days', 'hours', 'minutes', 'seconds'].forEach((id, index) => {
    const element = document.getElementById(id);
    if (element) element.textContent = values[index];
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);
