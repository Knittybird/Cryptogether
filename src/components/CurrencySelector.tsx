import { Component } from 'react'
import './CurrencySelector.css'

interface CurSelProps {
  currency: string
  selectCurrencyHandler: (currency: string) => void
}

class CurrencySelector extends Component<CurSelProps> {
  render() {
    const currencies = ['usd', 'jpy', 'eur']
    const { currency, selectCurrencyHandler } = this.props
    return (
      <form className='currency-selection'>
        <label className='label' htmlFor='currency-select-element'>
          Currency selection
        </label>
        <select
          id='currency-select-element'
          className='form-select form-select-sm'
          name='currency'
          value={currency}
          onChange={(e) => selectCurrencyHandler(e.target.value)}
        >
          {currencies.map((x, i) => {
            return (
              <option className='currency-item' key={i} value={x}>
                {x}
              </option>
            )
          })}
        </select>
      </form>
    )
  }
}

export default CurrencySelector
