// Import
import api from '../../../services/api'

// ActionTypes
export const actionTypes = {
  CREATE__COMPLETE: 'proposal/article/CREATE__COMPLETE',
  CREATE__ERROR: 'proposal/article/CREATE__ERROR',
  CREATE__REQUEST: 'proposal/article/CREATE__REQUEST',
  GET_COMPLETE: 'proposal/article/GET_COMPLETE',
  GET_ERROR: 'proposal/article/GET_ERROR',
  GET_REQUEST: 'proposal/article/GET_REQUEST',
  VOTE_COMPLETE: 'proposal/article/VOTE_COMPLETE',
  VOTE_ERROR: 'proposal/article/VOTE_ERROR',
  VOTE_REQUEST: 'proposal/article/VOTE_REQUEST'
}

// Reducer
const initialState = {
  data: null,
  isFetching: null,
  proposalId: null
}

export default function reducer(state = initialState, action = null) {
  const { type, payload } = action

  switch (type) {
    case actionTypes.GET_REQUEST: {
      return Object.assign({}, state, {
        data: null,
        hasError: null,
        isFetching: 'articles',
        proposalId: payload
      })
    }
    case actionTypes.GET_COMPLETE: {
      return Object.assign({}, state, {
        hasError: null,
        isFetching: null,
        data: payload
      })
    }
    case actionTypes.GET_ERROR: {
      return Object.assign({}, state, {
        hasError: true,
        isFetching: null
      })
    }
    default: {
      return state
    }
  }
}

// Actions
export function getProposalArticle(proposalId) {
  return dispatch => {
    dispatch({
      type: actionTypes.GET_REQUEST,
      error: null,
      payload: proposalId
    })
    return api.get(`proposal/${proposalId}/article`).then(res =>
      dispatch({
        type: !res.error ? actionTypes.GET_COMPLETE : actionTypes.GET_ERROR,
        payload: res.body,
        error: res.error
      })
    )
  }
}

export function getProposalArticleIfNeeded(proposalId) {
  return (dispatch, getState) => {
    const currentProposalId = getState().proposal.article.proposalId
    return proposalId !== currentProposalId ? dispatch(getProposalArticle(proposalId)) : Promise.resolve()
  }
}

export function approveProposalArticle(proposalId, articleId, civil) {
  return dispatch => {
    dispatch({
      type: actionTypes.VOTE_REQUEST
    })
    return api.get(`proposal/${proposalId}/article/${articleId}/approve`, { civil }).then(res =>
      dispatch({
        type: !res.error ? actionTypes.VOTE_COMPLETE : actionTypes.VOTE_ERROR,
        payload: res.body,
        error: res.error
      })
    )
  }
}

export function submitProposalArticle(proposalId, url) {
  return dispatch => {
    dispatch({
      type: actionTypes.CREATE_REQUEST
    })
    return api.post(`proposal/${proposalId}/article`, { url }).then(res =>
      dispatch({
        type: !res.error ? actionTypes.CREATE_COMPLETE : actionTypes.CREATE_ERROR,
        payload: res.body,
        error: res.error
      })
    )
  }
}
