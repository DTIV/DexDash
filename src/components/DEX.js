/*
SPDX-License-Identifier: GPL-3.0-only
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
import { DEXAssets, useIsMounted  } from './Functions'
import { useState, useEffect } from 'react'
import AssetList from './AssetList'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
let admin = require('../config.json')

const DEX = (props) => {
    // HOOKS
    const infinity = 1000000**100
    const [getAssets, setAssets] = useState(false)
    const [getSwaps, setSwaps] = useState(infinity)
    const [getFee, setFee] = useState(infinity)
    const [getQuote, setQuote] = useState(infinity)
    const [getLiq, setLiq] = useState(infinity)
    const [getSupply, setSupply] = useState(infinity)
    const [getVol, setVol] = useState(infinity)
    const [getResults, setResults] = useState(25)
    
    // VARIABLES
    var data = [getSwaps, getFee, getQuote, getLiq, getSupply, getVol]
    const assets = document.getElementById('asset-list')
    const loader = document.getElementById('loader')
    const isMounted = useIsMounted()
    const dex = props.dex
    var chain = props.chain
    var loading;
    var newAssets;

    // GET ASSETS
    if(localStorage.getItem(props.chain+'dexAssets')){
        newAssets = JSON.parse(localStorage.getItem(props.chain+'dexAssets'))
    }else{
        DEXAssets(dex,admin.key, chain,setAssets, 0, getResults, isMounted)    
    }

    // ARRAY CHECK
    for(const i in data){
        if(!data[i]){
            data[i] = infinity
        }
    }

    function toggleFilter(){
        var classObj = document.getElementById('screener');
        classObj.classList.toggle('hide')
    }

    function Results(e){
        if(isMounted){
            setResults(e.target.value)
            DEXAssets(dex,admin.key, chain,setAssets,0, e.target.value)
        }
    }

    // PAGINATION
    function getNext(){
        document.getElementById('asset-list').classList.add('hide')
        document.getElementById('loader').classList.remove('hide')
        if(isMounted){
            var page_num = newAssets.value.data.pagination.page_number
            page_num = page_num + 1
            DEXAssets(dex,admin.key, chain,setAssets, page_num, getResults)
        }
    }
    
    function getPrev(){
        document.getElementById('asset-list').classList.add('hide')
        document.getElementById('loader').classList.remove('hide')
        if(isMounted){
            var page_num = newAssets.value.data.pagination.page_number
            page_num = page_num - 1
            DEXAssets(dex,admin.key, chain,setAssets, page_num, getResults)
        }
    }

    // DATA EXPIRY
    if(localStorage.getItem('dexAssets')){
        if(Date.now() > JSON.parse(localStorage.getItem('dexAssets')).ttl){
            localStorage.removeItem('dexAssets')
            setAssets(false)
        }
    } 

    if(loading){
        if(assets && loader){
            assets.classList.add('hide')
            loader.classList.remove('hide')
        }
    }else{
        if(assets && loader){
            assets.classList.remove('hide')
            loader.classList.add('hide')
        }
    }
 
    if(newAssets){
        var page_num = newAssets.value.data.pagination.page_number
        var has_more = newAssets.value.data.pagination.has_more
        if(page_num){
            const assets = document.getElementById('asset-list')
            const loader = document.getElementById('loader')
            if(assets && loader){
                document.getElementById('asset-list').classList.remove('hide')
                document.getElementById('loader').classList.add('hide')
            }
        }

        return (
            <div className="dex-wrap" key={dex}>
                <div className="back-wrap">
                    <div className="interface-wrap">
                        <div className="dex-btn-wrap">
                            <a className="btn" href="/">Home</a>
                            <a className="btn" onClick={toggleFilter}>Filter Page ( {page_num + 1} )</a>
                        </div>
                        <div className="dex-page-wrap">
                            <div>
                                <button className={`btn ${page_num > 0 ? 'active': 'hide'}`} onClick={getPrev}>Previous</button>
                            </div>
                            <select name="Results" id="results" defaultValue="25" onChange={(e) => Results(e)}>
                                <option value="100">100</option>
                                <option value="50">50</option>
                                <option value="25">25</option>
                            </select>
                            <div>
                                <button className={`btn ${has_more ? 'active': 'hide'}`} onClick={getNext}>Next</button>
                            </div>
                        </div>
                    </div>
                    <div id="screener" className="hide">
                        <div>
                            <input id="swap-count" className="filter" type="number" placeholder="Max Swap Count 24h" onChange={(e) => (setSwaps(e.target.value))}/>
                        </div>
                        <div>
                            <input id="fee" className="filter" type="number" placeholder="Max Fee 24h" onChange={(e) => (setFee(e.target.value))}/>
                        </div>
                        <div>
                            <input id="quote" className="filter" type="number" placeholder="Max Quote Amount" onChange={(e) => (setQuote(e.target.value))}/>
                        </div>
                        <div>
                            <input id="liquidity" className="filter" type="number" placeholder="Max Liquidity Amount" onChange={(e) => (setLiq(e.target.value))}/>
                        </div>
                        <div>
                            <input id="supply" className="filter" type="number" placeholder="Total Supply" onChange={(e) => (setSupply(e.target.value))}/>
                        </div>
                        <div>
                            <input id="volume" className="filter" type="number" placeholder="Volume 24h" onChange={(e) => (setVol(e.target.value))}/>
                        </div>
                    </div>
                </div>
                <div id="loader" className="loading hide">
                    <Loader
                        type="TailSpin"
                        color="black"
                        height={100}
                        width={100}
                    />    
                </div>    
                <section id="asset-list">
                    <AssetList loading={loading} assets={newAssets} chain={chain} dex={dex} data={data}/>
                </section>
            </div>
        )
    }else{
        return (
            <div id="loader" className="loading">
                <Loader
                    type="TailSpin"
                    color="black"
                    height={100}
                    width={100}
                />    
            </div>    
        )
    }
}

export default DEX
