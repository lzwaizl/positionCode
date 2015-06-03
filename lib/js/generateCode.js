;(function (){

	var body = document.body;

	window.generateCode = {

		insertCodeBox: function () {
			var box = '<div class="lzwai-code-container"><pre class="code-html"><code class="xml" contenteditable="false"></code></pre><div class="lzwai-show-box">click</div></div>';
			$(body).append(box);
		},

		html2Escape: function(sHtml) {
		    return sHtml.replace(/[<>&"]/g, function(c) {
		        return {
		            '<': '&lt;',
		            '>': '&gt;',
		            '&': '&amp;',
		            '"': '&quot;'
		        }[c];
		    });
		},

		getHtml: function (data) {
			var parent = null,
				child = null,
				html = "";

			for (var v in data) {
				if (!data[v] || !data[v]["style"]) {
					continue;
				}
				parent = $("<div></div>");
			    child = $("<a></a>").css(data[v]["style"]).attr("href", data[v]["href"] || "");;
			    parent.append(child);
			    html += parent[0].innerHTML;
			}
		    
		    return html;
		},

		getCode: function (data_styles) {
			var html_code = this.getHtml(data_styles);

		    var code = this.html2Escape(html_beautify(html_code, {
		        'indent_inner_html': false,
		        'indent_size': 4,
		        'indent_char': ' ',
		        'wrap_line_length': 78,
		        'brace_style': 'expand',
		        'unformatted': ['a', 'sub', 'sup', 'b', 'i', 'u'],
		        'preserve_newlines': true,
		        'max_preserve_newlines': 5,
		        'indent_handlebars': false
		    }));
		    return code;
		}
	};

})();