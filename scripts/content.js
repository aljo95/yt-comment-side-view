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
      if (columns.lastElementChild) {
        secondaryColumn = columns.lastElementChild
        clearInterval(findChild)
      }
    }, 500)

    //video elements (container for container...)
    let videoElement = document.querySelector(".video-stream.html5-main-video")
    let videoContainer = videoElement.parentElement

    //container for progress bar and controls
    let controlsContainer = document.querySelector(".ytp-chrome-bottom")

    // saving all the original values of the comment section  
    let comments_OGStyle = {
      minWidth: commentContainer.style.minWidth,
      maxWidth: commentContainer.style.maxWidth,
      width: commentContainer.style.width,
      minHeight: commentContainer.style.minHeight,
      maxHeight: commentContainer.style.maxHeight,
      height: commentContainer.style.height,
      minWidth: commentContainer.style.minWidth,
      paddingLeft: commentContainer.style.paddingLeft,
      marginLeft: commentContainer.style.marginLeft,
      marginRight: commentContainer.style.marginRight
    }
    let videoContainer_OGStyle = {
      minWidth: videoContainer.style.minWidth,
      maxWidth: videoContainer.style.maxWidth,
      width: videoContainer.style.width,
      height: videoContainer.style.height,
      maxHeight: videoContainer.style.maxHeight,
      minHeight: videoContainer.style.minHeight
    }
    let primary_OGStyle = {
      marginLeft: primary.style.marginLeft,
      width: primary.style.width,
      maxWidth: primary.style.maxWidth,
      minWidth: primary.style.minWidth,
    }
    let secondary_OGStyle = {
      width: secondaryColumn.style.width,
      maxWidth: secondaryColumn.style.maxWidth,
      minWidth: secondaryColumn.style.minWidth,
    }
    
    let videoElement_OGStyle = {
      width: videoElement.style.width,
      minWidth: videoElement.style.minWidth,
      maxWidth: videoElement.style.maxWidth,
      minHeight: videoElement.style.minHeight,
      maxHeight: videoElement.style.maxHeight,
      height: videoElement.style.height
    }
    
   console.log(videoElement.style.width)
    let controlsContainer_OGStyle = {
      minWidth: controlsContainer.style.minWidth,
      maxWidth: controlsContainer.style.maxWidth,
      width: controlsContainer.style.width
    }

    /*  main style changer function  */
    const func = () => {

      //console.log("--theatermode--> " + isTheaterMode)

      if (secondaryColumn.style.display === ""){
        isSideView = true
        secondaryColumn.style.display = "none"
        secondaryColumn.style.removeProperty("margin-right");

        videoContainer.style.height = "100%"
        videoElement.style.height="100%"
        
        columns.appendChild(commentContainer)

        primary.style.width = "65%"
        primary.style.paddingLeft = "0"
        primary.style.paddingRight = "0"
        primary.style.marginLeft = "0"
        primary.style.marginRight = "1%"

        commentContainer.style.minWidth = "35%"
        commentContainer.style.maxWidth = "35%"
        commentContainer.style.minHeight = "85vh"
        commentContainer.style.maxHeight = "85vh"
        commentContainer.style.height = "85vh"
        commentContainer.style.borderLeft = "solid"
        commentContainer.style.borderBottom = "solid"
        commentContainer.style.borderTop = "solid"
        commentContainer.style.borderColor = "#242424"
        commentContainer.style.borderBottomLeftRadius = "10px"
        commentContainer.style.borderTopLeftRadius = "10px"
        commentContainer.style.borderWidth = "1px"
        commentContainer.style.paddingLeft = "1%"
        commentContainer.style.marginLeft = "0%"
        commentContainer.style.marginTop = "1.25%"
        commentContainer.style.overflowY = "scroll";
        commentContainer.style.overflowX = "hidden";
        commentContainer.style.marginRight = "-2vw"
        
        controlsContainer.style.minWidth = "96.5%"
        controlsContainer.style.maxWidth = "96.5%"
        controlsContainer.style.width = "96.5%"

      } else if (secondaryColumn.style.display === "none") {

        isSideView = false

        videoContainer.style.removeProperty("width");
        videoContainer.style.removeProperty("height");
        
        secondaryColumn.style.marginRight = "-1%"
        secondaryColumn.style.removeProperty("display");

        commentConCon.appendChild(commentContainer)

        //return original styling
        for (const [key, value] of Object.entries(comments_OGStyle)) {
          if (value !== "")
            commentContainer.style[key] = value
          else if (value === "")
            commentContainer.style.removeProperty(key)
        }

        for (const [key, value] of Object.entries(videoContainer_OGStyle)) {
          if (value !== "")
            videoContainer.style[key] = value
          else if (value === "")
            videoContainer.style.removeProperty(key);
        }
        
        for (const [key, value] of Object.entries(primary_OGStyle)) {
          if (value !== "")
            primary.style[key] = value
          else if (value === "")
            primary.style.removeProperty(key);
        }
        
        for (const [key, value] of Object.entries(secondary_OGStyle)) {
          if (value !== "")
            secondaryColumn.style[key] = value
          else if (value === "")
            secondaryColumn.style.removeProperty(key);
        }
        
        for (const [key, value] of Object.entries(videoElement_OGStyle)) {
          if (value !== "")
            videoElement.style[key] = value
          else if (value === "")
            videoElement.style.removeProperty(key);
        }
        
        for (const [key, value] of Object.entries(controlsContainer_OGStyle)) {
          if (value !== "")
            controlsContainer.style[key] = value
          else if (value === "")
            controlsContainer.style.removeProperty(key);
        }
        
        commentContainer.style.overflowX = commentContainer.style.overflowY = "hidden"
        commentContainer.style.minWidth = "100%"
        commentContainer.style.maxWidth = "100%"
        commentContainer.style.width = "100%"
        commentContainer.style.minHeight = "100%"
        commentContainer.style.maxHeight = "100%"
        commentContainer.style.height = "100%"
        commentContainer.style.border = "none"
        commentContainer.style.padding = "0"
        commentContainer.style.margin = "0"
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
    }
  }, 1500)
}
