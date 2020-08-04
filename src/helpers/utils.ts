const isObject = (val: any) => {
  return val !== null && typeof val === 'object'
}
function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
export { isObject, extend }
