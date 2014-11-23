function search() {
	var distro = document.getElementById("distroIn").value;
	$.get("#/"+distro+".txt",function(returnedData) 
		{$("distroIn").text(returnedData);}, "text/plain");

	var text = $("distroIn").text();
	var lines = text.split("\n");
	var sepLine = lines.split(" ");
	var courseName = new Array();
	var courseID = new Array();
	var arrIndex = 0;
	for(var i=0; i < sepLine.length; i++) {
		if((i%2)===0)
			{courseName[arrIndex]=sepLine[i];}
		else
			{courseID[arrIndex]=sepLine[i];
			arrIndex++;}
		}
	var output = new Array(courseName, courseID); 
	return output;

}