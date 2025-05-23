export enum Spells {
  P = 0,
  Q = 1,
  W = 2,
  E = 3,
  R = 4,
}

export const spellToLabel = new Map<Spells, string>([
  [Spells.P, 'P'],
  [Spells.Q, 'Q'],
  [Spells.W, 'W'],
  [Spells.E, 'E'],
  [Spells.R, 'R'],
])

export function getSpellsList(): Array<[number, string]> {
  let result: Array<[number, string]> = [];

  Object.values(Spells).filter(element => typeof element === 'number')
    .map(key => {
      result.push([
        key as number,
        spellToLabel.get(key as Spells) as string,
      ]);
    });

  return result;
}
