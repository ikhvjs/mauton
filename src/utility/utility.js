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


// const sortArrayInNumber = (array) =>{
// 	array.sort(function(a,b){
// 		return a-b;
// 	});
// }

// export const isTagArrayEqual = (array1, array2) => {

// 	const transformArray1 = [];
// 	const transformArray2 = [];
//   	// if length is not equal 
// 	if(array1.length !== array2.length) 
//   		return false; 
//   	else{ 
// 	  // comapring each element of array 
// 		for(let i=0;i<array1.length;i++){
// 			transformArray1.push(Number(array1[i].tag_id));
// 		};

// 		for(let i=0;i<array2.length;i++){
// 			transformArray2.push(Number(array2[i].tag_id));
// 		};

// 		sortArrayInNumber(transformArray1);
// 		sortArrayInNumber(transformArray2);


// 		for(let i=0;i<transformArray1.length;i++){
// 			if(transformArray1[i]!==transformArray2[i]) {
// 				return "False";
// 			}
// 		};

// 		return true;
		
//   	}


// }