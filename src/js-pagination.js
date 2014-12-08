function Pagination(domId, placeholder) {
	var placeholder = placeholder || document.body;
	var domId = domId || 'pagination';
	var pages = [];

	this.paginate = function(pagination) {
		var pageCount = getPageCount(pagination);
		var visiblePages = getVisiblePages(pagination.visiblePages, pageCount);
		if (pageCount > 1) {
			var container = createContainer(domId, placeholder);
			for (var pageNumber = 1, len = visiblePages; pageNumber <= len; pageNumber++){
				var page = createPage(pageNumber);
				pages.push(page);
				container.appendChild(page);
			}
		}
	};

	var getVisiblePages = function(visiblePages, pageCount) {
		if (!visiblePages || visiblePages > pageCount)
			return pageCount;
		return visiblePages;
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
		page.addEventListener("click", function(e) {
			updatePagination();
			e.preventDefault();
		});
		return page;
	};

	var updatePagination = function() {
        for (var i = 0, len = pages.length; i < len; i++)
            pages[i].text = Number(pages[i].text) + 1;
	};

	this.getFirstVisiblePage = function() {
		return pages[0];
	};

	this.getLastVisiblePage = function() {
		return pages[pages.length - 1];
	};

	this.getVisiblePagesCount = function() {
		return pages.length;
	};
};