const output = document.getElementById('output')


document.getElementById('share').addEventListener('click', async () => {


    const files = 'https://brainport.s3.amazonaws.com/rendered_videos/2023/1/5/638085335677985230.mp4';

    let response = await fetch('https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/640px-Google_Images_2015_logo.svg.png');
    let data = await response.blob();
    let metadata = {
      type: 'image/jpeg'
    };
    let file = new File([data], "test.jpg", metadata);
    // ... do something with the file or return it
    
    console.log(files);
  
    if (!navigator.canShare) {
    output.textContent = `Your browser doesn't support the Web Share API.`;
    return
  }
  if (navigator.canShare({file})) {
    try {
      await navigator.share({
        file
      })
      output.textContent = 'Shared!'
    } catch (error) {
      output.textContent = `Error: ${error.message}`
    }
  } else {
    output.textContent = `Your system doesn't support sharing these files.`;
  }
})
