//! ********** global variables **************
var siteName = document.getElementById("siteNameId");
var siteUrl = document.getElementById("siteUrlId");
var buttonSbmit = document.getElementById("btnSubmit");
var layerMassageId = document.getElementById("layerMassage");
var sitesList = [];

function closefunc() {
    layerMassageId.classList.add("d-none");
}

if(localStorage.getItem("sitesInfo") != null) {
    sitesList = JSON.parse(localStorage.getItem("sitesInfo"));
    displayInfo();
}


function addSiteInfo() {
    if( validation(siteName)  && validation(siteUrl)) {
        
        var siteInfo = {
            Name: siteName.value,
            Url: siteUrl.value
        }
        
        sitesList.push(siteInfo);
        
        localStorage.setItem("sitesInfo" , JSON.stringify(sitesList));
        
        displayInfo();

        clearForm();
    }
    else {
        layerMassageId.classList.remove("d-none");
    }
}


function displayInfo() {
    btnSubmit.classList.remove("submitButton");
    var cartona = "";

    for(var i = 0; i<sitesList.length; i++) {
        cartona += `
                <tr class="border-top">
                    <td>${i+1}</td> 
                    <td>${sitesList[i].Name}</td>
                    <td>
                        <button class="rounded btn-visit"><i class="fa-solid fa-eye pe-2"></i><a href="${sitesList[i].Url}" target="_blank">Visit</a></button>
                    </td>
                    <td>
                        <button id="deletButton" onclick="deleteSiteInfo(${i})" class="rounded btn-delete"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button>
                    </td>
                </tr>
        `
    }
    document.getElementById("showData").innerHTML = cartona;
}


function deleteSiteInfo(index) {
    var deleteBtn = document.getElementById("deletButton");
    deleteBtn.classList.add("delete-Button");
    sitesList.splice(index , 1);
    localStorage.setItem("sitesInfo" , JSON.stringify(sitesList));
    displayInfo();
}




function validation(element) {
    var term = element.value;
    var inputId = element.id;
    var regex = {
        siteNameId : /^[a-zA-Z0-9\- ]{3,50}$/,
        siteUrlId: /^(https?:\/\/)?(www\.)?[a-z0-9.-]+\.[a-z]{2,}$/
    }

    if(regex[inputId].test(term)){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        return true;
    }
    else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false;
    }
}


function clearForm() {
    siteName.value = null;
    siteUrl.value = null;
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
}









