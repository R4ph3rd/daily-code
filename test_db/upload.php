<?php
    include('./connect.php');

    $request = mysqli_query($connect, 'SELECT * from supercool');

    if (mysqli_num_rows($request) > 0){
        while ($cool = mysqli_fetch_array($request)){
            echo $cool['author']. ' a ecrit : '.$cool['message'].' le jour suivant : '.$cool['date'].'</br>';
        }
    }

    $file = $_FILES['fileCool']['tmp_name'];
    $type = $_FILES['fileCool']['type'];
    $data = file_get_contents($file);
    $base64 = 'data:image/'.$type.';base64,'.base64_encode($data);

    echo '</br> PICTURE :    '.$base64;

    echo '<img src="'.$base64.'" alt="">';

    $push = mysqli_query($connect, "INSERT INTO supercool SET author='superCoolos', message='dmh iuh ezpif hf', image='".$base64."'");
    if ($push){
        echo 'query done';
    } else {
        echo 'error';
    }
?>