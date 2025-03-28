export const getColorFromId = (id: string) => {
  // Use a more robust hashing function
  const hashCode = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  };

  // Generate a stable but varied hash
  const hash = hashCode(id);

  // More controlled randomness
  const hueVariation = [
    // Predefined color palettes with some randomness
    [0, 30], // Reds and Oranges
    [30, 60], // Yellows
    [60, 120], // Greens
    [120, 180], // Teals
    [180, 240], // Blues
    [240, 300], // Purples
    [300, 360], // Magentas
  ];

  // Select a color palette based on the hash
  const selectedPalette = hueVariation[hash % hueVariation.length];

  // Generate hue within the selected palette
  const hue =
    selectedPalette[0] + (hash % (selectedPalette[1] - selectedPalette[0]));

  // More controlled saturation and lightness
  const saturation = 50 + (hash % 30); // 50-80%
  const lightness = 40 + (hash % 20); // 40-60%

  // Optional: Add a seed-based randomness factor
  const randomFactor = Math.sin(hash) * 10;

  // Adjust final color with some additional variation
  return `hsl(
    ${(hue + randomFactor) % 360}, 
    ${saturation}%, 
    ${lightness}%
  )`;
};
