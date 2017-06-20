import toRadian from '../helpers/to-radian'
import getTransform from '../helpers/get-transform'

export default {
  cieluv: value => {
    const h = toRadian(value.h)

    const u = value.C * Math.cos(h)
    const v = value.C * Math.sin(h)

    return {
      L: value.L,
      u,
      v
    }
  },

  hsluv: value => {
    if (value.L > 99.9999999) {
      return { hu: value.h, s: 0, l: 100 }
    }
    if (value.L < 0.00000001) {
      return { hu: value.h, s: 0, l: 0 }
    }

    const epsilon = 0.008856
    const kappa = 903.3

    const s1 = (value.L + 16) / 1560896
    const s2 = s1 > epsilon ? s1 : value.L / kappa

    const m = getTransform('INVERSE_SRGB_XYZ')
    const rays = []

    for (let c = 0; c < 3; c++) {
      const m1 = m[c][0]
      const m2 = m[c][1]
      const m3 = m[c][2]

      for (let t = 0; t < 2; t++) {
        const top1 = (284517 * m1 - 94839 * m3) * s2
        const top2 = (838422 * m3 + 769860 * m2 + 731718 * m1) * value.L * s2 - 769860 * t * value.L
        const bottom = (632260 * m3 - 126452 * m2) * s2 + 126452 * t

        rays.push({
          m: top1 / bottom,
          b: top2 / bottom
        })
      }
    }

    let min = Number.MAX_VALUE
    const hrad = toRadian(value.h)

    rays.forEach((ray) => {
      const length = ray.b / (Math.sin(hrad) - ray.m * Math.cos(hrad))
      if (length >= 0) {
        min = Math.min(min, length)
      }
    })

    const max = min

    return {
      hu: value.h,
      s: value.C / max * 100,
      l: value.L
    }
  }
}
