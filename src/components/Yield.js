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
import { useState } from 'react'
import { FarmingStats } from './Functions'
import Loader from "react-loader-spinner";

const Yield = (props) => {
    const [getAddr, setAddr] = useState(false)
    const [getStats, setStats] = useState(false)
    const dex = props.dex
    if(!getStats){
        return (
            <div>
                <div className="home-wrap">
                    <a className="btn" href="/">Home</a>
                </div>
                <div className="form-wrap">
                    <form className="farm-form" action="" onSubmit={e =>{
                        e.preventDefault();
                        document.getElementById('loader').classList.remove('hide')
                        FarmingStats(getAddr,props.covkey, props.chain,setStats,0,100)

                    }}>
                        <div>
                            <input className="farm-input" type="text" placeholder="Enter Address" onChange={(e) => (
                                setAddr(e.target.value)
                            )}/>
                        </div>
                        <div>
                            <button className="farm-btn" type="submit">Get Results</button>
                        </div> 
                    </form>
                </div>
                <div id="loader" className="loading hide">
                    <Loader
                        type="TailSpin"
                        color="black"
                        height={100}
                        width={100}
                        // timeout={3000} //3 secs
                    />    
                </div>   
            </div>
        )
    }else{
        const endpoint = dex+"_stats"
        const stats = getStats.data.items[0]
        const stakes = stats[endpoint].stakes
        const token = dex.replace("swap", "_token")
        const tokenData = stats[endpoint][token]
        if(!getStats.error){
            return (
                <div>
                    <div className="home-wrap">
                        <a className="btn" href="/">Home</a>
                    </div>
                    <div className="form-wrap">
                        <form className="farm-form" action="" onSubmit={e =>{
                            e.preventDefault();
                            FarmingStats(getAddr,props.covkey, props.chain,setStats,0,100)
                        }}>
                            <div>
                                <input className="farm-input" type="text" placeholder="Enter Address" onChange={(e) => (
                                    setAddr(e.target.value)
                                )}/>
                            </div>
                            <div>
                                <button className="farm-btn" type="submit">Get Results</button>
                            </div> 
                        </form>
                    </div>
                    <div className="results-wrap">
                        <div>
                            <div className="farm-add">
                                {getStats.data.address}
                            </div>
                            <div className="results-table">
                                <div className="results-row">
                                    <div><strong>Balance</strong> </div>
                                    <div>{tokenData.balance} {tokenData.contract_ticker_symbol}</div>
                                </div>
                                <div className="results-row">
                                    <div><strong>Claimable {tokenData.contract_ticker_symbol}</strong></div>
                                    <div>{stakes.claimable_sushi} {tokenData.contract_ticker_symbol}</div>
                                </div>
                                <div className="results-row">
                                    <div><strong>Claim Value</strong></div>
                                    <div>{ stakes.claimable_sushi_quote } USD</div>
                                </div>
                                <div className="results-row">
                                    <div><strong>Total Value</strong></div>
                                    <div>{ stakes.total_value } USD</div>
                                </div>
                                <div className="results-row">
                                    <div><strong>Pool Share</strong></div>
                                    <div>{ stakes.pool_share } %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div>
                    <div className="home-wrap">
                        <a className="btn" href="/">Home</a>
                    </div>
                    <div className="form-wrap">
                        <form className="farm-form" action="" onSubmit={e =>{
                            e.preventDefault();
                            FarmingStats(getAddr,props.covkey, props.chain,setStats,0,100)
                        }}>
                            <div>
                                <input className="farm-input" type="text" placeholder="Enter Address" onChange={(e) => (
                                    setAddr(e.target.value)
                                )}/>
                            </div>
                            <div>
                                <button className="farm-btn" type="submit">Get Results</button>
                            </div> 
                        </form>
                    </div>
                    <div>
                        No Results Found.
                    </div>
                </div>
            )
        }
    }
}

export default Yield
