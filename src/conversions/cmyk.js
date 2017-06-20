const rgb = value => {
  const r = 255 * (1 - value.c) * (1 - value.k)
  const g = 255 * (1 - value.m) * (1 - value.k)
  const b = 255 * (1 - value.y) * (1 - value.k)
  return { r: r, g: g, b: b }
}

export default {
  rgb,

  cssrgb: value => {
    const { r, g, b } = rgb(value)

    return 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')'
  }
}
