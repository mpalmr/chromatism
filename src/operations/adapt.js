import getIlluminant from '../helpers/get-illuminant'
import matrixMultiply from '../helpers/matrix-multiply'
import getTransform from '../helpers/get-transform'
import convert from '../helpers/convert-to-type'
import makeColourObject from './convert'

export default function adapt (colourRef, illuminantDRef, illuminantSRef) {
  const colour = convert('XYZ', colourRef)
  const illuminantD = convert('lms', illuminantDRef)
  const illuminantS = illuminantSRef
    ? convert('lms', illuminantSRef)
    : convert('lms', getIlluminant('D65'))

  // Bradford Transformation
  const Mb = getTransform('BRADFORD')

  // Inverse Bradford Transformation
  const Mbi = getTransform('INVERSE_BRADFORD')

  // Illuminant Ratio Matrix
  const Mir = [
    [ illuminantD.rho / illuminantS.rho, 0, 0 ],
    [ 0, illuminantD.gamma / illuminantS.gamma, 0 ],
    [ 0, 0, illuminantD.beta / illuminantS.beta ]
  ]

  // Illuminant ratio matrix, pre-inversion
  const MbiMir = matrixMultiply(Mbi, Mir)

  // Illuminant ratio matrix
  const M = matrixMultiply(MbiMir, Mb)

  const valueArray = [ [ colour.X ], [ colour.Y ], [ colour.Z ] ]
  const resultArray = matrixMultiply(M, valueArray)

  return makeColourObject({
    X: resultArray[0][0],
    Y: resultArray[1][0],
    Z: resultArray[2][0]
  })
}
