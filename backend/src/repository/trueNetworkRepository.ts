import { U32, U64, Text } from '@truenetworkio/sdk'
import { gamePlaySchema } from '../true-network/schema'
import { getTrueNetworkInstance } from '../true-network/true.config'

const attestGamePlayToUser = async (address: string, score: number, playerId: string, gameName: string) => {
    const api = await getTrueNetworkInstance()

    const output = await gamePlaySchema.attest(api, address, {
        score,
        playerId,
        gameName,
    })

    // Output is usually the transaction hash for verification on-chain.
    console.log(output)

    // Make sure to disconnect the network after operation(s) is done.
    await api.network.disconnect()
    return output;
}

export default {
    attestGamePlayToUser,
}