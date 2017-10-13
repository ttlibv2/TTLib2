<?php
    require('lib/simple_html_dom.php');

    class API
    {
        var $dir = "data";

        function __construct($dir)
        {
            $this->dir = $dir;
        }

        public function extractElement($url)
        {
           try
           {
                $html = file_get_html($url);
                return $html->find('div.item-detail')[0];
           }
           catch(\Exception $ex)
           {
                echo 'Caught exception for extractElement() => ',  $err->getMessage(), "<br>";
                extractElement($url);
           }
        }
    
        public function getAllUrl()
        {
            $path = $this->dir.'.json';
            $data = "{}";

            if(file_exists($path))
            {
                $file = fopen($path, 'r') or die("Unable to open file!");
                $data = fread($file, filesize($path));
                fclose($file);
            }

            return json_decode($data);;
        }
    
        public function writeHtmlToFile($name, $content)
        {
            // create
            $path = $this->dir.'/'.$name.'.html';
            $file = fopen($path, 'w');
    
            // write
            fwrite($file, $content);
    
            // close
            fclose($file);

            return true;
        }
}

?>