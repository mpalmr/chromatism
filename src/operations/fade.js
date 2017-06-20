import slopeMod from '../helpers/slope-mod'
import makeColourObject from './convert'
import convert from '../helpers/convert-to-type'

export default function fade (amount, fromRef, toRef) {
  const fromColour = convert('rgb', fromRef)
  const toColour = convert('rgb', toRef)

  const colours = [ fromColour ]
  amount = amount - 1

  const rDiff = (toColour.r - fromColour.r) / (amount)
  const gDiff = (toColour.g - fromColour.g) / (amount)
  const bDiff = (toColour.b - fromColour.b) / (amount)
  const colour = { r: fromColour.r, g: fromColour.g, b: fromColour.b }

  for (let i = 0; i < (amount - 1); i++) {
    colour.r = slopeMod(colour.r + rDiff, 255)
    colour.g = slopeMod(colour.g + gDiff, 255)
    colour.b = slopeMod(colour.b + bDiff, 255)
    colours.push({ r: colour.r, g: colour.g, b: colour.b })
  }

  colours.push(toColour)

  return makeColourObject(colours)
}
