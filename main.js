const shareData = {
  title: 'MDN',
  text: 'Learn web development on MDN!',
  url: 'https://www.google.com/chrome/static/images/home-experiment/hero-img_desktop.png'
}

const btn = document.querySelector('button');
const resultPara = document.querySelector('.result');

// Share must be triggered by "user activation"
btn.addEventListener('click', async () => {
  try {
    await navigator.share(shareData);
    resultPara.textContent = 'MDN shared successfully';
    console.log(suc6);
  } catch (err) {
    resultPara.textContent = `Error: ${err}`;
    console.log(err);
  }
});