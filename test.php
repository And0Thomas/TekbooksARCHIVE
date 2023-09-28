<html>
  <head>
    <title>Fall 23 - COP 4331 LAMP Stack Demo</title>
    <script type="text/javascript" src="js/md5.js"></script>
    <script type="text/javascript" src="js/code.js"></script>
    <link href="styles.css" rel="stylesheet">	
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">

    <script type="text/javascript">
		document.addEventListener('DOMContentLoaded', function () 
    {
			readCookie();
		}
    , false);
	  </script>
  </head>

  <body>
    <h1>
    <span id="userName"></span><br>
    <h1>
      
      <div id="loginDiv">
        <span id="inner-title">Add Contact</span>
        <input type="text" id="newname" placeholder="New Contact Name" /><br />
        <input type="password" id="newemail" placeholder="New Email"/><br />
        <input type="password" id="newphone" placeholder="New Phone"/><br />
        <button type="button" id="loginButton" class="buttons" onclick="addContact();"> Do It Add</button><br />
        <span id="addResult"></span>
      </div>

      <div id="signupDiv">
        <span id="inner-title">Edit Contact</span>
        <input type="text" id="editName" placeholder="Edit Name" /><br />
        <input type="text" id="editEmail" placeholder="Edit Email"/><br />
        <input type="text" id="editPhone" placeholder="Edit Phone" /><br />
        <input type="text" id="CID" placeholder="CID"/><br />
        <button type="button" id="loginButton" class="buttons" onclick="updateContact();"> Do It Edit</button><br />
        <span id="editResult"></span>
      </div>

      <div id="deleteDiv">
        <span id="inner-title">Delete Contact</span>
        <input type="text" id="DelCID" placeholder="CID Name" /><br />
        <button type="button" id="loginButton" class="buttons" onclick="deleteContact();"> Do It Delete</button><br />
        <span id="deleteResult"></span>
      </div>

      <div id="logout">
      <br/><button type="button" id="loginButton" class="buttons" onclick="doLogout();"> Do It Logout</button><br />
      </div>
  </body>

</html>