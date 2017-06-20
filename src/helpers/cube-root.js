export default function cubeRoot (x) {
  if (!Math.cbrt) {
    const y = Math.pow(Math.abs(x), 1 / 3)
    return x < 0 ? -y : y
  } else {
    return Math.cbrt(x)
  }
}
