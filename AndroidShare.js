//-----------Dit zijn de twee variables van de knoppen-----------------//
const buttonVid = document.querySelector('#shareVid');                  
const buttonImage = document.querySelector('#shareImage');              
//---------------------------------------------------------------------//

//-----------Dit zijn de twee variables van de video en de image-------//
const video =  document.querySelector('video');
const image = document.querySelector('img');
//---------------------------------------------------------------------//

//checkt of je kan sharen//
const webShareSupported = 'canShare' in navigator;
//---- Dit is de functie die ervoor zorgt dat de src van de image/video word omgezet in file----//
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

//Video Event Listener die video shared
buttonVid.addEventListener('click', async () => {
  const blob = await fetch(video.src).then(res => res.blob());
  await shareOrDownload(blob, 'video.mp4', '(TITLE)', '(EXTRA TEXT)');
});

//Image Event Listener die image shared
buttonImage.addEventListener('click', async () => {
    const blob = await fetch(image.src).then(res => res.blob());
    await shareOrDownload(blob, 'image.jpg', '(TITLE)', '(EXTRA TEXT)');
  });