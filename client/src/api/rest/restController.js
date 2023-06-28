import http from '../interceptor'

export const registerRequest = data => http.post('/auth/registration', data)
export const loginRequest = data => http.post('/auth/login', data)
export const getUser = () => http.get('/auth/getUser')
export const updateContest = data => http.put('/updateContest', data)
export const setNewOffer = data => http.post('/offer/setNewOffer', data)
export const setOfferStatus = data => http.post('/offer/setOfferStatus', data)
export const downloadContestFile = data =>
  http.post(`downloadFile/${data.fileName}`)
export const payMent = data => http.post('/payment/pay', data.formData)
export const changeMark = data => http.post('changeMark', data)
export const getPreviewChat = () => http.get('/chat/getPreview')
export const getDialog = data => http.post('/chat/getChat', data)
export const dataForContest = data => http.post('/contest', data)
export const cashOut = data => http.post('/payment/cashout', data)
export const updateUser = data => http.put('/user/updateUser', data)
export const newMessage = data => http.post('/chat/message', data)
export const changeChatFavorite = data => http.post('/chat/favorite', data)
export const changeChatBlock = data => http.post('/chat/blackList', data)
export const getCatalogList = data => http.get('/chat/getCatalogs', data)
export const addChatToCatalog = data =>
  http.put('/chat/addNewChatToCatalog', data)
export const createCatalog = data => http.post('/chat/catalog', data)
export const deleteCatalog = data => http.delete('/chat/deleteCatalog', data)
export const removeChatFromCatalog = data =>
  http.delete('/chat/removeChatFromCatalog', data)
export const changeCatalogName = data =>
  http.put('/chat/updateNameCatalog', data)
export const getCustomersContests = data =>
  http.post(
    '/getCustomersContests',
    { limit: data.limit, offset: data.offset },
    {
      headers: {
        status: data.contestStatus
      }
    }
  )

export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries
}) =>
  http.get('/contests', {
    params: {
      offset,
      limit,
      typeIndex,
      contestId,
      industry,
      awardSort,
      ownEntries
    }
  })

export const getContestById = data => http.get(`/contest/${data.contestId}`)
