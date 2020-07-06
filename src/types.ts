export type State = Record<string, any>
export type GenerateType<R, T = State> = (state: T) => R

export interface Getters {
  [property: string]: (state: State) => any
}

export type MutationValue = Record<string, any> | string | undefined | number | Array<any>

export interface Mutations {
  [property: string]: (state: State, value: MutationValue) => void
}
