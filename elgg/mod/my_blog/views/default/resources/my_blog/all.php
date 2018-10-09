<?php
$titlebar = "All Site My_Blogs";
$pagetitle = "List of all my_blogs";

$body = elgg_list_entities(array(
    'type' => 'object',
    'subtype' => 'my_blog',
    //'owner_guid' => elgg_get_logged_in_user_guid()
));

$body = elgg_view_title($pagetitle) . elgg_view_layout('one_column', array('content' => $body));

echo elgg_view_page($titlebar, $body);