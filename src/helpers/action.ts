import { setFuncName } from './generate'
import { ActionOptions } from '../types'

// TODO: 可以直接包一个状态机进来
export function generateAction(
  generateActionOptions: ActionOptions,
  state?: Record<string, any>
): Function {
  const { func, stateName } = generateActionOptions
  return async function(context: any, params: Record<string, any>) {
    const result = await func(params)
    const { commit } = context
    if (result) {
      commit(setFuncName(stateName))
    }
  }
}

export function generateActions(
  optionsArray: Array<ActionOptions>,
  state?: Record<string, any>
): Array<Function> {
  return optionsArray.map((options: ActionOptions) => generateAction(options, state))
}
