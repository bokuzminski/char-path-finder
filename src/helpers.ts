export function characterIsLetterWeHaveToCollect(character: string) {
  return character.length === 1 && character.match(/[A-Z]/);
}
