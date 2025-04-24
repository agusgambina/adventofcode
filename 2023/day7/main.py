from functools import reduce

def getTotalWinnings(hands: list[Hand]) -> int:
    return reduce(
        lambda acc, hand: acc + hand.bid * (len(hands) - hands.index(hand)),
        sorted(hands, key=lambda h: (h.type.value, h.cards)),
        0
    ) 