/*
DEX Analytics Dashboard Template.
Copyright (C) 2021 Daniel Troyer

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import  { BrowserRouter as Router, Route} from 'react-router-dom'
import { useState } from 'react';
import DEX from './components/DEX';
import Nav from './components/Nav';
import Asset from './components/Asset';
import Menu from './components/Menu';
import Showcase from './components/Showcase'
import Yield from './components/Yield'

let admin = require('./config.json')
//Pools, swaps, liquidity, volumes
//Lending and borrowing stats
//Trading pair positions, leverage and level of profitability
//Fees x
//Yield farmers
const dex = admin.dex
const key = admin.key
const geckoEnabled = admin.gecko_enabled
function App() {

  const [getChain, setChain] = useState(1)
  const onChanger = (e) => {
    setChain(parseInt(e.target.value))
  }
  return (
    <Router>
      <div id="main-container">
        <div className="nav-wrap">
          <Nav />
          <div className="chain-wrap">
            <select name="" defaultValue={getChain} id="chain-select" onChange={onChanger}> 
                <option value="1">ETH</option>
                <option value="137">MATIC</option>
                <option value="56">BSC</option>
                <option value="43114">AVAX</option>
            </select>
          </div>
        </div>
        
        <Menu />   
        <Route exact path="/assets" render={(props) => (
          <div id="dex-sec">
            <DEX chain={getChain} dex={dex}/>
          </div>
        )}/>
        <Route exact path="/" render={(props) => (
          <section id="showcase">
            <Showcase dex={dex} enabled={geckoEnabled} covkey={key} chain={getChain}/>
          </section>
        )}/>
        <Route exact path="/yield" render={(props) => (
          <section id="yeild">
            <Yield dex={dex} covkey={key} chain={getChain}/>
          </section>
        )}/>
        <Route exact path="/:chain/:dex/:address" component={Asset}/>
      </div>
    </Router>
  );

}

export default App;
