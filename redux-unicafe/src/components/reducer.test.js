import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const newState = counterReducer(undefined, { type: 'DO_NOTHING' })
    expect(newState).toEqual(initialState)
  })

  it('good is incremented', () => {
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, { type: 'GOOD' })
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  it('ok is incremented', () => {
    const action = {
      type: 'OK'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  it('bad is incremented', () => {
    const action = {
      type: 'BAD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  it('reset resets', () => {
    const state = initialState
    deepFreeze(state)

    let newState = state
    newState = counterReducer(newState, { type: 'GOOD' })
    newState = counterReducer(newState, { type: 'OK' })
    newState = counterReducer(newState, { type: 'BAD' })
    newState = counterReducer(newState, { type: 'ZERO' })
    expect(newState).toEqual(initialState)
  })
})
