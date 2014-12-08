function Pagination(domId, placeholder) {
	var placeholder = placeholder || document.body;
	var domId = domId || 'pagination';

	this.paginate = function(pagination) {
		var pageCount = getPageCount(pagination);
		if (pageCount > 1) {
			var container = createContainer(domId, placeholder);
			for (var pageNumber = 1, len = pageCount; pageNumber <= len; pageNumber++){
				var page = createPage(pageNumber);
				container.appendChild(page);
				if (pageNumber == 1)
					firstVisiblePage = page;
				if (pageNumber == pageCount)
					lastVisiblePage = page;
			}
		}
	};

	var getPageCount = function(pagination) {
		return Math.ceil(pagination.totalItems / pagination.pageSize);
	};

	var createContainer = function(domId, placeholder) {
		var container = document.getElementById(domId);
		if (!container) {
			container = document.createElement('div');
			container.id = domId;
			placeholder.appendChild(container);
		}
		return container;
	};

	var createPage = function(pageNumber) {
		var page = document.createElement('a');
		page.text = pageNumber;
		page.href = "#";
		return page;
	};

	this.getFirstVisiblePage = function() {
		return firstVisiblePage;
	};

	this.getLastVisiblePage = function() {
		return lastVisiblePage;
	};
};