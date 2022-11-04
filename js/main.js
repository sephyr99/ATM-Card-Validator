//   ****** Variable Declaration ******
const cardNumberInput = document.getElementById("cardNumber");
const cardExpDate = document.getElementById("expiringDate");
const cvvNumber = document.getElementById("cvvNumber");
const userName = document.getElementById("fullName");
const userEmail = document.getElementById("userEmail");
const phoneNumber = document.getElementById("userPhoneNumber");
const cardTypeList = document.querySelectorAll(".cardtype");
const errorText = document.getElementById("error");
const validText = document.getElementById("valid");

// ****** Function that sum all the elements in the even index of the provided card number ******
const evenIndexCal = (evenList, evenSum) => {
  for (let i = 0; i < evenList.length; i++) {
    let evenListElementValue = parseInt(evenList[i]) * 2;
    evenListElementValue = evenListElementValue.toString();
    if (evenListElementValue.length > 1) {
      evenListElementValue =
        parseInt(evenListElementValue[0]) + parseInt(evenListElementValue[1]);
    }
    evenSum = evenSum + parseInt(evenListElementValue);
  }
  console.log(evenSum);
  return evenSum;
};

// ****** Function that loop through each value in the odd index of the provided card then sum it together ******
const oddIndexCal = (oddList, oddSum) => {
  for (let i = 0; i < oddList.length; i++) {
    oddSum = oddSum + parseInt(oddList[i]);
  }
  console.log(oddSum);
  return oddSum;
};

// Function that check if the card is valid according to Luhn Algorithm ******
const mod10Check = (evenSum, oddSum) => {
  console.log("It is here", evenSum, oddSum);
  if ((evenSum + oddSum) % 10 == 0) {
    errorText.innerHTML = "";
    errorText.removeAttribute("class");
    validText.className = "valid";
    validText.innerHTML = "The card is valid";
  } else {
    validText.innerHTML = "";
    validText.removeAttribute("class");
    errorText.className = "error";
    errorText.innerHTML = "The card is invalid";
  }
};

// ****** Main function that house every other function defined ******
const checkNumber = (cardNumber) => {
  if (cardNumber.length === 16) {
    let oddList = [];
    let oddSum = 0;
    let evenList = [];
    let evenSum = 0;
    for (let i = 0; i < cardNumber.length; i++) {
      if (i % 2 == 0) {
        evenList.push(cardNumber[i]);
      } else {
        oddList.push(cardNumber[i]);
      }
    }

    evenSum = evenIndexCal(evenList, evenSum);
    oddSum = oddIndexCal(oddList, oddSum);
    mod10Check(evenSum, oddSum);
  } else {
    errorText.className = "error";
    errorText.innerHTML = "Invalid Card Number";
  }
};

// Event Listener that activate the card from blury to clear
cardNumberInput &&
  cardNumberInput.addEventListener("input", () => {
    let cardNumber = cardNumberInput.value;
    let firstCharacter = parseInt(cardNumber[0]);
    if (firstCharacter == 4 && cardNumber.length === 16) {
      cardTypeList[0].className = "cardtype";
      cardTypeList[1].className = "cardtype selected";
    } else if (firstCharacter == 5 && cardNumber.length === 16) {
      cardTypeList[0].className = "cardtype selected";
      cardTypeList[1].className = "cardtype";
    } else {
      cardTypeList[0].className = "cardtype";
      cardTypeList[1].className = "cardtype";
    }
  });

// Function that handle the submit button
const handleSubmit = (e) => {
  e.preventDefault();
  checkNumber(cardNumberInput.value);
  cardNumber.value = "";
  cardExpDate.value = "";
  cvvNumber.value = "";
  userName.value = "";
  userEmail.value = "";
  phoneNumber.value = "";
};
