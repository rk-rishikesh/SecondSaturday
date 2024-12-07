import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CurrencyChanged } from "../generated/schema"
import { CurrencyChanged as CurrencyChangedEvent } from "../generated/SecondSaturday/SecondSaturday"
import { handleCurrencyChanged } from "../src/second-saturday"
import { createCurrencyChangedEvent } from "./second-saturday-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let player = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount = BigInt.fromI32(234)
    let reason = "Example string value"
    let newCurrencyChangedEvent = createCurrencyChangedEvent(
      player,
      amount,
      reason
    )
    handleCurrencyChanged(newCurrencyChangedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CurrencyChanged created and stored", () => {
    assert.entityCount("CurrencyChanged", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CurrencyChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "player",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "CurrencyChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )
    assert.fieldEquals(
      "CurrencyChanged",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "reason",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
