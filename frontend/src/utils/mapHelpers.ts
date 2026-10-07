interface OpenMapParams {
  latitude: number;
  longitude: number;
  label?: string;
}

export const openInMaps = ({ latitude, longitude, label }: OpenMapParams) => {
  const isAppleDevice = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  
  if (isAppleDevice) {
    const appleMapsUrl = label 
      ? `https://maps.apple.com/?ll=${latitude},${longitude}&q=${encodeURIComponent(label)}`
      : `https://maps.apple.com/?ll=${latitude},${longitude}`;
    window.open(appleMapsUrl, '_blank');
  } else {
    // Google Maps is preferred for non-Apple devices
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(googleMapsUrl, '_blank');
  }
};
