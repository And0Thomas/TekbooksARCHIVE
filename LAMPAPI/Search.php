<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;
	$userid = $inData["userid"];
	$search = "%" . $inData["search"] . "%";

	$host = "localhost"; // Replace with your database host
    $dbname = "COP4331"; // Replace with your database name
    $username = "TheBeast"; // Replace with your database username
    $password = "WeLoveCOP4331"; // Replace with your database password

    $mysqliCon = new mysqli($host, $username, $password, $dbname);
	if ($mysqliCon->connect_error) 
	{
		returnWithError( $mysqliCon->connect_error );
	} 
	else
	{
		$stmt = $mysqliCon->prepare("SELECT * FROM Contacts WHERE ((ContactName LIKE ?) OR (Email LIKE ?) OR (Phone LIKE ?)) AND ID = ?");
		$stmt->bind_param("ssss", $search, $search, $search, $userid);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '{"contactname" : "' . $row["ContactName"]. '", "email" : "' . $row["Email"]. '", "phone" : "' . $row["Phone"]. '", "CID" : "' . $row["CID"]. '"}';
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found!" );
		}
		else
		{
			returnWithInfo( $searchResults );
		}
		
		$stmt->close();
		$mysqliCon->close();
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>