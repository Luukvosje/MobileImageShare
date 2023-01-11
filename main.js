const output = document.getElementById('output')


document.getElementById('share').addEventListener('click', async () => {

    const files = 'https://brainport.s3.amazonaws.com/rendered_videos/2023/1/5/638085335677985230.mp4';

    console.log(files);
  
    if (!navigator.canShare) {
    output.textContent = `Your browser doesn't support the Web Share API.`;
    return
  }
console.log("test");
  if (navigator.canShare) {
    try {
      await navigator.share({
        url: 'https://brainport.s3.amazonaws.com/rendered_videos/2023/1/5/638085335677985230.mp4',
        title: 'Images',
        text: 'Beautiful images'
      })
      output.textContent = 'Shared!'
    } catch (error) {
      output.textContent = `Error: ${error.message}`
    }
  } else {
    output.textContent = `Your system doesn't support sharing these files.`;
  }
})
