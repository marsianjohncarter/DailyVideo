<?php

echo 'upload_max_filesize = ' . ini_get('upload_max_filesize') . "\n";
echo 'post_max_size = ' . ini_get('post_max_size') . "\n";
echo 'max_execution_time = ' . ini_get('max_execution_time') . "\n";
function replace_extension($filename, $new_extension) {
    $info = pathinfo($filename);
    return $info['filename'] . '.' . $new_extension;
}

if (isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $uploadDirectory = __DIR__.'/videos/';
    $uploadPath = $uploadDirectory . basename($file['name']);
    
    if (copy($file['tmp_name'], $uploadPath)) {
        $new_file_name = replace_extension($file['name'], 'mp4');
        echo $new_file_name;
        echo 'File uploaded successfully';
    } else {
        echo 'Error uploading file';
    }
}
?>