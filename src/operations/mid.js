import makeColourObject from './convert'
import convert from '../helpers/convert-to-type'

export default function mid (colourOneRef, colourTwoRef) {
  const colourOne = convert('hsl', colourOneRef)
  const colourTwo = convert('hsl', colourTwoRef)

  const midHue = (colourOne.h + colourTwo.h) / 2
  const midSat = (colourOne.s + colourTwo.s) / 2
  const midLight = (colourOne.l + colourTwo.l) / 2
  const colour = { h: midHue, s: midSat, l: midLight }

  return makeColourObject(colour)
}
