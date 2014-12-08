function Pagination(domId, placeholder) {
	var placeholder = placeholder || document.body;
	var domId = domId || 'pagination';

	this.paginate = function(pagination) {
		var container = document.getElementById(domId);
		if (!container) {
			container = document.createElement('div');
			container.id = domId;
			placeholder.appendChild(container);
		}
	};
};