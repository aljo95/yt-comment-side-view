isSideView = false

mainScript = () => {

  setTimeout(() => {

    //handling theater mode
    let theaterBtn = document.querySelector(".ytp-size-button.ytp-button")
    let isTheaterMode
    if (theaterBtn.title === 'Theater mode (t)')
      isTheaterMode = false
    else if (theaterBtn.title === 'Default view (t)')
      isTheaterMode = true

    let btnsContainer = document.createElement("div")
    btnsContainer.setAttribute("id", "myBtnContainer")
    //let leftBtn = document.createElement("button")  // Future feature (swap sides)
    //leftBtn.innerHTML = "swap side"
    let rightBtn = document.createElement("button")
    rightBtn.innerHTML = "swap view"
    //btnsContainer.appendChild(leftBtn)
    btnsContainer.appendChild(rightBtn)
    //leftBtn.style.width = rightBtn.style.width = "50px"

    //btn styling
    btnsContainer.style.height = "100%"
    rightBtn.style.height = "100%"
    rightBtn.style.width = "80px"
    rightBtn.style.color = "white"
    rightBtn.style.backgroundColor = "#0f0f0f"
    rightBtn.style.border = "solid"
    rightBtn.style.borderColor = "white"
    rightBtn.style.borderWidth = "1px"
    rightBtn.style.pointerEvents = "auto"
    rightBtn.style.borderRadius = "10px"
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
    btnsContainer.style.top = "14px"
    btnsContainer.style.right = "180px"
    btnsContainer.style.height = "30px"
    btnsContainer.style.width = "80px"

    //comment section
    let commentContainer = document.querySelector("#comments")       
    let commentConCon = document.querySelector("#below")
    
    //primary and secondary column container
    let primary = document.querySelector("#primary")
    let secondaryColumn = document.querySelector("#secondary")
    let columns = document.querySelector("#columns")

    /* tests */
    let findChild = setInterval(() => {
      if (columns.lastElementChild !== null) {
        secondaryColumn = columns.lastElementChild
        clearInterval(findChild)
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
      rightBtn.style.visibility = "hidden"
    else 
      rightBtn.style.visibility = "visible"
    
    addEventListener("resize", () => {

      if (window.innerWidth < 1231) {
        micBtn.style.visibility = "hidden"
      } else {
        micBtn.style.visibility = "visible"
      }

      if (window.innerWidth < 1017) {
        rightBtn.style.visibility = "hidden"
      }
      else {
        rightBtn.style.visibility = "visible"
      }

      if (secondaryColumn.style.visibility === "hidden") { 

        if (window.innerWidth < 1017) {
          func()
          return;
        }
        console.log(window.innerWidth)
        newCommentWidth = (1 - (primary.clientWidth / window.innerWidth) - 0.006) * 100
        commentContainer.style.width = newCommentWidth + "%"
      }
    });
    
    /*  main style changer function  */
    const func = () => {
      
      newCommentWidth = (1 - (primary.clientWidth / window.innerWidth) - 0.006) * 100

      if (secondaryColumn.style.visibility === "" && innerWidth > 1016){

        isSideView = true
        
        columns.appendChild(commentContainer)
        secondaryColumn.style.visibility = "hidden"

        columns.style.justifyContent = "flex-start"
        columns.style.marginLeft = "-10px"                
        primary.style.display="inline-block"
        
        let commentHeight = document.querySelector("#player").clientHeight
        
        commentContainer.style.position = "absolute"
        commentContainer.style.width = newCommentWidth + "%"
        commentContainer.style.top = "78px"
        commentContainer.style.right = "0px"
        commentContainer.style.minHeight = commentHeight + "px" //set a vh or just use videoContainer.clientHeight?
        commentContainer.style.maxHeight = commentHeight + "px"
        commentContainer.style.height = commentHeight + "px"
        commentContainer.style.borderLeft = "solid"
        commentContainer.style.borderBottom = "solid"
        commentContainer.style.borderTop = "solid"
        commentContainer.style.borderColor = "#242424"
        commentContainer.style.borderBottomLeftRadius = "10px"
        commentContainer.style.borderTopLeftRadius = "10px"
        commentContainer.style.borderWidth = "1px"
        commentContainer.style.overflowY = "scroll"
        commentContainer.style.overflowX = "hidden"
        commentContainer.style.paddingLeft = "8px"

      } else if (secondaryColumn.style.visibility === "hidden") {

        isSideView = false
        secondaryColumn.style.visibility = ""
        commentConCon.appendChild(commentContainer)

        columns.style.justifyContent = "center"
        
        //INSTEAD OF ADDING MARGINLEFT AND SHIT JUST READD THE OG CLASSES!
        columns.style.marginLeft = ""
        primary.classList.remove("style-scope")
        primary.classList.remove("ytd-watch-flexy")
        primary.classList.add("style-scope")
        primary.classList.add("ytd-watch-flexy")

        commentContainer.style.overflowX = commentContainer.style.overflowY = "hidden"
        commentContainer.style.width = "100%"
        commentContainer.style.minHeight = "100%"
        commentContainer.style.maxHeight = "100%"
        commentContainer.style.height = "100%"
        commentContainer.style.border = "none"
        commentContainer.style.position = ""
        commentContainer.style.top = ""
        commentContainer.style.right = ""
        commentContainer.style.paddingLeft = ""
      }
    }

    rightBtn.onclick = async function() {
      /*
      if (isTheaterMode) {
        await theaterBtn.click()
        func()
      } else
      */
        func()
    }

    //theater handler
    //theaterBtn.onclick = function() {               
    //  isTheaterMode = !isTheaterMode
    //  if (isSideView) 
    //    rightBtn.click()
    //}
  }, 2000)
}


/* Injector - automatically and manually when the automatic one fails (because SPAs and navigation) */
if ((location.href).substring(0, 30) === "https://www.youtube.com/watch?") {
  let mainInterval = setInterval(() => {
    if (document.querySelector("#buttons")) {
      mainScript();
      clearInterval(mainInterval)
      chrome.runtime.sendMessage({msg: "init"})
      console.log("how many times?")
    }
  }, 1500)
}
