function Pagination(domId, placeholder){
	this.paginate = function(pagination){
		var container = document.getElementById(domId);
		if (!container) {
			container = document.createElement('div');
			container.id = domId;
			placeholder.appendChild(container);
		}
	};
};