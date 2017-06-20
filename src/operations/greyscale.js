import makeColourObject from './convert'
import convert from '../helpers/convert-to-type'

export default function greyscale (colourRef) {
  let colour = convert('rgb', colourRef)

  const grey = ((colour.r + colour.g + colour.b) / 3)
  colour = { r: grey, g: grey, b: grey }

  return makeColourObject(colour)
}
