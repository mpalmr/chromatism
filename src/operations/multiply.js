import makeColourObject from './convert'
import convert from '../helpers/convert-to-type'

export default function multiply (colourRefOne, colourRefTwo) {
  const c1 = convert('hsl', colourRefOne)
  const c2 = convert('hsl', colourRefTwo)

  const colour = { h: c1.h, s: c1.s, l: 100 * ((c1.l / 100) * (c2.l / 100)) }
  colour.l = (colour.l > 100 ? 100 : colour.l)
  colour.l = (colour.l < 0 ? 0 : colour.l)

  return makeColourObject(colour)
}
