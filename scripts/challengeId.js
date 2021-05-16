const { formatBytes32String } = require('@ethersproject/strings')

const random32String = () => {
  return Array.from(Array(31), () =>
    Math.floor(Math.random() * 36).toString(36),
  ).join('')
}

const generateChallengeId = () => {
  const id = formatBytes32String(random32String())
  console.log(id)
  return id
}

generateChallengeId()
