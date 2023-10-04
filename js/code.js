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
		window.alert("Incorrect Username/Password");
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
					window.alert("Incorrect Username or Password");
					return;
				}
				firstname = jsonObject.firstName;
				lastname = jsonObject.lastName;

				saveCookie();

				window.location.href = "portal.html";
				console.log(userid);
				console.log(firstname);
				console.log(lastname);
	
			}

		};
		xhr.send(jsonCargo);

	}
	catch(err)
	{
		window.alert("Error in Login");
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
		window.alert("All Fields Required");
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
					window.alert("Login Name taken");
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
				
								window.location.href = "index.html";
								window.alert("Account Created");
							}
						};
						xhr.send(jsonCargo);
					}
				
					catch(err) {
						window.alert("Error in SignUp");
					}
				}
			}
		};
		xhr.send(jsonCargo);
	}

	catch(err) {
		window.alert("Registration Failed");
		window.alert("Error SignUp");
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
		//document.getElementById("userName").innerHTML = "Welcome, " + firstname + " " + lastname + " " + userid + "!";
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
		window.alert("All Field Required");
		return;
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
				window.alert("Contact has been added");
				loadContacts();
			}
		};
		xhr.send(jsonCargo);
	}
	catch(err)
	{
		window.alert("Error in adding contact");
	}
	
}

function doSearch()
{
	let srch = document.getElementById("bar").value;
	

	let jsonCargo = '{"search" : "' + srch + '", "userid" : ' + userid + '}';

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
				let jsonObject = JSON.parse( xhr.responseText );
				if (jsonObject.error) 
				{
                    console.log(jsonObject.error);
					let text = ""
					document.getElementById("tbody").innerHTML = text;
					return;
                }
				console.log("Hello!");
				let text = "<table>"
				text+= "<tr id='addrow'>"
				text += "<td ><span>" + "" + "</span></td>";
				text += "<td ><span>" + "<button id = 'newAddBtn' onclick='addContact()'>Add Contact</button>" + "</span></td>";
				text += "<td id = 'aContactName'><span><input type='text' id='newname' placeholder='ContactName'></span></td>";
				text += "<td id = 'aEmail'><span><input type='text' id='newemail' placeholder='Email'></span></td>";
                text += "<td id = 'aPhone'><span><input type='text' id='newphone' placeholder='Phone'></span></td>";
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					var fooid = jsonObject.results[i].id;
					var foocid = jsonObject.results[i].CID;
					var foocontactname = jsonObject.results[i].contactname;
					var fooEmail = jsonObject.results[i].email;
					var fooPhone = jsonObject.results[i].phone;

					text += "<tr id='row" + i + "'>"
					text += "<td ><span>" + "" + "</span></td>";
					text += "<td id='cid" + i + "'><span>" + foocid + "</span></td>";
                    text += "<td id='contact_name" + i + "'><span>" + foocontactname + "</span></td>";
                    text += "<td id='email" + i + "'><span>" + fooEmail + "</span></td>";
                    text += "<td id='phone" + i + "'><span>" + fooPhone + "</span></td>";
					text += "<td id='edit_button" + i + "'>" +  "<button id = 'pencil' type = 'button' onclick='editRow("+ i +")'><img src = 'images/pen.png' alt = 'pen'></button>"+ "</td>";
					text += "<td id='trash_button" + i + "'>" + "<button id = 'trashCan' type = 'button' onclick='deleteContact("+ foocid +")'><img src = 'images/bxs-trash-alt.png' alt = 'trashcan'></button>" + "</td>";
					text += "<td id='save" + i + "' style='display: none'>" +  "<button id = 'pencil' type = 'button' onclick='updateContact("+ i +"," + foocid + ")'><img src = 'images/pen.png' alt = 'pen'></button>" + "</td>";

					// "<button type='button' onclick='delete_row(" + i + ")>" + '<img src= "./images/bxs-trash-alt.png" alt= "WhiteCan"/>' +"</button>";
					text += "<tr/>"
				}
				
				text += "</table>"
                document.getElementById("tbody").innerHTML = text;
			}
		};
		xhr.send(jsonCargo);
	}
	catch(err)
	{
		window.alert("Error in Search");
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
		window.alert("All Field Required");
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
					document.getElementById("editResult").innerHTML = "Contact Has Been Edited";
				}
			};
			xhr.send(jsonCargo);
		}
		catch(err)
		{
			window.alert("Error in Edit");
		}

	}
}

//function deleteContact(index, deleteid)
function deleteContact(deleteid)
{
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
				window.alert("Contact Has Been Deleted");
				loadContacts();
			}
		};
		xhr.send(jsonCargo);
	}
	catch(err)
	{
		window.alert("Delete ");
	}
	
}



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 												Portal scripts											  //
////////////////////////////////////////////////////////////////////////////////////////////////////////////


