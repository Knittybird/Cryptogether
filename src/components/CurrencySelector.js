import react, { Component } from 'react'

class CurrencySelector extends Component {

  render() {
  const currencies = ['usd', 'jpy', 'eur']
  const { currency, selectCurrencyHandler } = this.props
    return (
      <form>
        <select id="currencySelect" name="currency" value={currency} onChange={selectCurrencyHandler}>
          {currencies.map(x => {
            return <option value={x}>{x}</option>
          })}
        </select>
      </form>
    )
  }
}

export default CurrencySelector