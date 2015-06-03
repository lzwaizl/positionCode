$('.className').on('keyup', function(event) {

	var theEvent = event || window.event;    
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
    if (code == "13") {

	    var val = $(this).val();
	    if (!val) {
	        return;
	    }
	    //chrome.extension.sendRequest(val);
	    chrome.tabs.executeScript(null, {
	        code: "lzwai.init('" + val + "')",
	        allFrames: true
	    });

    }
});