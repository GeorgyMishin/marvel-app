import md5 from 'md5'

const calculatedParams = () => {
  const ts = Math.floor(Date.now())
  const privateKey = process.env.REACT_APP_PRIVATE_API_KEY
  const publicKey = process.env.REACT_APP_PUBLIC_API_KEY

  //@ts-ignore
  return { hash: md5(ts + privateKey + publicKey), ts }
}

export default calculatedParams
