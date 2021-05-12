import react, { Component } from 'react'

class CurrencySelector extends Component {

  render() {
  console.log("CurrencySelector render")
  const currencies = ['usd', 'jpy', 'eur']
  const { currency, selectCurrencyHandler } = this.props
    return (
      <form>
        <select id="currencySelect" name="currency" value={currency} onChange={(e) => selectCurrencyHandler(e.target.value)}>
          {currencies.map((x, i) => {
            return <option key={i} value={x}>{x}</option>
          })}
        </select>
      </form>
    )
  }
}

export default CurrencySelector