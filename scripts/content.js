
mainScript = () => {

  isSideView = false

  setTimeout(() => {

    //console.log("script started")

    let sideImg = chrome.runtime.getURL("./resources/side_layout.png")
    let ogImg = chrome.runtime.getURL("./resources/og_layout.png")

    if (document.querySelector("#myBtnContainer")) {
      return;
    }

    //handling theater mode
    let theaterBtn = document.querySelector(".ytp-size-button.ytp-button")
    let isTheaterMode
    if (theaterBtn.title === 'Theater mode (t)')
      isTheaterMode = false
    else if (theaterBtn.title === 'Default view (t)')
      isTheaterMode = true

    //handling fullscreen
    
    let fullscreenBtn = document.querySelector(".ytp-fullscreen-button.ytp-button")
    /*
    let isFullscreen
    if (fullscreenBtn.title === 'Full screen (f)')
    */

    let btnsContainer = document.createElement("div")
    btnsContainer.setAttribute("id", "myBtnContainer")
    var rightBtn = document.createElement("img")
    rightBtn.src = sideImg + "?" + Date.now()
    rightBtn.alt="side-view"
    btnsContainer.appendChild(rightBtn)
    //let leftBtn = document.createElement("button")  // Future feature (swap sides)
    //leftBtn.innerHTML = "side"
    //btnsContainer.appendChild(leftBtn)
    //leftBtn.style.width = rightBtn.style.width = "50px"

    //btn styling
    btnsContainer.style.height = "100%"
    rightBtn.style.height = "100%" 
    rightBtn.style.color = "white"
    rightBtn.style.backgroundColor = "#0f0f0f"
    rightBtn.style.pointerEvents = "auto"
    rightBtn.style.display = "flex"
    rightBtn.style.alignItems = "center"
    rightBtn.style.justifyContent = "center"
    rightBtn.addEventListener('mouseover', () => {
      rightBtn.style.backgroundColor = "#242424"
    })
    rightBtn.addEventListener('mouseout', () => {
      rightBtn.style.backgroundColor = "#0f0f0f"
    })

    //appending
    document.querySelector("#masthead").appendChild(btnsContainer);
    btnsContainer.style.position = "absolute"
    btnsContainer.style.top = "14.5px"
    btnsContainer.style.right = "190px"
    btnsContainer.style.height = "29px"
    btnsContainer.style.width = "45px"
    btnsContainer.style.display = "flex"
    btnsContainer.style.justifyContent = "center"

    //comment section
    let commentContainer = document.querySelector("#comments")       
    let commentConCon = document.querySelector("#below")
    let commentsInterval = setInterval(() => {
      commentContainer = document.querySelector("#comments")       
      commentConCon = document.querySelector("#below")
      if (commentConCon && commentContainer) {
        clearInterval(commentsInterval)
      }
    }, 500)
    
    //primary and secondary column container
    let primary = document.querySelectorAll("#primary")[document.querySelectorAll("#primary").length-1]
    let p_id = setInterval(() => {
      primary = document.querySelectorAll("#primary")[document.querySelectorAll("#primary").length-1]
      if (primary)
        clearInterval(p_id)
    }, 500)

    let secondaryColumn = document.querySelectorAll("#secondary")[document.querySelectorAll("#secondary").length-1]
    let columns = document.querySelector("#columns")
    
    let columnsInterval = setInterval(() => {
      secondaryColumn = document.querySelectorAll("#secondary")[document.querySelectorAll("#secondary").length-1]
      columns = document.querySelector("#columns")
      if (secondaryColumn && columns) {
        clearInterval(columnsInterval)
      }
    }, 500)
    
    /* tests */
    let findChild = setInterval(() => {
      if (columns) {
        if (columns.lastElementChild) {
          secondaryColumn = columns.lastElementChild
          clearInterval(findChild)
        }
      }
    }, 1000)

    /* custom media queries - kinda */
    micBtn = document.querySelector("#voice-search-button")
    newCommentWidth = 0
    if (window.innerWidth < 1231) 
      micBtn.style.visibility = "hidden"
    else 
      micBtn.style.visibility = "visible"
    
    if (window.innerWidth < 1017)
      btnsContainer.style.visibility = "hidden"
    else 
      btnsContainer.style.visibility = "visible"

    addEventListener("resize", () => {

      if (window.innerWidth < 1231) {
        micBtn.style.visibility = "hidden"
      } else {
        micBtn.style.visibility = "visible"
      }

      if (window.innerWidth < 1017) {
        btnsContainer.style.visibility = "hidden"
      }
      else {
        btnsContainer.style.visibility = "visible"
      }

      if (secondaryColumn.style.visibility === "hidden") { 
        if (window.innerWidth < 1017) {
          func()
          return;
        }
        newCommentWidth = (1 - (primary.clientWidth / window.innerWidth) - 0.01) * 100
        commentContainer.style.width = newCommentWidth + "%"
      }
    });
    


    /*******************************  main script  *******************************/
    const func = () => {

      let primaryWidth
      if (!primary.clientWidth) {
        let pI = setInterval(() => {
          primaryWidth = document.querySelectorAll("#primary")[document.querySelectorAll("#primary").length-1].clientWidth
          if (primaryWidth)
            clearInterval(pI)
        }, 500)
      }

      newCommentWidth = (1 - (primary.clientWidth / window.innerWidth) - 0.01) * 100
      newCommentHeight = document.querySelector("#player").clientHeight
      commentContainer.style.scrollbarWidth = "none"

      if (!isSideView && innerWidth > 1016){

        isSideView = true
        rightBtn.src = ogImg + "?" + Date.now()
        rightBtn.alt="side-view"

        columns.appendChild(commentContainer)

        while (commentContainer.parentNode.id !== "columns") {
          setTimeout(() => {
            columns.appendChild(commentContainer)
          }, 200)
        }
        
        let secHidden=document.querySelectorAll("#secondary")[document.querySelectorAll("#secondary").length-1].style.visibility = "hidden"

        columns.style.justifyContent = "flex-start"
        columns.style.marginLeft = "-10px"   
  
        primary.style.display="inline-block"
          
        commentContainer.style.position = "absolute"
        commentContainer.style.width = newCommentWidth + "%"
        commentContainer.style.display = "inline-block"

        commentContainer.style.top = "78px"
        commentContainer.style.right = "0px"
        commentContainer.style.minHeight = newCommentHeight + "px"
        commentContainer.style.maxHeight = newCommentHeight + "px"
        commentContainer.style.height = newCommentHeight + "px"
        commentContainer.style.borderLeft = "solid"
        commentContainer.style.borderBottom = "solid"
        commentContainer.style.borderTop = "solid"
        commentContainer.style.borderColor = "#3c3c3c"
        commentContainer.style.borderBottomLeftRadius = "10px"
        commentContainer.style.borderTopLeftRadius = "10px"
        commentContainer.style.borderWidth = "1.5px"
        commentContainer.style.overflowY = "scroll"
        commentContainer.style.overflowX = "hidden"
        commentContainer.style.paddingLeft = "8px"
        commentContainer.style.overscrollBehavior = "contain" //new

      } else if (isSideView) {

        isSideView = false
        rightBtn.src = sideImg + "?" + Date.now()
        rightBtn.alt="side-view"

        commentConCon.appendChild(commentContainer)
        while (commentContainer.parentNode.id !== "below") {
          setTimeout(() => {
            commentConCon.appendChild(commentContainer)
          }, 200)
        }

        let secShown = document.querySelectorAll("#secondary")[document.querySelectorAll("#secondary").length-1].style.visibility = ""

        columns.style.justifyContent = "center"
        columns.style.marginLeft = ""

        primary.classList.remove("style-scope")
        primary.classList.remove("ytd-watch-flexy")
        primary.classList.add("style-scope")
        primary.classList.add("ytd-watch-flexy")

        commentContainer.style.overflowX = commentContainer.style.overflowY = "hidden"
        commentContainer.style.width = "100%"
        commentContainer.style.minHeight = ""
        commentContainer.style.maxHeight = ""
        commentContainer.style.height = ""
        commentContainer.style.border = "none"
        commentContainer.style.position = ""
        commentContainer.style.top = ""
        commentContainer.style.right = ""
        commentContainer.style.paddingLeft = ""
        commentContainer.style.overscrollBehavior = ""
      }
    }

    /*******************************  btns and injector *******************************/
    rightBtn.onclick = function() {
      if (isTheaterMode) {
          theaterBtn.click()
      }
      setTimeout(() => {
        func()
      }, 50)
    }

    /*  Future feature
    leftBtn.onclick = function() {
      columns.appendChild(primary)
    }
    */

    //theater handler
    theaterBtn.onclick = function() {      
      if (isSideView) {
          func()
      }

      isTheaterMode = !isTheaterMode
    }

    //theater handler
    fullscreenBtn.onclick = function() {
      if (isSideView) {
        func()
      }
    }

  }, 1000)
}

/* Injector - automatically and manually when the automatic one fails (because SPAs and navigation) */
if ((location.href).substring(0, 30) === "https://www.youtube.com/watch?") {
  let mainInterval = setInterval(() => {
    if (document.querySelector("#buttons")) {
      mainScript();
      clearInterval(mainInterval)
      chrome.runtime.sendMessage({msg: "init"})
    }
  }, 1500)
}
