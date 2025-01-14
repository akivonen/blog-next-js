export async function uploadImage(image) {
  if (!process.env.IMGBB_API_KEY) {
    throw new Error('IMGBB_API_KEY is not set');
  }

  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    
    if (result && result.data && result.data.url) {
      return result.data.url; 
    } else {
      throw new Error('Unexpected response format from ImgBB');
    }
  } catch (error) {
    console.error('Error uploading image to ImgBB:', error);
    throw error;
  }
}