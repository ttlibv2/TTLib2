<?php
    include('api.php');
	set_time_limit(36000);
	
    echo "Run....<br>";
	$api = new API('LVTH');
	$data = $api->getAllUrl();
	$action = $_GET['action'];

	// extract html
	if($action == 'html') action_html($api, $data);
	else if($action == 'epub') action_epub($api, $data);
	else { echo $action;}
   
	

	function action_html($api, $data)
	{
		$index = $_GET['index'];
		run($api, $data, count($data), $index);
	}
	
	function action_epub($api, $data)
	{
		echo $api->xmlContent_opf($data);
	}



    /**
    * if error then return index or -1
    */
    function run($api, $data, $countUrl, $begin)
    {
		$index = $begin;
		try
		{
			if($countUrl < 0) $countUrl = count($data);
			if($begin == $countUrl - 1) 
			{
				echo 'Finish !!';
				return;
			}

			for(;$index < $countUrl; $index++)
			{
				$item = $data[$index];
				$id = $item->id;
				$name = $item->name;
				$url = $item->link;

				$content = $api->extractElement($url);
				$write = $api->writeHtmlToFile($id, $content);
				echo '['.$write.':'.$id.' : '.$index.'] '.$name.' => '.$url.'<br>';
			}

			echo 'Finish !!';
		}
		catch(\Exception $err)
		{
			echo 'Caught exception: ',  $err->getMessage(), "<br>";
			run($api, $data, $countUrl, $index);
		}
    }

?>