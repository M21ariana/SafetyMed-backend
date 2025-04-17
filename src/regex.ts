export function encodeSpecialCharacters(inputString: string) {
    const encodingMap = {
      ':': '%3A',
      '?': '%3F',
      '#': '%23',
      '@': '%40',
      '!': '%21',
      '$': '%24',
    };
  
    let encodedString = inputString;
    for (const [char, encoding] of Object.entries(encodingMap)) {
      encodedString = encodedString.split(char).join(encoding);
    }
  
    return encodedString;
  }