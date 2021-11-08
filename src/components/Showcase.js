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
import { useState } from 'react';
import { getCGData, getDEXHealth } from './Functions';
import Loader from "react-loader-spinner";
import { GiMagnifyingGlass } from "react-icons/gi";
import { BsMedium, BsDiscord, BsTwitter } from "react-icons/bs";
import { ImYoutube } from "react-icons/im";
import { CgWebsite } from "react-icons/cg";

const Showcase = (props) => {
    const [getGecko, setGecko] = useState(false)
    const [getHealth, setHealth] = useState(false)
    const dex = props.dex.replace('swap', '')
    if(props.enabled){
        if(!getGecko | !getHealth){
            getCGData(dex, setGecko)
            getDEXHealth(props.covkey,props.chain,props.dex,setHealth)
            return(
                <div id="loader" className="loading hide">
                    <Loader
                        type="TailSpin"
                        color="black"
                        height={100}
                        width={100}
                        // timeout={3000} //3 secs
                    />    
                </div>
            )
        }else{
            var i = 0
            function refreshIndicators() {
                const bar = document.getElementById('sent-bar')
                if (bar) {
                    if (i == 0) {
                        i = 1;
                        var elem = document.getElementById("myBar");
                        var upvotes = document.getElementById("upbar");
                        var downvotes = document.getElementById("downbar");
                        var width = 2;
                        var left = 98;
                        var id = setInterval(frame, 10);
                        function frame() {
                            if (width < getGecko.sentiment_votes_up_percentage) {
                                width++;
                                left--;
                                elem.style.width = width + "%";
                                upvotes.innerHTML = width + "%";
                                downvotes.innerHTML = left + "%";
                            }
                        }
                    }
                } else {
                    clearInterval(id);
                        i = 0;
                }
            }
            refreshIndicators(document.getElementById('sent-bar'))
            const market = getGecko.market_data
            const links = getGecko.links
            return (
                <div>
                    <div className="health-wrap">
                        <div className="health-info">
                            <div className="sm-title">Latest Block Height</div>
                            <div className="data-row">
                                <div>{getHealth.data.items[0].latest_block_height}</div>
                                <div>{getHealth.data.items[0].latest_block_signed_at.replace("T"," ").replace("Z","")}</div>
                            </div>
                            
                        </div>
                        <div className="health-info">
                            <div className="sm-title">Synced Blocked Height</div>
                            <div className="data-row">
                                <div>{getHealth.data.items[0].synced_block_height}</div>
                                <div>{getHealth.data.items[0].synced_block_signed_at.replace("T"," ").replace("Z","")}</div>
                            </div>
                            
                        </div>
                    </div>
                    <div className="showcase-wrap">
                        <div className="dex-info-sec showcase-info">
                            <div className="title">DEX INFO</div>
                            <div className="dex-data-table">
                                <div className="data-row">
                                    <div><strong>Current Price</strong></div>
                                    <div>{market.current_price.usd} USD</div>
                                </div>
                                <div className="data-row">
                                    <div><strong>Total Value Locked</strong></div>
                                    <div>{market.total_value_locked.usd} USD</div>
                                </div>
                                <div className="data-row">
                                    <div><strong>Market Cap Rank</strong></div>
                                    <div>{getGecko.market_cap_rank}</div>
                                </div>    
                                <div className="data-row">
                                    <div><strong>Liquidity Score</strong></div>
                                    <div>{getGecko.liquidity_score}</div>
                                </div>                            
                                <div className="data-row">
                                    <div><strong>Circulating Supply</strong></div>
                                    <div>{Math.round(market.circulating_supply)}</div>
                                </div>
                                <div className="data-row">
                                    <div><strong>Total Supply</strong></div>
                                    <div>{Math.round(market.total_supply)}</div>
                                </div>
                                <div className="data-row">
                                    <div><strong>Total Volume</strong></div>
                                    <div>{market.total_volume.usd} USD</div>
                                </div>
                            </div>
                        </div>
                        <div className="dex-social showcase-info">
                            <div className="title">SOCIAL</div>
                            <div id="sent-bar" className="sentiment-bar">
                                <div className="perc">
                                    <div id="upbar">%1</div>
                                    <div>BULLISH</div>
                                </div>
                                <div id="myProgress">
                                    <div id="myBar"></div>
                                </div>
                                <div className="perc">
                                    <div id="downbar">99%</div>
                                    <div>BEARISH</div>
                                </div>
                            </div>
                            <div className="social-data-table">
                                <div className="data-row">
                                    <div><strong>Coingecko Rank</strong></div>
                                    <div>{getGecko.coingecko_rank}</div>
                                </div>
                                <div className="data-row">
                                    <div><strong>Coingecko Score</strong></div>
                                    <div>{getGecko.coingecko_score}</div>
                                </div>
                                <div className="data-row">
                                    <div><strong>Public Interest</strong></div>
                                    <div>{getGecko.public_interest_score}</div>
                                </div>    
                                <div className="data-row">
                                    <div><strong>Community Score</strong></div>
                                    <div>{getGecko.community_score}</div>
                                </div>                            
                                <div className="data-row">
                                    <div><strong>Twitter Followers</strong></div>
                                    <div>{getGecko.community_data.twitter_followers}</div>
                                </div>
                            </div>
                        </div>
                        <div className="socials">
                            <div className={`${links.blockchain_site ? 'social-link' : 'hide'}`}>
                                <a className="mag-btn" href={ links.blockchain_site[0] } target="_blank"><GiMagnifyingGlass /></a>
                            </div>
                            <div className={`${links.announcement_url ? 'social-link' : 'hide'}`}>
                                <a className="mag-btn" href={ links.announcement_url[0] } target="_blank"><BsMedium /></a>
                            </div>
                            <div className={`${links.chat_url[0] ? 'social-link' : 'hide'}`}>
                                <a className="mag-btn" href={ links.chat_url[0] } target="_blank"><BsDiscord /></a>
                            </div>
                            <div className={`${links.chat_url[1] ? 'social-link' : 'hide'}`}>
                                <a className="mag-btn" href={ links.chat_url[1] } target="_blank"><ImYoutube /></a>
                            </div>
                            <div className={`${links.homepage[0] ? 'social-link' : 'hide'}`}>
                                <a className="mag-btn" href={ links.homepage[0] } target="_blank"><CgWebsite /></a>
                            </div>
                            <div className={`${links.twitter_screen_name ? 'social-link' : 'hide'}`}>
                                <a className="mag-btn" href={ 'http://www.twitter.com/'+links.twitter_screen_name } target="_blank"><BsTwitter /></a>
                            </div>
                        </div>
                    </div>
                </div>
                
            )
        }
    }else{
        return (
            <div className="showcase-wrap">
                <div className="dex-info-sec showcase-info">
                    <div className="title">DEX INFO</div>
                    <div>
                        Custom Data Here
                    </div>
                </div>
                <div className="dex-social showcase-info">
                    <div className="title">SOCIAL</div>
                    <div>
                        Custom Data Here
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Showcase
