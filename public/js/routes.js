var distroModule = angular.module('distrofinder', ['ngRoute']);

distroModule.config(function($routeProvider){
	$routeProvider.
	when('/', 
		{templateUrl:'partials/home.html', controller: homeControl}).
	when('/search', 
		{templateUrl:'partials/search.html', controller: searchControl}).
	otherwise({redirectTo: '/'});


});

distroModule.directive('searchControl', function() {
	return {
		link: function() {

			$('#myTable').dataTable();

			$("#submitButton").click(function() {

				console.log("clicked");

				var distro = document.getElementById("distroIn").value;
				var fileN = distro+".txt";
				var text = "";
				var pieces = [];
				$.ajax({
					url: '/Distros/'+fileN,
					type: 'get',
					success: function(html) {
						text = String(html); 
						parse(text);
					}
				});


				function parse(text) {
					pieces = text.split(" ");
					var arr = [];
					var courseSubject = [];
					var courseID = [];
					var arrIndex = 0;

					for(var i=0; i < pieces.length; i++) 
					{
						if((i%2)===0)
						{
							courseSubject[arrIndex]=pieces[i];
						}
						else
						{
							courseID[arrIndex]=pieces[i];
							arrIndex++;
						}
					}

					console.log(arr);
					console.log(courseID);
					console.log(courseID.length);
					console.log(courseSubject);
					console.log(courseSubject.length);


					var allCourses = [];
					for (index = 0; index < courseID.length; index++) {
						var subject = courseSubject[index];
	                        var number = courseID[index];
	                        var numString = String(number);
	                        if (numString.indexOf("-")==-1)     //EDITED THIS PART
	                        	 number = numString + "-0"
	                        console.log(String(number));
	                        /**
	                         * HOW TO Make an HTTP Call - GET
	                         */

	                         var urlString = 'http://api.asg.northwestern.edu/courses/?key=uLrqWV0CI2AW7VKz&term=4570&subject='+subject+'&catalog_num='+number;

	                         var counter = 0;
	                         $.ajax({
	                         	url: urlString,
	                         	type: 'get',
	                         	success: function(rsp) {

	                         		if(rsp !== [])
	                         		{
	                         			for (i = 0; i < rsp.length; i++)
	                         			{
	                         				allCourses.push(rsp[i]);

	                         			}
	                         		}

	                         		if(counter == (courseID.length - 1))
	                         		{
	                         			extractData(allCourses);
	                         		}
	                         		counter++;
	                         	}
	                         });

                     }

                     
				}

				function extractData(allCourses) {
					var body = document.getElementsByTagName("body")[0];

 					 // creates a <table> element and a <tbody> element
 					 var tbl     = document.getElementById("myTable");
 					 var tblBody = document.getElementById("tblBody");
 					 var totalDataList = []
 					 console.log(allCourses);
 					 var ids, courseNum,starttime,endtime,titles,instructors,roomnum,subjects,seatsavailable,meetingdays;
 					 allCourses.forEach(function(dic)
 					 {
 					 	var cList = [];
 					 	
 					 	console.log(dic);
 					 	ids = dic.id;
 					 	courseNum = dic.catalog_num;
 					 	starttime = dic.start_time;
 					 	endtime = dic.end_time;
 					 	titles = dic.title;
 					 	instructors= dic.instructor;
 					 	roomnum = dic.room;
 					 	subjects = dic.subject;
 					 	seatsavailable = dic.seats;
 					 	meetingdays = dic.meeting_days;
 					 	console.log(endtime);

 					 	cList.push(courseNum);
 					 	cList.push(subjects);
 					 	cList.push(titles);
 					 	cList.push(instructors);
 					 	cList.push(roomnum);
 					 	cList.push(seatsavailable);
 					 	cList.push(meetingdays);
 					 	cList.push(starttime);
 					 	cList.push(endtime);

 					 	totalDataList.push(cList);

 					 	var row = document.createElement("tr");
		                        var cell1 = document.createElement("td");
		      					var cell2 = document.createElement("td");
		      					var cell3 = document.createElement("td");
		      					var cell4 = document.createElement("td");
		      					var cell5 = document.createElement("td");
		      					var cell6 = document.createElement("td");
		      					var cell7 = document.createElement("td");
		      					var cell8 = document.createElement("td");
		      					var cell9 = document.createElement("td");
		      					var cellText1 = document.createTextNode(courseNum);
		      					var cellText2 = document.createTextNode(subjects);
		      					var cellText3 = document.createTextNode(titles);
		      					var cellText4 = document.createTextNode(instructors);
		      					var cellText5 = document.createTextNode(roomnum);
		      					var cellText6 = document.createTextNode(seatsavailable);
		      					var cellText7 = document.createTextNode(meetingdays);
		      					var cellText8 = document.createTextNode(starttime);
		      					var cellText9 = document.createTextNode(endtime);
		      					cell1.appendChild(cellText1);
		      					cell2.appendChild(cellText2);
		      					cell3.appendChild(cellText3);
		      					cell4.appendChild(cellText4);
		      					cell5.appendChild(cellText5);
		      					cell6.appendChild(cellText6);
		      					cell7.appendChild(cellText7);
		      					cell8.appendChild(cellText8);
		      					cell9.appendChild(cellText9);
		      					row.appendChild(cell1);
		      					row.appendChild(cell2);
		      					row.appendChild(cell3);
		      					row.appendChild(cell4);
		      					row.appendChild(cell5);
		      					row.appendChild(cell6);
		      					row.appendChild(cell7);
		      					row.appendChild(cell8);
		      					row.appendChild(cell9);
		      					tblBody.appendChild(row);
		      					tbl.appendChild(tblBody);
		  // appends <table> into <body>
		  						body.appendChild(tbl);
		  // sets the border attribute of tbl to 2;
		 						 tbl.setAttribute("border", "5");
  						$('#example').DataTable( {
						    data: totalDataList
						} );
  					});
				}

			});

		}
	}
});

