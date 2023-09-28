const urlBase = 'http://tekbooks.xyz';
const extension = 'php';

var userid = 0;
var contactname = "";
var username = "";
var password = "";
var edit = 0;
var firstname ="";
var lastname ="";


function doLogin()
{
	username = document.getElementById("username").value;
	password = document.getElementById("password").value;

	if (username == "" || password == "")
	{
		document.getElementById("loginResult").innerHTML = "All fields required.";
		return;
	}
	
	var hash = md5(password);
	console.log(password);
	console.log(hash);

	var jsonCargo = '{"username" : "' + username + '", "password" : "' + password + '"}';
	let url = urlBase + '/LAMPAPI/Login.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				console.log(userid);
				let jsonObject = JSON.parse( xhr.responseText );
				userid = jsonObject.id;
				if( userid < 1 )
				{		
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}
				firstname = jsonObject.firstName;
				lastname = jsonObject.lastName;

				saveCookie();

				window.location.href = "test.php";
				console.log(userid);
				console.log(firstname);
				console.log(lastname);
	
			}

		};
		xhr.send(jsonCargo);

	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doSignUp()
{
	firstname = document.getElementById("firstName").value;
	lastname = document.getElementById("lastName").value;
	username = document.getElementById("usernameS").value;
	password = document.getElementById("passwordS").value;

	if (username == "" || password == "" || lastname == "" || firstname == "")
	{
		document.getElementById("signupResult").innerHTML = "All fields required.";
		return;
	}
	
	console.log(firstname);
	console.log(lastname);
	console.log(username);
	console.log(password);

	var jsonCargo = '{"username" : "' + username + '", "password" : "' + password + '", "firstname" : "' + firstname + '", "lastname" : "' + lastname + '"}';
	let url = urlBase + '/LAMPAPI/SignUp.' + extension;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
	try {
		xhr.onreadystatechange = function( ) 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				var jsonObject = JSON.parse(xhr.responseText);
				userId = jsonObject.id;
				firstname = jsonObject.firstName;
				lastname = jsonObject.lastName;
				var success = jsonObject.error;
				console.log(success);
				
				if (!success.localeCompare("Failed")) 
				{
					document.getElementById("signupResult").innerHTML = "Login Name taken.";
					return;
				}

				else
				{
					// doLogin function
					saveCookie();
					jsonCargo = '{"username" : "' + username + '", "password" : "' + password + '"}';
					url = urlBase + '/LAMPAPI/Login.' + extension;
					
					xhr.open("POST", url, true);
				
					try {
						xhr.onreadystatechange = function( ) {
							if (this.readyState == 4 && this.status == 200) {
								var jsonObject = JSON.parse(xhr.responseText);
								userId = jsonObject.id;
								firstname = jsonObject.firstName;
								lastName = jsonObject.lastName;
								saveCookie();
				
								window.location.href = "test.php";
							}
						};
						xhr.send(jsonCargo);
					}
				
					catch(err) {
						document.getElementById("signupResult").innerHTML = err.message;
					}
				}
			}
		};
		xhr.send(jsonCargo);
		window.alert("Registration Success");
	}

	catch(err) {
		window.alert("Registration Failed");
		document.getElementById("signupResult").innerHTML = err.message;
	}

}


function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstname=" + firstname + ",lastname=" + lastname + ",userid=" + userid + ";expires=" + date.toGMTString();
}

function readCookie()
{
	userid = -1;
	let data = document.cookie;
	let splits = data.split(",");
	for (var i = 0; i < splits.length; i++) 
	{

        let thisOne = splits[i].trim();
        let tokens = thisOne.split("=");

        if (tokens[0] == "firstname") 
		{
            firstname = tokens[1];
        }

        else if (tokens[0] == "lastname") 
		{
            lastname = tokens[1];
        }

        else if (tokens[0] == "userid") 
		{
            userid = parseInt(tokens[1].trim());
        }
    }
	
	if( userid < 0 )
	{
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Welcome, " + firstname + " " + lastname + " " + userid + "!";
	}
}

