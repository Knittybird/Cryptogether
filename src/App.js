import React, { Component } from 'react'
import logo from './logo.svg'
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import CurrencySelector from './components/CurrencySelector'


class App extends Component {
  constructor(){
    super()
    this.state = {
      currency: "usd"
    }
  }

  selectCurrencyHandler = (currency) => {
    this.setState = {currency}
  }

  render() {
    const { currency } = this.state
    return (
      <main className="cloudly">
        <header className="pl-10">
          <Navbar bg="dark" variant="dark" expand="sm">
            <Navbar.Brand className="ml-10" href="/">Cloudly</Navbar.Brand>
            <CurrencySelector currency={this.currency} selectCurrencyHandler={this.selectCurrencyHandler}/>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="w-100 justify-content-end">
                <Nav.Item>
                <Nav.Link href="/">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Link href="/coins">Coins</Nav.Link>
                <Nav.Link href="/exchanges">Exchanges</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
        <p>body</p>
      </main>
    );
  }
}

export default App