describe("JS pagination tests", function() {
	var createFakeDocument = function() {
		var domId = 'fakeDocument';
		var fakeDocument = document.getElementById(domId)
		if (!fakeDocument) {
			fakeDocument = document.createElement('div');
			fakeDocument.id = domId;
		}
		fakeDocument.innerHTML = '';
		document.body.appendChild(fakeDocument);
		return fakeDocument;
	};

	it("creates DOM element", function(){
		var fakeDocument = createFakeDocument();
		var pagination = new Pagination("pagination", fakeDocument);

		pagination.paginate({totalItems: 10, pageSize: 5});

		var domElement = document.getElementById("pagination");
		expect(domElement).not.toBeNull();
	});

	it("does not create DOM element if exists", function(){
		var fakeDocument = createFakeDocument();
		var pagination = new Pagination("pagination", fakeDocument);
		pagination.paginate({totalItems: 10, pageSize: 5});

		pagination.paginate({totalItems: 10, pageSize: 5});

		var domElements = document.all("pagination");
		expect(domElements).toBeDefined();
		expect(domElements.length).not.toBeDefined();
	});

	it("uses defaults dom id and placeholder if not defined", function(){
		var pagination = new Pagination();

		pagination.paginate({totalItems: 10, pageSize: 5});

		var domElement = document.getElementById("pagination");
		expect(domElement).toBeDefined();
		domElement.remove();
	});
});
