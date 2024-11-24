async function rollNumber(inputString) {
  return Array.from(inputString)
    .map((char) => char.charCodeAt(0))
    .join("")
    .slice(0, 10);
}

export { rollNumber };
