function Pagination(domId, placeholder){
	this.paginate = function(pagination){
		var container = document.createElement('div');
		container.id = domId;
		placeholder.appendChild(container);
		return container;
	};
};