function loadContacts()
{
	
	let tmp =
	{
		search: "",
		userid: userid
	};

	let jsonCargo = JSON.stringify(tmp);

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
				let jsonObject = JSON.parse( xhr.responseText );
				if (jsonObject.error) 
				{
                    console.log(jsonObject.error);
                    return;
                }
				var foocid = jsonObject.results.CID;
				let text = "<table>"
				text+= "<tr id='addrow'>"
				text += "<td ><span>" + "" + "</span></td>";
				text += "<td ><span>" + "<button id = 'newAddBtn' onclick='addContact()'>Add Contact</button>" + "</span></td>";
				text += "<td id = 'aContactName'><span><input type='text' id='newname' placeholder='ContactName'></span></td>";
				text += "<td id = 'aEmail'><span><input type='text' id='newemail' placeholder='Email'></span></td>";
                text += "<td id = 'aPhone'><span><input type='text' id='newphone' placeholder='Phone'></span></td>";
				for( let i=0; i<jsonObject.results.length; i++ )
				{
					var fooid = jsonObject.results[i].id;
					var foocid = jsonObject.results[i].CID;
					var foocontactname = jsonObject.results[i].contactname;
					var fooEmail = jsonObject.results[i].email;
					var fooPhone = jsonObject.results[i].phone;

					text += "<tr id='row" + i + "'>"
					text += "<td ><span>" + "" + "</span></td>";
					text += "<td id='cid" + i + "'><span>" + foocid + "</span></td>";
                    text += "<td id='contact_name" + i + "'><span>" + foocontactname + "</span></td>";
                    text += "<td id='email" + i + "'><span>" + fooEmail + "</span></td>";
                    text += "<td id='phone" + i + "'><span>" + fooPhone + "</span></td>";
					text += "<td id='edit_button" + i + "'>" +  "<button id = 'pencil' type = 'button' onclick='editRow("+ i +")'><img src = 'images/pen.png' alt = 'pen'></button>"+ "</td>";
					text += "<td id='trash_button" + i + "'>" + "<button id = 'trashCan' type = 'button' onclick='deleteContact("+ foocid +")'><img src = 'images/bxs-trash-alt.png' alt = 'trashcan'></button>" + "</td>";
					text += "<td id='save" + i + "' style='display: none'>" +  "<button id = 'pencil' type = 'button' onclick='updateContact("+ i +"," + foocid + ")'><img src = 'images/save3.jpeg' alt = 'pen' id = 'save'></button>" + "</td>";

					// "<button type='button' onclick='delete_row(" + i + ")>" + '<img src= "./images/bxs-trash-alt.png" alt= "WhiteCan"/>' +"</button>";
					text += "<tr/>"
				}
				
				text += "</table>"
                document.getElementById("tbody").innerHTML = text;
			}
		};
		xhr.send(jsonCargo);
	}
	catch(err)
	{
		window.alert("Error in Search");
	}
	
}

function editRow(i)
{
    document.getElementById("save" + i).style.display = "inline-block";

	var contactInput = document.getElementById("contact_name" + i);
	var emailInput = document.getElementById("email" + i);
	var phoneInput = document.getElementById("phone" + i);

	var contactData = contactInput.innerText;
	var emailData = emailInput.innerText;
	var phoneData = phoneInput.innerText;
	contactInput.innerHTML = "<input type='text' id='contactText" + i + "' value='" + contactData + "'>";
	emailInput.innerHTML = "<input type='text' id='emailText" + i + "' value='" + emailData + "'>";
	phoneInput.innerHTML = "<input type='text' id='phoneText" + i + "' value='" + phoneData + "'>";
}


function updateContact(i,cid)
{
	let newcontactname = document.getElementById("contactText" + i).value;
	let newemail = document.getElementById("emailText" + i).value;
	let newphone = document.getElementById("phoneText" + i).value;
	document.getElementById("save" + i).style.display = "none";

	document.getElementById("contact_name" + i).innerHTML = newcontactname;
	document.getElementById("email" + i).innerHTML = newemail;
	document.getElementById("phone" + i).innerHTML = newphone;

	

	if (newcontactname == "" || newemail == "" || newphone == "")
	{
		window.alert("All Field Required");
		loadContacts();
		return;
	}
	else
	{
		let jsonCargo = '{"ContactName" : "' + newcontactname + '", "Email" : "' + newemail + '", "Phone" : "' + newphone + '", "ID" : "' + userid + '", "cid" : "' + cid + '"}';

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
					window.alert("Contact has been updated");
				}
			};
			xhr.send(jsonCargo);
		}
		catch(err)
		{
			window.alert("Error in Updating");
		}

	}
}

document.addEventListener("DOMContentLoaded", function() {
    // Your JavaScript code here

    const searchInput = document.getElementById("bar");
    const searchIcon = document.getElementById("search-icon");

    searchInput.addEventListener("focus", function() {
        searchInput.placeholder = "";
    
    });

    searchInput.addEventListener("blur", function() {
        if (searchInput.value === "") {
            searchInput.placeholder = "Search...";
   
        }
    });
});

// PORTALSCRIPT