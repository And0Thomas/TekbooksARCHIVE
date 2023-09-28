<?php

	$inData = getRequestInfo();
	
	$searchResults = "";
	$searchCount = 0;
	$userid = $inData["userid"];

	$host = "localhost"; // Replace with your database host
    $dbname = "COP4331"; // Replace with your database name
    $username = "TheBeast"; // Replace with your database username
    $password = "WeLoveCOP4331"; // Replace with your database password

    $mysqliCon = new mysqli($host, $username, $password, $dbname);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT * FROM contacts WHERE (contactname LIKE ? AND userid=?) OR (email LIKE ? AND userid=?) OR (phone LIKE ? AND userid=?)");
		$search = "%" . $inData["search"] . "%";
		$stmt->bind_param("ssssss", $search, $userid, $search, $userid, $search, $userid);
		$stmt->execute();
		
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= '"' . $row["Name"] . '"';
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults );
		}
		
		$stmt->close();
		$conn->close();
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