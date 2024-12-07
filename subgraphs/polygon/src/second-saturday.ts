import {
  CurrencyChanged as CurrencyChangedEvent,
  HotspotBenefitReceived as HotspotBenefitReceivedEvent,
  LoanTaken as LoanTakenEvent,
  PlayerJailed as PlayerJailedEvent,
  PlayerJailed1 as PlayerJailed1Event,
  PlayerPositionChanged as PlayerPositionChangedEvent,
  PlayerRegistered as PlayerRegisteredEvent,
  PlayerRegistered1 as PlayerRegistered1Event,
  PropertiesSeized as PropertiesSeizedEvent,
  PropertiesSeized1 as PropertiesSeized1Event,
  PropertyListed as PropertyListedEvent,
  PropertyPurchased as PropertyPurchasedEvent,
  PropertyPurchased1 as PropertyPurchased1Event,
  RentPaid as RentPaidEvent,
  RentPaid1 as RentPaid1Event
} from "../generated/SecondSaturday/SecondSaturday"
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
} from "../generated/schema"

export function handleCurrencyChanged(event: CurrencyChangedEvent): void {
  let entity = new CurrencyChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.amount = event.params.amount
  entity.reason = event.params.reason

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleHotspotBenefitReceived(
  event: HotspotBenefitReceivedEvent
): void {
  let entity = new HotspotBenefitReceived(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.benefitAmount = event.params.benefitAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLoanTaken(event: LoanTakenEvent): void {
  let entity = new LoanTaken(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.loanAmount = event.params.loanAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlayerJailed(event: PlayerJailedEvent): void {
  let entity = new PlayerJailed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.fine = event.params.fine

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlayerJailed1(event: PlayerJailed1Event): void {
  let entity = new PlayerJailed1(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlayerPositionChanged(
  event: PlayerPositionChangedEvent
): void {
  let entity = new PlayerPositionChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.oldPosition = event.params.oldPosition
  entity.newPosition = event.params.newPosition

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlayerRegistered(event: PlayerRegisteredEvent): void {
  let entity = new PlayerRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.initialBalance = event.params.initialBalance

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlayerRegistered1(event: PlayerRegistered1Event): void {
  let entity = new PlayerRegistered1(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePropertiesSeized(event: PropertiesSeizedEvent): void {
  let entity = new PropertiesSeized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.numberOfPropertiesLost = event.params.numberOfPropertiesLost

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePropertiesSeized1(event: PropertiesSeized1Event): void {
  let entity = new PropertiesSeized1(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePropertyListed(event: PropertyListedEvent): void {
  let entity = new PropertyListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.cardId = event.params.cardId
  entity.initialPrice = event.params.initialPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePropertyPurchased(event: PropertyPurchasedEvent): void {
  let entity = new PropertyPurchased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.cardId = event.params.cardId
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePropertyPurchased1(event: PropertyPurchased1Event): void {
  let entity = new PropertyPurchased1(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.player = event.params.player
  entity.cardId = event.params.cardId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRentPaid(event: RentPaidEvent): void {
  let entity = new RentPaid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tenant = event.params.tenant
  entity.landlord = event.params.landlord
  entity.cardId = event.params.cardId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRentPaid1(event: RentPaid1Event): void {
  let entity = new RentPaid1(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tenant = event.params.tenant
  entity.landlord = event.params.landlord
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
