function buildCards(e = !0) {
  var a,
    r = ["Hearts", "Diamonds", "Clubs", "Spades"],
    l = ["Ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King"],
    t = [],
    d = {};
  for (a in r)
    for (var s in l) {
      t.push(l[s] + " of " + r[a]);
      d[l[s] + " of " + r[a]] = parseInt(s) + 1;
    }
  return e ? t : d;
}
class Deck {
  constructor() {
    this.deck = [];
    this.reset();
    this.shuffle();
  }
  reset() {
    this.deck = [];
    this.deck = buildCards(!0);
  }
  shuffle() {
    for (var e = this.deck.length, a = 0; a < e; a++) {
      var r = Math.floor(Math.random() * e),
        l = this.deck[a];
      this.deck[a] = this.deck[r];
      this.deck[r] = l;
    }
  }
  deal() {
    return this.deck.pop();
  }
  isEmpty() {
    return 0 == this.deck.length;
  }
  length() {
    return this.deck.length;
  }
}
class Card {
  constructor(e) {
    this.card = e;
    var a = buildCards(!1);
    this.value = a[e];
    this.suit = e.substring(e.indexOf(" of ") + 4);
    this.placeHolder = null;
    this.flipped = !1;
    this.position =
      { Hearts: 0, Diamonds: 13, Clubs: 26, Spades: 39 }[this.suit] +
      this.value;
  }
  displayCard(e, a = !0) {
    this.placeHolder = document.getElementById(e);
    this.placeHolder.classList.add("card");
    this.flipped = a;
    this.placeHolder.style.backgroundPosition = a
      ? -150 * this.position + "px"
      : "0px";
  }
  flip() {
    if (this.flipped) {
      this.placeHolder.style.backgroundPosition = "0px";
      this.flipped = !1;
    } else {
      this.placeHolder.style.backgroundPosition = -150 * this.position + "px";
      this.flipped = !0;
    }
  }
}
const deck = new Deck();
let card1,
  card2,
  playerCard1,
  playerCard2,
  playerCard3,
  playerCard4,
  playerTotal = 0,
  dealerTotal = 0;
function initialDeal() {
  if (deck.length() < 7) {
    deck.reset();
    deck.shuffle();
  }
  card1 = new Card(deck.deal());
  card2 = new Card(deck.deal());
  playerCard1 = new Card(deck.deal());
  playerCard2 = new Card(deck.deal());
  card1.displayCard("card1", !0);
  card2.displayCard("card2", !1);
  playerCard1.displayCard("playerCard1", !0);
  playerCard2.displayCard("playerCard2", !0);
  card1.value = 10 < card1.value ? 10 : card1.value;
  card2.value = 10 < card2.value ? 10 : card2.value;
  playerCard1.value = 10 < playerCard1.value ? 10 : playerCard1.value;
  playerCard2.value = 10 < playerCard2.value ? 10 : playerCard2.value;
  21 === (playerTotal = playerCard1.value + playerCard2.value) &&
    cuteAlert({
      type: "success",
      title: "Superb!!!",
      message: "Blackjacked !!!",
      buttonText: "Wohoo !!!",
      img: "success.svg",
    }).then(() => {
      location.reload();
    });
}
function stand() {
  card2.flip();
  dealerTotal = card1.value + card2.value;
  (playerTotal >= dealerTotal
    ? cuteAlert({
        type: "success",
        title: "Congratualtions !!!",
        message: "You won the Game",
        buttonText: "Yayy !",
        img: "success.svg",
      })
    : cuteAlert({
        type: "error",
        title: "Oh No !!!",
        message: "Dealer won the Game",
        buttonText: "Ok :(",
        img: "error.svg",
      })
  ).then(() => {
    location.reload();
  });
}
let extraCnt = 0;
function hit() {
  var e = document.getElementById("deal");
  playerCard3 = new Card(deck.deal());
  playerCard4 = new Card(deck.deal());
  if (0 === extraCnt) {
    playerCard3.displayCard("playerCard3", !0);
    playerCard3.value = 10 < playerCard3.value ? 10 : playerCard3.value;
    playerTotal += playerCard3.value;
  } else if (1 === extraCnt) {
    playerCard4.displayCard("playerCard4", !0);
    playerCard4.value = 10 < playerCard4.value ? 10 : playerCard4.value;
    playerTotal += playerCard4.value;
  } else {
    e.style.display = "none";
    cuteAlert({
      type: "warning",
      title: "Sorry...",
      message: "Max. Cards dealed",
      buttonText: "OK",
      img: "warning.svg",
    });
  }
  if (21 < playerTotal) {
    cuteAlert({
      type: "error",
      title: "Busted...",
      message: "You lost the Game",
      buttonText: "OK",
      img: "error.svg",
    }).then(() => {
      location.reload();
    });
    e.style.display = "none";
  } else
    21 === playerTotal &&
      cuteAlert({
        type: "success",
        title: "Superb!!!",
        message: "Blackjacked !!!",
        buttonText: "Wohoo !!!",
        img: "success.svg",
      }).then(() => {
        location.reload();
      });
  extraCnt++;
}
initialDeal();
