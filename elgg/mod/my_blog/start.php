<?php

// register an initializer
elgg_register_event_handler('init', 'system', 'my_blog_init');

function my_blog_init() {
    elgg_register_menu_item('site', [
		'name' => 'my_blog',
		'icon' => 'clock-o',
		'text' => elgg_echo('My Blog'),
		'href' => 'my_blog',
	]);
    // register the save action
    elgg_register_action("my_blog/save", __DIR__ . "/actions/my_blog/save.php");

    // register the page handler
    elgg_register_page_handler('my_blog', 'my_blog_page_handler');

    // register a hook handler to override urls
    elgg_register_plugin_hook_handler('entity:url', 'object', 'my_blog_set_url');
}
function my_blog_set_url($hook, $type, $url, $params) {
    $entity = $params['entity'];
    if (elgg_instanceof($entity, 'object', 'my_blog')) {
        return "my_blog/view/{$entity->guid}";
    }
}
function my_blog_page_handler($segments) {
    switch ($segments[0]) {
        case 'add':
           echo elgg_view_resource('my_blog/add');
           break;

        case 'view':
            $resource_vars['guid'] = elgg_extract(1, $segments);
            echo elgg_view_resource('my_blog/view', $resource_vars);
            break;

        case 'all':
        default:
           echo elgg_view_resource('my_blog/all');
           break;
    }

    return true;
}