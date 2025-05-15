const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let amount = document.querySelector(".amount input");

window.addEventListener("load" ,() =>{
  getExchangeData();
});
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    else if (select.name === "to" && currCode === "BDT") {
      newOption.selected = "selected";
    }
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const getExchangeData = async() =>{
  let res = await fetch("https://latest.currency-api.pages.dev/v1/currencies/eur.json");
  console.log(res);

  let data = await res.json();
  console.log(data);
  let fCurr = fromCurr.value.toLowerCase();
  let tCurr = toCurr.value.toLowerCase();

  let fAns = (amount.value/data.eur[fCurr]);
  let tAns = data.eur[tCurr];

  let finalAmount = (fAns * tAns);
  msg.innerText = `${amount.value}  ${fromCurr.value} = ${finalAmount} ${toCurr.value} `;
  console.log(finalAmount);
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click" , () =>{ 
  if(amount.value === "" || amount.value<1){
   msg.innerText = `Invalid Value`;
    amount.value = 1;
  } 
  else{
    getExchangeData();
  }
});