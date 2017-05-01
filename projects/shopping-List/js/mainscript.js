$(document).ready(function(){
	
	
	var items = [];
	var cookie = getCookie('items'); 
	if (cookie) {
		items = sToArray(cookie);
		for (var i=0, l=items.length; i<l; i++) {
			addToList(items[i]);
		}
	}
	else {
			addToList('Bread');
			items.push('Bread');
			addToList('Milk');	
			items.push('Milk');	
			saveCookie('items', items);
			deleteCookie('items');	
	}
	
	// gets a specific cookie
	function getCookie(name) {
		var c = document.cookie;
		var pair =[];
		var found = '';
		c = c.split(';');
		for (var i=0, l=c.length;!found && i<l; i++) {
			pair = c[i].split('=');
			if (pair[0] === name) {
				found = pair[1];
			}
		}
		return found;
	}
	
	// saved cookie value to array
	function sToArray(s) {
		return s.split(',');
	}
	
	// cookie saving function
	function saveCookie(name, value) {
		var d = new Date();
		// setting expire date to a year from now
    d.setTime(d.getTime() + (365*24*60*60*1000));
    var expires = 'expires='+d.toUTCString();
		document.cookie = name + '=' + value + '; '+ expires;
	}
	
	// delete cookie function
	function deleteCookie(name) {
		document.cookie = name+'= ;expires=Thu, 01 Jan 1970 00:00:00 UTC';
	}
	
	// add item (generic)
	function addToList(shopItem) {
		$('.list ul').append('<li>'+shopItem+'<span class="deleteBtn">X</span></li>');
	}
	
	// add  item on click function 
	$('#addToList').click(function () {
			var shopItem = '';
			shopItem = document.getElementById('shopItem').value;
			if (shopItem){
				addToList(shopItem);
				items.push(shopItem);
			}
			document.getElementById('shopItem').value = '';
			deleteCookie('items');	
			saveCookie('items', items);
		});
		
	// clear button -> clears all items
	$('#clear').click(function () {
		items=[];
		$('li').remove();
		saveCookie('items', []);
		deleteCookie('items');
	});
	
	// remove item 
	function removeItem(e) {
		var target = e.target.parentNode;
		if(target.nodeName === 'LI') {
				for (var i=0, l=items.length; i<l;i++) {
					if (target.textContent === items[i]+'X') {
						items.splice(i, 1);
					}
				}
				$(target).remove();
				deleteCookie('items');
				saveCookie('items', items);	
		}
	};
	
	// creating event listener
	document.getElementsByTagName('ul')[0].addEventListener('click', removeItem, false);
	
});