export const transformDate = (dateInput) =>{
	const date = new Date(dateInput);
	
	function pad(n) {
		return n<10 ? '0'+n : n
	}
	return  date.getFullYear() +
				 "-" +
				 pad(date.getMonth()+1) +
				 "-" +
				 pad(date.getDate()) 
}


export const getDisplayItems = (selectedPage, itemPerPage, items) => {
	const itemsLength = items.length;
	let endIndex;
	let startIndex;
  
	if ((selectedPage * itemPerPage - 1) > itemsLength) {
	  endIndex = itemsLength - 1;
	  startIndex = selectedPage * itemPerPage - itemPerPage;
	} else {
	  endIndex = selectedPage * itemPerPage - 1;
	  startIndex = (selectedPage - 1) * itemPerPage;
	}
  
	return items.slice(startIndex, endIndex + 1);
}