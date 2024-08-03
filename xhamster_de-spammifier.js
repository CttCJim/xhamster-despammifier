// ==UserScript==
// @name         xhamster de-spammifier
// @namespace    http://tampermonkey.net/
// @version      2024-08-02
// @description  Removes spam and ads from xhamster.com
// @author       CttCJim
// @match        https://xhamster.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=xhamster.com
// @grant        none
// @require https://code.jquery.com/jquery-3.6.3.min.js
// ==/UserScript==

(function() {
    'use strict';
    //logo
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    var init=true;
    if(init) {
        var len = $(".logo img").length;
        if(len>0) {
            var html = `<span id="despLogo" style="position:relative;left:35px;color:#e1351f;font-weight:bold;font-size:2em;top:-20px;text-shadow:1px 1px 0 #000,-1px 1px 0 #000,-1px -1px 0 #000,1px -1px 0 #000;">Despammified!</span>`;
            var el = document.createElement("span");
            el.innerHTML = html;
            //var div = document.getElementsByClassName("logo")[0];
            var div = $(".logo img")[len-1];
            insertAfter(div, el);
        }
        init=false;
    }

    function kill() {
        $('*[data-role="promo-messages-wrapper"]').remove();
        $('*[data-role="yld-pcbottom"]').remove();
        $('*[data-testid="right-banner-section"]').remove();
        //$(".player-container").css('marginRight',0); //not needed if you turn on 'large mode' on the videos
        var divs = $("div");
        for(var x=0;x<divs.length;x++){
            var thisdiv = divs[x];
            var classes = thisdiv.classList;
            var remove = false;
            if(!remove) {//check roles
                if(typeof(thisdiv.dataset.role)!="undefined") {
                    if(
                        ($(thisdiv).data('role').includes('RUHLbottom'))
                        ||($(thisdiv).data('role').includes('RUHLunder-comments'))
                        ||($(thisdiv).data('role').includes('RUHLbanner-underplayer'))
                      ) {
                        remove=true;
                    }
                }
            }
            if(!remove) {//check classes
                for(var y=0;y<classes.length;y++) {
                    if(
                        (classes[y].includes("RUHLright-rectangle--plug-img"))
                        ||(classes[y].includes("acpremium-n-overlay"))
                        ||(classes[y].includes("RUHLpremium-n-overlay"))
                        ||(classes[y].includes("accam-thumb"))
                        ||(classes[y].includes("acright-rectangle--plug-img"))
                        ||(classes[y].includes("pcpremium-n-overlay"))
                        ||(classes[y].includes("RUHLcam-thumb"))
                        ||(classes[y].includes("related-videos"))
                        ||(classes[y].includes("RUHLbanner-underplayer"))
                    ) {
                        remove=true;
                        break;//stop checking classes
                    }
                }
            }
            if(remove) {
                $(thisdiv).remove();
                continue;//move on to next div
            }
        }
    }
    // Your code here...
    //setInterval(kill,1000);
    kill();
})();