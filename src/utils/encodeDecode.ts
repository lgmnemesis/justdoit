import CryptoJS from 'crypto-js'

export const encodeText = (text: string) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
}

export const decodeText = (data: string) => {
  return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8)
}

export const encodeChallengeName = (challengeName: string) => {
  return challengeName
    ? encodeText(`${challengeName}_${new Date().getTime()}`)
    : ''
}

export const decodeChallengeName = (encodedChallengeName: string) => {
  return encodedChallengeName ? decodeText(encodedChallengeName) : ''
}

export const decodeChallengeNameToDisplay = (encodedChallengeName: string) => {
  return encodedChallengeName
    ? decodeChallengeName(encodedChallengeName).split(/_[0-9]+$/)[0]
    : ''
}
