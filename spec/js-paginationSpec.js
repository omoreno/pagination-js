describe("JS pagination tests", function() {
	var fakeDocument, pagination;

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

	beforeEach(function(){
		fakeDocument = createFakeDocument();
		pagination = new Pagination("pagination", fakeDocument);
	});

	afterEach(function(){
		fakeDocument.remove();
	});

	it("creates DOM element", function(){
		pagination.paginate({totalItems: 10, pageSize: 5});

		var domElement = document.getElementById("pagination");
		expect(domElement).not.toBeNull();
	});

	it("does not create DOM element if exists", function(){
		pagination.paginate({totalItems: 10, pageSize: 5});

		pagination.paginate({totalItems: 10, pageSize: 5});

		var domElements = document.all("pagination");
		expect(domElements).toBeDefined();
		expect(domElements.length).not.toBeDefined();
	});

	it("uses defaults dom id and placeholder if not defined", function(){
		pagination = new Pagination();

		pagination.paginate({totalItems: 10, pageSize: 5});

		var domElement = document.getElementById("pagination");
		expect(domElement).toBeDefined();
		domElement.remove();
	});

	it("does not render if pagination is just one page", function(){
		pagination.paginate({totalItems: 10, pageSize: 10});

		var domElement = document.getElementById("pagination");
		expect(domElement).toBeNull();
	});

	it("renders all pages", function(){
		pagination.paginate({totalItems: 10, pageSize: 5});

		expect(pagination.getFirstVisiblePage().text).toBe('1');
		expect(pagination.getLastVisiblePage().text).toBe('2');
	});

	it("renders selected pages", function(){
		pagination.paginate({totalItems: 10, pageSize: 1, visiblePages: 5});

		expect(pagination.getVisiblePagesCount()).toBe(5);
	});

	it("renders all pages when selected pages to show are more than total pages", function(){
		pagination.paginate({totalItems: 4, pageSize: 2, visiblePages: 3});

		expect(pagination.getVisiblePagesCount()).toBe(2);
	});

	it("show next page on last visible page clicked when there are more pages to show", function(){
		pagination.paginate({totalItems: 3, pageSize: 1, visiblePages: 2});
		
		pagination.getLastVisiblePage().click();
		
		expect(pagination.getFirstVisiblePage().text).toBe('2');
		expect(pagination.getLastVisiblePage().text).toBe('3');
	});

	it("show previous page on first visible page clicked when there are pages before to show", function(){
		pagination.paginate({totalItems: 3, pageSize: 1, visiblePages: 2});
		pagination.getLastVisiblePage().click();

		pagination.getFirstVisiblePage().click();
		
		expect(pagination.getFirstVisiblePage().text).toBe('1');
		expect(pagination.getLastVisiblePage().text).toBe('2');
	});

	it("show go to first page and go to last page buttons", function(){
		var pagination = new Pagination("pagination", fakeDocument);
		
		pagination.paginate({totalItems: 2, pageSize: 1,
							goToFirstPageCaption: "First Page",
							goToLastPageCaption: "Last Page"});
		
		var goToFirstPageButton = pagination.getGoToFirstPageButton();
		var goToLastPageButton = pagination.getGoToLastPageButton();
		expect(goToFirstPageButton.text).toBe("First Page");
		expect(goToLastPageButton.text).toBe("Last Page");
	});

	it("uses defaults go to first page and go to last captions if not provided", function(){
		var pagination = new Pagination("pagination", fakeDocument);
		
		pagination.paginate({totalItems: 2, pageSize: 1});
		
		var goToFirstPageButton = pagination.getGoToFirstPageButton();
		var goToLastPageButton = pagination.getGoToLastPageButton();
		expect(goToFirstPageButton.text).toBe("<<");
		expect(goToLastPageButton.text).toBe(">>");
	});
});
