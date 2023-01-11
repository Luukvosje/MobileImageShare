const output = document.getElementById('output')
console.log("test");
document.getElementById('share').addEventListener('click', async () => {
    console.log("test");

    const files = 'https://brainport.s3.amazonaws.com/rendered_videos/2023/1/5/638085335677985230.mp4';

    let response = await fetch('https://drm-zapworks.s3.eu-west-1.amazonaws.com/looop/videos/03_Frank_Lavrijsen_Clean.mp4');
    let data = await response.blob();
    let metadata = {
      type: 'video/mp4'
    };
    let file = new File([data], "test.mp4", metadata);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    // ... do something with the file or return it
    
    console.log(file);
    console.log(reader);
  
    if (!navigator.canShare) {
    output.textContent = `Your browser doesn't support the Web Share API.`;
    return
  }
  if (navigator.canShare) {
    try {
      await navigator.share({
        url: "https://drm-zapworks.s3.eu-west-1.amazonaws.com/looop/videos/03_Frank_Lavrijsen_Clean.mp4",
      })
      output.textContent = 'Shared!'
    } catch (error) {
      output.textContent = `Error: ${error.message}`
    }
  } else {
    output.textContent = `Your system doesn't support sharing these files.`;
  }
})
