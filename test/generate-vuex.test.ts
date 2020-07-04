import { setFuncName } from "../src/ts-generate-vuex"

describe("GenerateVuex test", () => {
  [['test', 'setTest'], ['Test', 'setTest']].forEach(([input, output], index) => {
    it("setFuncName" + index, () => {
      expect(setFuncName(input)).toBe(output)
    })
  })
})
