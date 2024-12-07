import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CurrencyChanged,
  HotspotBenefitReceived,
  LoanTaken,
  PlayerJailed,
  PlayerJailed1,
  PlayerPositionChanged,
  PlayerRegistered,
  PlayerRegistered1,
  PropertiesSeized,
  PropertiesSeized1,
  PropertyListed,
  PropertyPurchased,
  PropertyPurchased1,
  RentPaid,
  RentPaid1
} from "../generated/SecondSaturday/SecondSaturday"

export function createCurrencyChangedEvent(
  player: Address,
  amount: BigInt,
  reason: string
): CurrencyChanged {
  let currencyChangedEvent = changetype<CurrencyChanged>(newMockEvent())

  currencyChangedEvent.parameters = new Array()

  currencyChangedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  currencyChangedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromSignedBigInt(amount))
  )
  currencyChangedEvent.parameters.push(
    new ethereum.EventParam("reason", ethereum.Value.fromString(reason))
  )

  return currencyChangedEvent
}

export function createHotspotBenefitReceivedEvent(
  player: Address,
  benefitAmount: BigInt
): HotspotBenefitReceived {
  let hotspotBenefitReceivedEvent = changetype<HotspotBenefitReceived>(
    newMockEvent()
  )

  hotspotBenefitReceivedEvent.parameters = new Array()

  hotspotBenefitReceivedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  hotspotBenefitReceivedEvent.parameters.push(
    new ethereum.EventParam(
      "benefitAmount",
      ethereum.Value.fromUnsignedBigInt(benefitAmount)
    )
  )

  return hotspotBenefitReceivedEvent
}

export function createLoanTakenEvent(
  player: Address,
  loanAmount: BigInt
): LoanTaken {
  let loanTakenEvent = changetype<LoanTaken>(newMockEvent())

  loanTakenEvent.parameters = new Array()

  loanTakenEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  loanTakenEvent.parameters.push(
    new ethereum.EventParam(
      "loanAmount",
      ethereum.Value.fromUnsignedBigInt(loanAmount)
    )
  )

  return loanTakenEvent
}

export function createPlayerJailedEvent(
  player: Address,
  fine: BigInt
): PlayerJailed {
  let playerJailedEvent = changetype<PlayerJailed>(newMockEvent())

  playerJailedEvent.parameters = new Array()

  playerJailedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  playerJailedEvent.parameters.push(
    new ethereum.EventParam("fine", ethereum.Value.fromUnsignedBigInt(fine))
  )

  return playerJailedEvent
}

export function createPlayerJailed1Event(player: Address): PlayerJailed1 {
  let playerJailed1Event = changetype<PlayerJailed1>(newMockEvent())

  playerJailed1Event.parameters = new Array()

  playerJailed1Event.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )

  return playerJailed1Event
}

export function createPlayerPositionChangedEvent(
  player: Address,
  oldPosition: BigInt,
  newPosition: BigInt
): PlayerPositionChanged {
  let playerPositionChangedEvent = changetype<PlayerPositionChanged>(
    newMockEvent()
  )

  playerPositionChangedEvent.parameters = new Array()

  playerPositionChangedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  playerPositionChangedEvent.parameters.push(
    new ethereum.EventParam(
      "oldPosition",
      ethereum.Value.fromUnsignedBigInt(oldPosition)
    )
  )
  playerPositionChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newPosition",
      ethereum.Value.fromUnsignedBigInt(newPosition)
    )
  )

  return playerPositionChangedEvent
}

export function createPlayerRegisteredEvent(
  player: Address,
  initialBalance: BigInt
): PlayerRegistered {
  let playerRegisteredEvent = changetype<PlayerRegistered>(newMockEvent())

  playerRegisteredEvent.parameters = new Array()

  playerRegisteredEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  playerRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "initialBalance",
      ethereum.Value.fromUnsignedBigInt(initialBalance)
    )
  )

  return playerRegisteredEvent
}

export function createPlayerRegistered1Event(
  player: Address
): PlayerRegistered1 {
  let playerRegistered1Event = changetype<PlayerRegistered1>(newMockEvent())

  playerRegistered1Event.parameters = new Array()

  playerRegistered1Event.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )

  return playerRegistered1Event
}

