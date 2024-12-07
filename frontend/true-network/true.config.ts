
import { TrueApi, testnet } from '@truenetworkio/sdk'
import { TrueConfig } from '@truenetworkio/sdk/dist/utils/cli-config'

// If you are not in a NodeJS environment, please comment the code following code:
// import dotenv from 'dotenv'
// dotenv.config()

export const getTrueNetworkInstance = async (): Promise<TrueApi> => {
  const trueApi = await TrueApi.create(config.account.secret)

  await trueApi.setIssuer(config.issuer.hash)

  return trueApi;
}

export const config: TrueConfig = {
  network: testnet,
  account: {
    address: 'o8S2dNn3eA9QJDseKSapepE2hZspxwyBvDgB9v9dRXvUCTu',
    secret: process.env.REACT_APP_TRUE_NETWORK_SECRET_KEY ?? ''
  },
  issuer: {
    name: 'SecondSaturday',
    hash: '0x4b10ba21599b118d19dc6046b2c4915b57482a70121b0ddc1cfea246cdf10cfa'
  },
  algorithm: {
    id: undefined,
    path: undefined,
    schemas: []
  },
}
