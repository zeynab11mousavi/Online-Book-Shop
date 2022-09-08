const persian = (n) => {
  return n.toLocaleString("fa-IR",{style:"currency", currency:"IRR"})
}
export default persian;

// ENGLISH NUMBERS
const priceFormatter = new Intl.NumberFormat()