function doLogout()
{
	userid = 0;
    firstname = "";
    lastname = "";

    document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = "index.html";
}

function addContact()
{
	let newcontactname = document.getElementById("newname").value;
	let newemail = document.getElementById("newemail").value;
	let newphone = document.getElementById("newphone").value;
	
	if (newname == "" || newemail == "" || newphone == "")
	{
		document.getElementById("addResult").innerHTML = "All fields are required.";
		return;
	}
	else
	{
		document.getElementById("addResult").innerHTML = "";
	}

	
	let jsonCargo = '{"ContactName" : "' + newcontactname + '", "Email" : "' + newemail + '", "Phone" : "' + newphone + '", "ID" : "' + userid + '"}';

	let url = urlBase + '/LAMPAPI/Add.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("addResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonCargo);
	}
	catch(err)
	{
		document.getElementById("addResult").innerHTML = err.message;
	}
	
}

function doSearch()
{
	let srch = document.getElementById("searchText").value;
	document.getElementById("searchResult").innerHTML = "";
	
	let contactList = "";

	let jsonCargo = '{"search" : "' + srch + '", "userid " : ' + userid + '}';

	let url = urlBase + '/LAMPAPI/Search.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("searchResult").innerHTML = "Contact(s) has been retrieved";
				let jsonObject = JSON.parse( xhr.responseText );
				
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					var fooid = jsonObject.results[i].id;
					var foocid = jsonObject.results[i].cid;
					var foocontactname = jsonObject.results[i].contactname;
					var fooEmail = jsonObject.results[i].email;
					var fooPhone = jsonObject.results[i].phone;

					contactList += "Name: " + foocontactname + "<br>" + "Email: " + fooEmail + "<br>" + "Phone: " + fooPhone + "<br>";

					//  This is where you put the edit button and or delete button

					if( i < jsonObject.results.length - 1 )
					{
						contactList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonCargo);
	}
	catch(err)
	{
		document.getElementById("searchResult").innerHTML = err.message;
	}
	
}

//function updateContact(index, foocid)
function updateContact()
{
	let foocid = document.getElementById("CID").value;
	let newcontactname = document.getElementById("editName").value;
	let newemail = document.getElementById("editEmail").value;
	let newphone = document.getElementById("editPhone").value;

	if (newcontactname == "" || newemail == "" || newphone == "")
	{
		document.getElementById("editResult").innerHTML = "All fields are required.";
		return;
	}
	else
	{
		document.getElementById("editResult").innerHTML = "";

		let jsonCargo = '{"ContactName" : "' + newcontactname + '", "Email" : "' + newemail + '", "Phone" : "' + newphone + '", "ID" : "' + userid + '", "cid" : "' + foocid + '"}';

		let url = urlBase + '/LAMPAPI/Update.' + extension;
	
		let xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
		try
		{
			xhr.onreadystatechange = function() 
			{
				if (this.readyState == 4 && this.status == 200) 
				{
					document.getElementById("editResult").innerHTML = "Contact has been edited";
				}
			};
			xhr.send(jsonCargo);
		}
		catch(err)
		{
			document.getElementById("editResult").innerHTML = err.message;
		}

	}
}

//function deleteContact(index, deleteid)
function deleteContact()
{

	let deleteid = document.getElementById("DelCID").value;

	let jsonCargo = '{"userid" : "' + userid + '", "cid" : "' + deleteid +'"}';

	let url = urlBase + '/LAMPAPI/Delete.' + extension;
	
	let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("deleteResult").innerHTML = "Contact has been deleted";
			}
		};
		xhr.send(jsonCargo);
	}
	catch(err)
	{
		document.getElementById("deleteResult").innerHTML = "Contact delete Error";
	}
	
}