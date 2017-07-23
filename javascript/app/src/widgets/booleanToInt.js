export default function booleanToInt(boolean) {
    const output = boolean === true ? 1 : (boolean === false ? -1 : 0)
    return output
  }
