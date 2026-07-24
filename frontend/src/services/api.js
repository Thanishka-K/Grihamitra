// This file will communicate with your local Node.js Express server
const API_BASE_URL = 'http://localhost:3000/api';

export const analyzeApplianceImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE_URL}/vision/analyze-appliance`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) throw new Error('Failed to analyze image');
    return await response.json(); 
  } catch (error) {
    console.error("Error in analyzeApplianceImage:", error);
    return null;
  }
};

export const translateAudio = async (audioBlob, sourceLang, targetLang) => {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('sourceLang', sourceLang);
    formData.append('targetLang', targetLang);

    const response = await fetch(`${API_BASE_URL}/voice/translate`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Failed to translate audio');
    return await response.blob(); 
  } catch (error) {
    console.error("Error in translateAudio:", error);
    return null;
  }
};