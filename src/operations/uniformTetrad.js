import makeColourObject from './convert'
import convert from '../helpers/convert-to-type'

export default function tetrad (colourRef) {
  const colour = convert('hsluv', colourRef)

  const colours = [{ hu: colour.hu, s: colour.s, l: colour.l }]
  for (let i = 0; i < 3; i++) {
    colour.hu = (colour.hu + 90) % 360
    colours.push({ h: colour.hu, s: colour.s, l: colour.l })
  }

  return makeColourObject(colours)
}