export function createPropertiesSeizedEvent(
  player: Address,
  numberOfPropertiesLost: BigInt
): PropertiesSeized {
  let propertiesSeizedEvent = changetype<PropertiesSeized>(newMockEvent())

  propertiesSeizedEvent.parameters = new Array()

  propertiesSeizedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  propertiesSeizedEvent.parameters.push(
    new ethereum.EventParam(
      "numberOfPropertiesLost",
      ethereum.Value.fromUnsignedBigInt(numberOfPropertiesLost)
    )
  )

  return propertiesSeizedEvent
}

export function createPropertiesSeized1Event(
  player: Address
): PropertiesSeized1 {
  let propertiesSeized1Event = changetype<PropertiesSeized1>(newMockEvent())

  propertiesSeized1Event.parameters = new Array()

  propertiesSeized1Event.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )

  return propertiesSeized1Event
}

export function createPropertyListedEvent(
  cardId: BigInt,
  initialPrice: BigInt
): PropertyListed {
  let propertyListedEvent = changetype<PropertyListed>(newMockEvent())

  propertyListedEvent.parameters = new Array()

  propertyListedEvent.parameters.push(
    new ethereum.EventParam("cardId", ethereum.Value.fromUnsignedBigInt(cardId))
  )
  propertyListedEvent.parameters.push(
    new ethereum.EventParam(
      "initialPrice",
      ethereum.Value.fromUnsignedBigInt(initialPrice)
    )
  )

  return propertyListedEvent
}

export function createPropertyPurchasedEvent(
  player: Address,
  cardId: BigInt,
  price: BigInt
): PropertyPurchased {
  let propertyPurchasedEvent = changetype<PropertyPurchased>(newMockEvent())

  propertyPurchasedEvent.parameters = new Array()

  propertyPurchasedEvent.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  propertyPurchasedEvent.parameters.push(
    new ethereum.EventParam("cardId", ethereum.Value.fromUnsignedBigInt(cardId))
  )
  propertyPurchasedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return propertyPurchasedEvent
}

export function createPropertyPurchased1Event(
  player: Address,
  cardId: BigInt
): PropertyPurchased1 {
  let propertyPurchased1Event = changetype<PropertyPurchased1>(newMockEvent())

  propertyPurchased1Event.parameters = new Array()

  propertyPurchased1Event.parameters.push(
    new ethereum.EventParam("player", ethereum.Value.fromAddress(player))
  )
  propertyPurchased1Event.parameters.push(
    new ethereum.EventParam("cardId", ethereum.Value.fromUnsignedBigInt(cardId))
  )

  return propertyPurchased1Event
}

export function createRentPaidEvent(
  tenant: Address,
  landlord: Address,
  cardId: BigInt,
  amount: BigInt
): RentPaid {
  let rentPaidEvent = changetype<RentPaid>(newMockEvent())

  rentPaidEvent.parameters = new Array()

  rentPaidEvent.parameters.push(
    new ethereum.EventParam("tenant", ethereum.Value.fromAddress(tenant))
  )
  rentPaidEvent.parameters.push(
    new ethereum.EventParam("landlord", ethereum.Value.fromAddress(landlord))
  )
  rentPaidEvent.parameters.push(
    new ethereum.EventParam("cardId", ethereum.Value.fromUnsignedBigInt(cardId))
  )
  rentPaidEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return rentPaidEvent
}

export function createRentPaid1Event(
  tenant: Address,
  landlord: Address,
  amount: BigInt
): RentPaid1 {
  let rentPaid1Event = changetype<RentPaid1>(newMockEvent())

  rentPaid1Event.parameters = new Array()

  rentPaid1Event.parameters.push(
    new ethereum.EventParam("tenant", ethereum.Value.fromAddress(tenant))
  )
  rentPaid1Event.parameters.push(
    new ethereum.EventParam("landlord", ethereum.Value.fromAddress(landlord))
  )
  rentPaid1Event.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return rentPaid1Event
}
