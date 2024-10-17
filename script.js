// let input = document.getElementById("input");
let input = document.querySelector(".input");
let button = document.querySelector(".button");
let but = document.getElementById("but");
let chat = document.querySelector(".chat");
let user = {
    data: null,
}
const url = " https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBBrJFq-_36tJh_XTmXvcgt5Z7qFYJxLZs"

async function mainFunction() {
    let output = "";
    if (user.data.includes("what is your name")) {
        output = " I am Shifra the chatbot";
        return output
    }

    else if (user.data.includes("who developed you") || user.data.includes("who created you")) {
        output = " Mr Ajeet sir";
        return output
    }
    else if (user.data.includes("Fuck you") || user.data.includes("fuck you")) {
        output = " Fuck you to";
        return output
    }
    else if (user.data.includes("clear chat")) {
        chat.innerHTML= "";
       message.style.display="none";
    }

    else {
        let request = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "contents": [{ "parts": [{ "text": user.data }] }]
            })
        }

        let response = await fetch(url, request);
        let data = await response.json();
        console.log(data);
        let output = data.candidates[0].content.parts[0].text;

        output = output.replace(/ \*\*(.*?)\*\*/g, "$1");
        return output
    }


}

function userMessage(mainText) {
    let text = document.querySelector(".chat");
    message = document.createElement("div");
    message.classList.add("message");
    message.classList.add("user");
    let userAvatar = document.createElement("div")
    userAvatar.classList.add("useravatar");
    let userText = document.createElement("div")
    userText.classList.add("text1");
    userText.innerHTML = mainText;
    message.appendChild(userText);
    message.appendChild(userAvatar);
    chat.appendChild(message);

}

function clear() {
    input.value = "";
}
function outputText(outText) {
    let text = document.querySelector(".chat");
    botMessage = document.createElement("div");
    botMessage.classList.add("message");
    botMessage.classList.add("bot");
    let botAvatar = document.createElement("div")
    botAvatar.classList.add("botavatar");
    let botText = document.createElement("div")
    botText.classList.add("text");
    botText.innerHTML = outText;
    botMessage.appendChild(botText);
    botMessage.appendChild(botAvatar);
    chat.appendChild(botMessage);
    clear();

}
async function inputText() {
    let mainInput = document.querySelector(".input").value;
    user.data = mainInput;
    if (user.data) {
        userMessage(user.data);
        let output2 = await mainFunction(mainInput);
        outputText(output2);
    }

}
let speechRecongnition = window.webkitSpeechRecognition;
let recongnition = new speechRecongnition();
recongnition.onresult = (ent) => {
    let currentInd = ent.resultIndex;
    let transcript = ent.results[currentInd][0].transcript;
    document.querySelector(".input").value = transcript;
    inputText();

};

button.addEventListener("click", inputText);

but.addEventListener("click", () => {
    recongnition.start();

});
input.addEventListener(`keypress`, (event) => {

    if (event.keyCode === 13) {

        inputText();

    }

});