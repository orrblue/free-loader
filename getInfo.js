
function getUserInfo() 
{
	FB.api('/me', function(response) 
	{
		var str="<b>Name</b> : "+response.name+"<br>";
	  	str +="<input type='button' value='Get Notification' onclick='getNotif();'/>";
	  	str +="<input type='button' value='Get User Events' onclick='getUserGroups();'/>";
	  	str +="<input type='button' value='Events around UCLA' onclick='getFeed();'/>";
	  	str +="<input type='button' value='Logout' onclick='Logout();'/>";
	  	document.getElementById("status").innerHTML=str;
	 	getPhoto();	 
    	});
}
//prints out messages given a groupID

function getFeed()
{
	//for(var a=0; a<openGroups.length;a++)
	//{
//	id=openGroups[a];
//	FB.api('/'+id+'/?fields=feed', function(response) 
FB.api('/269730429771312/?fields=feed', function(response)
	{
		var wordOpt=" ";////////TODO: FEED THE SUBMIT RESULT HERE
		var str="";
		for(var i=0; i<10; i++)
		{
		//	var indicator = false;
			var indicatorMust = {value : false};
			var indicatorOpt = {value : false};
			for(var j=0; j<3;j++)
			{
				parse(indicatorMust,response.feed.data[i].message,wordMusthave[j]);
			}
				console.log("must"); 
				console.log(indicatorMust);
			
			parse(indicatorOpt,response.feed.data[i].message,wordOpt);
				console.log("Opt"); 
			console.log(indicatorOpt);
			
			var tester = false;
			if(indicatorMust.value==true &&indicatorOpt.value==true ){
				tester = true;
			}
			console.log("tester");
			console.log(tester);
			
			if (tester == true)
				{
					console.log("I'm true!")
					str+="hahahhhaa";
					str+="<b>Group Name</b> : "+response.feed.data[i].to.data[0].name+"<br>";
	  				str+="<b>Message: </b>"+response.feed.data[i].message+"<br>";
				}
		}
		document.getElementById("status").innerHTML+=str;
	
	});
//	}
	
}
///////////////////////////////////////////////////
function getPhoto()
{
	FB.api('/me/picture?type=normal', function(response) 
	{
		  var str="<br/><b>Pic</b> : <img src='"+response.data.url+"'/>";
	  	  document.getElementById("status").innerHTML+=str;
    	});
}
//////////////////////////////////////////////////
//get the groupID of all the groups the user is in and print out the events created inside
function getUserGroups(){
	FB.api('me/groups', function(response){
		for (var i=0; i<10; i++)
		{
			getMemberEvents(response.data[i].id);
		}
	});
}
///////////////////////////////////////////////////////////
//get the eventID of a given groupID
function getMemberEvents(id) {
	FB.api('/'+id+'/events ', function(response){
		for(var i = 0; i<10; i++) 
		{
			traceEvent(response.data[i].id);
		}	
	});

}
//////////////////////////////////////////////////
//get the notification of events
function getNotif()
{
	FB.api('me/?fields=notifications{application}', function(response) 
	{
		for(var i = 0; i<10;i++) 
		{
			if(response.notifications.data[i].application.name=="Events")
			{
				console.log(response.notifications.data[i]);
				traceNotif(response.notifications.data[i].id);
			}
		}
    	});
}
//return the eventID from a notification of an invitation
function traceNotif(id)
{
	FB.api('/'+id+'', function(response)
	{
		console.log(response);
		traceEvent(response.object.id);
	});
}
//print out event info from a given eventID
function traceEvent(id)
{
	FB.api('/'+id+'', function(response)
	{
		var str="<b>Name</b> : "+response.name+"<br>";
	  	str +="<b>Description: </b>"+response.description+"<br>";
		document.getElementById("status").innerHTML+=str;
	});
}
/////I don't know what it is. Load the SDK asynchronously
 (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
 }(document));

