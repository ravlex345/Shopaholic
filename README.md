# Shopaholics: The Shopping Cart of Doom
 A chrome extension dedicating you to help you stop buying things
 
# What it does

Built as a chrome extension, the shopping cart of doom is an extension that annoys you into not shopping. It stops you by annoying with multiple modals that pop up with audacious questions. The longer you continue to shop, the more popups you will continue to face, and it will make your shopping experience truly haranguing. A cute pop-up depicts how often you visit these websites, no. of misdirects, no. of good choices, and the no. of interventions needed.

# How we built it

The extension monitors website URLs and detects if the user is visiting shopping-related sites (Amazon, eBay, Walmart, etc.). Using javascript, html and css I worked on the framework of the extension deploying it locally through chrome as an extension via GitHub. When a shopping site is detected by the watchers, a modal popup appears with a sassy, rude, and quirky deterrent question aimed at making the user rethink their purchase. These questions are generated by an gen AI model LLM- cf/meta/llama-2-7b-chat-int8 hosted on cloudflare, and it comes up with the one liners on the fly which is then fed into the extension via fetch and displayed into the modal. As the program progresses through the triggers for the counters being saved- we store all of that data on chrome.storage.local. This is then read into the popup script when necessary.

# Instructions

The code for the LLM hosted on cloudflare is within the Folder named AI-Worker
The rest of the code can be cloned via git, and then when on chrome://extensions enter developer mode, and unpack the load into it
