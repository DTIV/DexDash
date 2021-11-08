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

import { useRef, useEffect} from 'react'

export function BalanceList(key, chain, address, setBalances){
    chain = chain.toString()
    const endpoint = chain+'/address/'+address+'/balances_v2'
    const url = 'https://api.covalenthq.com/v1/'+endpoint+"/?key="+key
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setBalances(JSON.stringify(data.data.items))
      })
}

export function useIsMounted() {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => isMounted.current = false;
  }, []);
  return isMounted;
}

export function Chains(key){
  const endpoint = 'chains'
  const url = 'https://api.covalenthq.com/v1/'+endpoint+"/?key="+key
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
    })
}

export function DEXAssets(dex, key, chain, setAssets, pageNo, pageSize){
  chain = chain.toString()
  const endpoint = chain+'/networks/'+dex+'/assets'
  const url = 'https://api.covalenthq.com/v1/'+endpoint+"/?page-number="+pageNo+"&page-size="+pageSize+"&key="+key
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const item = {
        value: data,
        ttl: Date.now() + 15000 
    }
      var setStr = chain+'dexAssets'
      localStorage.setItem(setStr, JSON.stringify(item))
      setAssets(data)
    })
}

export function FarmingStats(address, key, chain, setStats, pageNo, pageSize){
  chain = chain.toString()
  const endpoint = chain+'/address/'+address+'/stacks/farming/positions'
  const url = 'https://api.covalenthq.com/v1/'+endpoint+"/?page-number="+pageNo+"&page-size="+pageSize+"&key="+key
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const item = {
        value: data,
        ttl: Date.now() + 15000 
    }
      var setStr = chain+'farmStats'
      localStorage.setItem(setStr, JSON.stringify(item))
      setStats(data)
    })
}


export function getPortfolio(key,chain,address, setPortfolio){
  chain = chain.toString()
  const endpoint = chain+'/address/'+address+'/portfolio_v2'
  const url = 'https://api.covalenthq.com/v1/'+endpoint+"/?key="+key
  fetch(url)
    .then(res => res.json())
    .then(data => {
      setPortfolio(data)
    })
}

export function getExchangeBal(key,chain,dex,address, setExBal){
  chain = chain.toString()
  const endpoint = chain+'/address/'+address+'/stacks/'+dex+'/balances'
  const url = 'https://api.covalenthq.com/v1/'+endpoint+"/?key="+key
  fetch(url)
    .then(res => res.json())
    .then(data => {
      setExBal(data)
    })
}

export function getDEXHealth(key,chain,dex, setHealth){
  chain = chain.toString()
  const endpoint = '1/xy=k/sushiswap/health'
  const url = 'https://api.covalenthq.com/v1/'+endpoint+"/?key="+key
  fetch(url)
    .then(res => res.json())
    .then(data => {
      setHealth(data)
    })
}

export function getCGData(id, setGecko){
  const endpoint = 'coins/'+id
  const url = 'https://api.coingecko.com/api/v3/'+endpoint
  fetch(url)
    .then(res => res.json())
    .then(data => {
      setGecko(data)
    })
}

