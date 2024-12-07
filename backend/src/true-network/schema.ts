import { Hash, Schema, U32, U64, Text } from "@truenetworkio/sdk"

export const gamePlaySchema = Schema.create({
    score: U32,
    playerId: Text,
    gameName: Text,
})
