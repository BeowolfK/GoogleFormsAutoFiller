/**
* Fills inputs on forms page with the data
*/
function FillGoogleForms() {
    chrome.storage.sync.get("formData", function(result) {
        formData = result["formData"];
        console.log(formData);
        let FormElement = document.getElementsByTagName("form")[0];
        // Fill text fields
        let selectorStr = "input[type='text'], input[type='email'], input[type='number'], input[type='tel'], input[type='url']";
        let fields = FormElement.querySelectorAll(selectorStr);
        fields.forEach(function(item) {
            let formTitle = item.closest("div[role='listitem']").querySelector("div[role='heading']").firstChild.textContent;
            let answer;
            for(const cle in formData){
                console.log(cle);
                const regex = new RegExp(cle, "i");
                if(regex.test(formTitle.trim())){
                    answer=formData[cle];
                    break;
                }
            }
            // let answer = formData[formTitle.trim()];
            if (answer) {
                item.value = answer;
                item.setAttribute("data-initial-value", answer);
                item.setAttribute("badinput", "false");
                // TODO: find the class that hides input inside text by reversed css finding
                item.nextElementSibling.style.display = "none";
            }
        });


        // Fill textareas
        fields = FormElement.querySelectorAll("textarea");
        fields.forEach(function(item) {
            let formTitle = item.closest("div[role='listitem']").querySelector("div[role='heading']").firstChild.textContent;
            let answer;
            for(const cle in formData){
                console.log(cle);
                const regex = new RegExp(cle, "i");
                if(regex.test(formTitle.trim())){
                    answer=formData[cle];
                    break;
                }
            }
            if (answer) {
                item.value = answer;
                item.setAttribute("data-initial-value", answer);
                item.setAttribute("badinput", "false");
                // TODO: find the class that hides input inside text by reversed css finding
                item.parentElement.previousElementSibling.style.display = "none";
            }
        });


        
    });
}


window.onload = FillGoogleForms();