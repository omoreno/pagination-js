function Pagination(domId, placeholder) {
	var placeholder = placeholder || document.body;
	var domId = domId || 'pagination';

	this.paginate = function(pagination) {
		var pageCount = Math.ceil(pagination.totalItems / pagination.pageSize);
		if (pageCount > 1) {
			var container = document.getElementById(domId);
			if (!container) {
				container = document.createElement('div');
				container.id = domId;
				placeholder.appendChild(container);
				for (var i = 1, len = pageCount; i <= len; i++){
					var page = document.createElement('a');
					page.text = i;
					page.href = "#";
					container.appendChild(page);
					if (i == 1)
						firstVisiblePage = page;
					if (i == pageCount)
						lastVisiblePage = page;
				}
			}
		}
	};

	this.getFirstVisiblePage = function(){
		return firstVisiblePage;
	};

	this.getLastVisiblePage = function(){
		return lastVisiblePage;
	};
};