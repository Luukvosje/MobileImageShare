const buttonVid = document.querySelector('#shareVid');
const buttonImage = document.querySelector('#shareImage');
const video =  document.querySelector('video');
const image = document.querySelector('img');

const webShareSupported = 'canShare' in navigator;

const shareOrDownload = async (blob, fileName, title, text) => {
  if (webShareSupported) {
    const data = {
      files: [
        new File([blob], fileName, {
          type: blob.type,
        }),
      ],
      title,
      text,
    };
    if (navigator.canShare(data)) {
      try {
        await navigator.share(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err.name, err.message);
        }
      } finally {
        return;
      }
    }
  }
  // Fallback
  const a = document.createElement('a');
  a.download = fileName;
  a.style.display = 'none';
  a.href = URL.createObjectURL(blob);
  a.addEventListener('click', () => {
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 1000)
  });
  document.body.append(a);
  a.click();
};

buttonVid.addEventListener('click', async () => {
  const blob = await fetch(video.src).then(res => res.blob());
  await shareOrDownload(blob, 'vid  .mp4', 'Cat in the snow', 'Getting cold feet…');
});

buttonImage.addEventListener('click', async () => {
    const blob = await fetch(image.src).then(res => res.blob());
    await shareOrDownload(blob, 'img  .jpg', 'Cat in the snow', 'PSVVV');
  });