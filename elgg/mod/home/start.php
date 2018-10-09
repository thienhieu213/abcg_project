<?php

elgg_register_event_handler('init', 'system', 'hello_world_init');

function hello_world_init() {
    elgg_register_page_handler('home', 'hello_world_page_handler');
}

function hello_world_page_handler() {
    echo elgg_view_resource('template');
    echo elgg_view_resource('home');
   // echo elgg_view_resource('footer');
    echo elgg_view_resource('template_footer');
}