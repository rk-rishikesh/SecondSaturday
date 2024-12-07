
import { TrueApi, testnet } from '@truenetworkio/sdk'
import { TrueConfig } from '@truenetworkio/sdk/dist/utils/cli-config'

// If you are not in a NodeJS environment, please comment the code following code:
import dotenv from 'dotenv'
dotenv.config()

export const getTrueNetworkInstance = async (): Promise<TrueApi> => {
  const trueApi = await TrueApi.create(config.account.secret)

  await trueApi.setIssuer(config.issuer.hash)

  return trueApi;
}

export const config: TrueConfig = {
  network: testnet,
  account: {
    address: 'iUca4GTh1wGKMteyhD8VfxgSgcqnNpFNithubPMTFESegBg',
    secret: process.env.TRUE_NETWORK_SECRET_KEY ?? ''
  },
  issuer: {
    name: 'second_saturday',
    hash: '0x76150c87e07ebe838a4abc66eb9bd51111382aa0a1fb1e191bec5854c159cfec'
  },
  algorithm: {
    id: undefined,
    path: undefined,
    schemas: []
  },
}
  