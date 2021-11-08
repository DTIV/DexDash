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

import React from 'react'
import { getExchangeBal, useIsMounted } from './Functions'
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import Loader from "react-loader-spinner";

let admin = require('../config.json')

const Asset = (props) => {
    // BACK BTN
    let history = useHistory();
    function goPrev(){
        history.goBack()
    }

    // HOOKS
    const [getExBal, setExBal] = useState(false)
    const isMounted = useIsMounted()
    const url = props.match.url.replace('/','').split('/')
    const chain = url[0]
    const dex = url[1]
    const address = url[2]

    // ASSET DATA
    if(!getExBal){
        if(isMounted){
            getExchangeBal(admin.key,chain,dex,address, setExBal)
        }
        return( 
            <div id="loader" className="loading">
                <Loader
                    type="TailSpin"
                    color="black"
                    height={100}
                    width={100}
                />    
            </div>    
         )
    }else{
        if(getExBal.data.sushiswap.balances[0]){
            const pool_token = getExBal.data.sushiswap.balances[0].pool_token
            const symbol = pool_token.contract_ticker_symbol
            const contract = pool_token.contract_address
            const quote = pool_token.quote_rate
            return (
                <div>
                    <div className="home-wrap">
                        <a className="btn" onClick={goPrev}>Back</a>
                        <a className="btn" href="/">Home</a>
                    </div>
                    <div>
                        <div className="main-pair-wrap">
                            <h2>{ symbol }</h2>
                            <div>{ contract }</div>
                            <div>{ quote } USD</div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    No Balances...
                </div>
            )
        }
        
    }
    
}

export default Asset
