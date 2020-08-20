// ==UserScript==
// @name        Aruba ClearPass Guest Search Helper
// @description Adds helpfull options for searching in ClearPass Guest
// @author      Joseph Selby
// @match       *://register.cmich.edu/guest/*
// @version     1.0.0
// @updateURL https://gist.github.com/vrelk/31d8256b1f7713d13fa3c316818fd7e1/raw/a236709f1e7e846b281af071db7430620e0837ee/clearpass-guest-search.user.js
// 
// ==/UserScript==
let clearButton = document.getElementById('mac_list_search_clear');
//Leave quietly if we cannot find that button
if (!clearButton) {
    return;
}

let clearButtonParent = clearButton.parentNode;

var zNode = document.createElement('span');
zNode.innerHTML = '<button id="OIT-FixMac" type="button">Format MAC</button>' +
    ' <button id="OIT-SearchGID" type="button">Search by GID</button>';
zNode.setAttribute('id', 'OIT-Additions');
clearButtonParent.appendChild(zNode);

//--- Add listeners
document.getElementById("OIT-FixMac").addEventListener(
    "click", OitFormatMac, false
);
document.getElementById("OIT-SearchGID").addEventListener(
    "click", OitSearchGID, false
);

//--- Automatically trim and format a mac address
function OitFormatMac(zEvent) {
    var macAddr = macField.value.trim();
    macAddr = macAddr.toUpperCase();
    macAddr = macAddr.replace(/\W/ig, '');
    macAddr = macAddr.replace(/^([A-F0-9]{2})([A-F0-9]{2})([A-F0-9]{2})([A-F0-9]{2})([A-F0-9]{2})([A-F0-9]{2})$/g, "$1-$2-$3-$4-$5-$6");
    OitDoSearch(macAddr);
}

//--- Search by Global ID
function OitSearchGID(zEvent) {
    var searchQuery = "";
    var gid = prompt("Please enter the desired CMU Global ID", "");
    gid = gid.trim();
    if (gid !== "") {
        OitDoSearch("sponsor_name = " + gid);
    } else {
        alert("Value was empty");
    }
}

//--- Change the search field and do the search
function OitDoSearch(searchQuery) {
    var macField = document.getElementById("mac_list_search");
    macField.value = searchQuery;
    var event = new Event('change');
    macField.dispatchEvent(event);
}
