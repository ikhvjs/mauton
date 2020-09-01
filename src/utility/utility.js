export const transformDate = (dateInput) =>{
	var date = new Date(dateInput);
	
	function pad(n) {
		return n<10 ? '0'+n : n
	}
	return  date.getFullYear() +
				 "-" +
				 pad(date.getMonth()+1) +
				 "-" +
				 pad(date.getDate()) 
}