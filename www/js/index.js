/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener("deviceready", onDeviceReady, false);

let isUserInterrupted = false;
let interruptionIndex = 0;

document
  .querySelector(".text-container")
  .addEventListener("click", function () {
    isUserInterrupted = true;
  });

document
  .querySelector(".text-container")
  .addEventListener("touchend", function () {
    isUserInterrupted = true;
  });

  /* COLOR: GREY */
function applyGlassStylingGrey(element) {
  element.style.border = "1px solid rgba(125, 125, 125, 0.5)";
  element.style.boxShadow = "inset 0 0 10px 1px rgba(24, 24, 24, 0.37)";
  element.style.backdropFilter = "blur(2px)";
  element.style.borderRadius = "10px";
  element.style.padding = "8px";
  element.style.backgroundColor = "rgba(125, 125, 125, 0.5)";
}

/* COLOR: RED */
function applyGlassStylingRed(element) {
  element.style.border = "1px solid rgba(234, 108, 108, 0.2)";
  element.style.boxShadow = "inset 0 0 10px 1px rgba(24, 24, 24, 0.37)";
  element.style.backdropFilter = "blur(2px)";
  element.style.borderRadius = "10px";
  element.style.padding = "8px";
  element.style.backgroundColor = "rgba(234, 108, 108, 0.2)";
}

/* COLOR: Green */
function applyGlassStylingGreen(element) {
  element.style.border = "1px solid rgba(117, 224, 108, 0.2)";
  element.style.boxShadow = "inset 0 0 10px 1px rgba(24, 24, 24, 0.37)";
  element.style.backdropFilter = "blur(2px)";
  element.style.borderRadius = "10px";
  element.style.padding = "8px";
  element.style.backgroundColor = "rgba(117, 224, 108, 0.2)";
}

/* COLOR: BLUE */
function applyGlassStylingBlue(element) {
  element.style.border = "1px solid rgba(108, 149, 224, 0.2)";
  element.style.boxShadow = "inset 0 0 10px 1px rgba(24, 24, 24, 0.37)";
  element.style.backdropFilter = "blur(2px)";
  element.style.borderRadius = "10px";
  element.style.padding = "8px";
  element.style.backgroundColor = "rgba(108, 149, 224, 0.2)";
}

async function typeText(element, html, delay = 70) {
  const regex = /<[^>]*>|[^<]+/g;
  const parts = html.match(regex);
  element.style.fontStyle = "normal";
  for (let part of parts) {
    if (part.startsWith("<p")) {
      let p = document.createElement("p");
      applyGlassStylingGrey(p);
      element.appendChild(p);
    } else if (!part.startsWith("<")) {
      for (let i = interruptionIndex; i < part.length; i++) {
        if (isUserInterrupted) {
          element.lastChild.innerHTML += part.slice(i);
          interruptionIndex = 0;
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        element.lastChild.innerHTML += part[i];
      }
    }
    isUserInterrupted = false;
  }
} 

async function typeTextItalic(element, html, delay = 70) {
  const regex = /<[^>]*>|[^<]+/g;
  const parts = html.match(regex);
  for (let part of parts) {
    if (part.startsWith("<p")) {
      let p = document.createElement("p");
      applyGlassStylingGrey(p);
      p.style.fontStyle = "italic";
      element.appendChild(p);
    } else if (!part.startsWith("<")) {
      for (let i = interruptionIndex; i < part.length; i++) {
        if (isUserInterrupted) {
          element.lastChild.innerHTML += part.slice(i);
          interruptionIndex = 0;
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        element.lastChild.innerHTML += part[i];
      }
    }
    isUserInterrupted = false;
  }
}

function applyTypingCss(element) {
    element.style.animation = "typing 2s steps(22), blink .5s step-end infinite alternate";
    element.style.fontFamily = "monospace";
    element.style.fontSize = "1.5em";
    element.style.color = "#fff"
}

function onDeviceReady() {
  console.log("Running cordova-" + cordova.platformId + "@" + cordova.version);
  // document.getElementById("deviceready").classList.add("ready");

  let textContainer = document.querySelector(".text-container");
  applyTypingCss(textContainer);
  typeText(textContainer, '<p>Type "wake up" to begin.</p>');

  let submitButton = document.querySelector(".submit-button");
  submitButton.addEventListener("click", function () {
    let inputField = document.querySelector(".input-field");
    let command = inputField.value.toLowerCase();

      if (command === "wake up") {
        textContainer.innerHTML = ""; // Clear the textContainer
        sceneOne();
      }

    inputField.value = "";
  });
}

async function sceneOne() {

    let gameContainer = document.querySelector(".game-container");
    gameContainer.style.backgroundImage = "url(img/03.png)";
    gameContainer.style.transition = "background-image 4s ease-in-out";

    let textContainer = document.querySelector(".text-container");
    applyTypingCss(textContainer);
    await typeTextItalic(
        textContainer,
        "<p>Cold... drops on my face... dew? Morning. It's morning.</p>"
    );
    await typeText(
        textContainer,
        "<p>You open your eyes and stare up at the sky, you find yourself laying on your back in the forest. You push your hands against the damp earth and lift yourself into a sitting position.</p>"
    );
  
      gameContainer.style.backgroundImage = "url(img/01.jpg)";
      gameContainer.style.transition = "background-image 3s ease-in-out";
  
    await typeTextItalic(
        textContainer,
        "<p>How did I get here? Last thing I remember was walking down Scott Street in Neo-Norway... I need to get back.</p>"
    );
    await typeText(
        textContainer,
        "<p>As you lift yourself to your feet you cry out as a sharp pain in your right leg causes you to fall over.</p>"
    );

}


/*
added all the glass effects for the different text boxes. need to find out if there is an easier way to go this. rather than creating 4 typingText and typingTextItalic functions
added a transition for sky and sitting position images on line 157 and 171. check if there is a way to make it smoother

*/