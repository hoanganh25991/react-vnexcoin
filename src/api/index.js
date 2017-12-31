import dotenv from "dotenv"
import OAxois from "axios"

dotenv.config()
const { REACT_APP_API_ENDPOINT: endpoint } = process.env
const _ = console.log

// Custom axios instance
// With timeout & define when throw exception on status
const axios = OAxois.create({
  timeout: 20000,
  validateStatus(status) {
    return status !== 500
  }
})

const ENCRYPT_SCOPE = "encrypt"
const SUBMIT_SMS_MSG_SCOPE = "submitSmsMsg"
const FIND_TRANSACTION_SCOPE = "findTransaction"

export const encrypt = async reqBody => {
  const scope = ENCRYPT_SCOPE
  try {
    const res = await axios.post(`${endpoint}/api`, reqBody)
    _(`[${scope}][res.data]`, res.data)
    const { data: { payloadToken } } = res
    return payloadToken
  } catch (err) {
    _(`[${scope}][ERR]`, err)
    alert("Fail to call encrypt")
    return null
  }
}

export const submitSmsMsg = async reqBody => {
  const scope = SUBMIT_SMS_MSG_SCOPE
  try {
    const res = await axios.post(`${endpoint}/api`, reqBody)
    _(`[${scope}][res.data]`, res.data)
    const { data: { received } } = res
    return received
  } catch (err) {
    _(`[${scope}][ERR]`, err)
    alert("Fail to submit sms msg")
    return null
  }
}

export const findTransaction = async transactionId => {
  const scope = FIND_TRANSACTION_SCOPE
  try {
    const res = await axios.post(`${endpoint}/api`, {
      transactionId,
      type: "FIND_TRANSACTION"
    })
    _(`[${scope}][res.data]`, res.data)
    const { data: { transaction } } = res
    return transaction
  } catch (err) {
    _(`[${scope}][ERR]`, err)
    return null
  }
}
