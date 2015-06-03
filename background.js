
var initialized = false;
/**
 * 注册标签页更新时的事件
 * 这里调用了initialize()事件，把func.js注入当前标签页中 
 */
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	initialize(tabId); 
});

/**
 * 注册切换标签页时的事件
 * 这里调用了initialize()事件，把func.js注入当前标签页中
 */
chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
	initialize(tabId);
});

/**
 * 初始化方法 ，注入func.js事件
 * @param {Object} tabId
 */
function initialize(tabId){
	chrome.tabs.insertCSS(null, {file: "lib/css/jquery.Jcrop.min.css", allFrames: true});
	chrome.tabs.insertCSS(null, {file: "lib/js/highlight/styles/monokai_sublime.css", allFrames: true});
	chrome.tabs.insertCSS(null, {file: "lib/css/codeBox.css", allFrames: true});

	chrome.tabs.executeScript(tabId, {file: "lib/js/jquery.min.js", allFrames: true, runAt: "document_start"});


	chrome.tabs.executeScript(tabId, {file: "lib/js/jquery.Jcrop.min.js", allFrames: true});
	chrome.tabs.executeScript(tabId, {file: "lib/js/highlight/highlight.pack.js", allFrames: true});
	chrome.tabs.executeScript(tabId, {file: "lib/js/html-beauty.js", allFrames: true});
	chrome.tabs.executeScript(tabId, {file: "lib/js/jquery-ui.min.js", allFrames: true});
	chrome.tabs.executeScript(tabId, {file: "lib/js/generateCode.js", allFrames: true});

	chrome.tabs.executeScript(tabId, {file: "index.js", allFrames: true, runAt: "document_end"});

}

/**
 * 启动一个chrome.extension.onRequest事件监听器用来处理消息
 */
// chrome.extension.onRequest.addListener(
//   function(request, sender, sendResponse) {
//     chrome.tabs.executeScript(null, {code: "console.log(1233);", allFrames: true});
// });
