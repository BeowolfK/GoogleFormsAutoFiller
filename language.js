let langLib = {
    "en": {
        "title": "Google Forms ShotGun",
        "label": "Label",
        "value": "Value",
        "saved": "Saved",
        "add": "Add",
        "save": "Save"
    },
    "fr": {
        "title": "Google Forms ShotGun",
        "label": "Label",
        "value": "Valeur",
        "saved": "Enregistré",
        "add": "Ajouter",
        "save": "Sauvegarder"
    }
}




/**
* Sets page language with the selected language on storage
*/
function setLanguageOnWindowLoad(){
    chrome.storage.sync.get("language", function(result) {
        let lang = "en"; // default language is English

        // set language if set before
        if (!objectIsEmpty(result["language"])) {
            lang = result["language"];
        }

        setLanguage(lang);
    });
}



/**
* Sets page language on button click
* @param    {String} langEvent  button click event data
*/
function setLanguageByButton(langEvent) {
    chrome.storage.sync.get("language", function(result) {
        let lang = langEvent.srcElement.value;

        setLanguage(lang);        
    });
}



/**
* Sets page language
* @param    {String} name    Name of the user
*/
function setLanguage(lang){
    // Get elements to be translated
    let textElements = document.querySelectorAll("[data-lang]");

    // Update current language information
    chrome.storage.sync.set({ "language": lang }, function() {
        console.log("Language switched to: " + lang);
    });
    
    // Update texts on screen
    for (let i = 0; i < textElements.length; i++) {
        let dataName = textElements[i].getAttribute("data-lang");
        textElements[i].textContent = langLib[lang][dataName];
    }
}

window.onload = setLanguageOnWindowLoad();