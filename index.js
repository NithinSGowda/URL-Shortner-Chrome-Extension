var url;
chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
      url = tabs[0].url;
   }
);
setTimeout(()=>{
    document.querySelector('.fform-control').value = url;
    document.querySelector(".scrollto").onclick = createurl
},100)

function createurl(){
    var data = new FormData();
    var form = document.querySelector("form");
    data.append("textarea", form.textarea.value);
    data.append("submit", "true");
    data.append("user", form.user.value);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        myObj = JSON.parse(this.responseText);
        document.querySelector(".result").style.display = "block";
        document.querySelector(".result-text").innerHTML = "<a href=\"" + myObj.url + "\" target=\"_blank\" id=\"url\">" + myObj.url + "</a>";
    }
    });
    xhr.open("POST", "https://nith.ml/api.php");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.send(data);
}

document.querySelector(".copy").onclick = copytoCB
async function copytoCB() {
    try {
      await navigator.clipboard.writeText(document.getElementById("url").innerHTML);
      console.log('Page URL copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
}
  
const getAccessToken = (callback) => {
    chrome.cookies.get({
      url: 'https://nith.ml/',
      name: 'userID'
    }, (cookie) => {
      if(cookie){
      document.querySelector(".userID").value = cookie.value;
      return cookie;
    }
      else{
        document.querySelector(".userID").value = 2;
        return 2
      }
    });
}
getAccessToken()
