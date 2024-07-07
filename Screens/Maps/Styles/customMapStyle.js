const customMapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#E9E3C4' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#593A1F' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#FFFFFF' }] },
    {
      featureType: 'all',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#D6C9A6' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry.fill',
      stylers: [{ color: '#A9DEF2' }],
    },
  ];

  export default customMapStyle;
