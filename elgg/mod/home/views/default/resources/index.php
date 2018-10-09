<?php
    $content = '<button>' . 'test'.'</button>';
    $params = array(
        'title' => 'Hello world!',
        'content' => $content,
        'filter' => '',
    );
    
    $body = elgg_view_layout('content', $params);
    
    echo elgg_view_page('Hello', $body); //tiêu đề hiển thị trên tag trang web (cạnh favicon)

?>