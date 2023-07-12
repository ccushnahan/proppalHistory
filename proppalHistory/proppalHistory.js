`
Small extension to print out info about the properties history on property pal.
`


async function findHistory() {
    // location.reload();

    const [,propertyAddress, propertyID] = location.pathname.split("/");
    const apiKey = [...document.querySelectorAll("script")].filter(x => x.src.includes("build"))[0].src.split("/")[7]; 
    

    const apiURL = `https://www.propertypal.com/_next/data/${apiKey}/en/property.json?address=${propertyAddress}&id=${propertyID}`;
    
    fetch(apiURL).then(resp => resp.json())
                 .then(data => data.pageProps.property.history)
                 .then(history => createHistoryModalContent(history))
                 .then(content => insertHistoryModal(content));
}

async function createHistoryModalContent(history) {
    
    let histCont = `<div><h1><img src="/_static/dcb6a7824767d180776cd9ecd4c5d9ee336d70bd/_next/static/media/PropertyPalLogo@3x.c8a03f97.png" alt="PropertyPal Logo" class="sc-1uuvv1y-1 cLTDRR">Property Update History</h1></div><br/>`
    for (historyItem of history.reverse()) {
        histCont += `    
        <div>
        <h2>${historyItem.previousPrice == null ? "Added" : "Updated"} on ${historyItem.timeModified.split("T")[0]}</h2>
        <br>
        <div>
        <p><strong>Update Price: </strong>${historyItem.price}</p>
        <p><strong>Previous Price: </strong>${historyItem.previousPrice}</p>
        <p><strong>Price Change: </strong>${historyItem.priceChange}</p>
        <p><strong>Price Change: </strong>${historyItem.difference}</p>
        <p><strong>Price Change: </strong>${historyItem.differencePercentage}</p>
        <p><strong>Update Status: </strong>${historyItem.status.text}</p><br>
        <hr/><br>
        <div/>
        </div>`
    }
    return histCont;
}

async function insertHistoryModal(content) {
    let head = document.querySelector("head")
    let body = document.querySelector("body");
    let style = `
    <style id='history-style'>
    .history-modal {
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%;
        overflow: auto; 
        background-color: rgb(0,0,0); 
        background-color: rgba(0,0,0,0.4); 
        font-family: Open Sans,Segoe UI,sans-serif;
      }
      
      .history-modal-content {
        background-color: #fefefe;
        margin: 15% auto; 
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
      }
      
      .history-close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }
      
      .history-close:hover,
      .history-close:focus {
        color: black;
        text-decoration: none;
        cursor: pointer;
      }

    </style>
    <a href="https://www.flaticon.com/free-icons/home-button" title="home button icons">Home button icons created by Freepik - Flaticon</a>
    `
    let modal =  `

        <div id="myModal" class="history-modal">

        <div class="history-modal-content">
            <span class="history-close" id="closeHistoryButton">&times;</span>
            ${content}            
        </div>

        </div>
    `
    head.insertAdjacentHTML("beforeend", style)
    body.insertAdjacentHTML("beforeend", modal);
    document.querySelector("#closeHistoryButton").addEventListener("click", x => document.querySelector("#myModal").remove());
}

findHistory();