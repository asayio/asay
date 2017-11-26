// ActionTypes
export const actionTypes = {
  GET_COMPLETE: 'user/GET_COMPLETE',
  GET_ERROR: 'user/GET_ERROR',
  GET_REQUEST: 'user/GET_REQUEST'
}

// Reducer
const initialState = {
  data: null,
  canSubmit: true,
  isFetching: null
}

export default function reducer(state = initialState, action = null) {
  const { type, payload } = action

  switch (type) {
    case actionTypes.GET_REQUEST: {
      return Object.assign({}, state, {
        data: null,
        isFetching: true
      })
    }
    default: {
      return state
    }
  }
}
