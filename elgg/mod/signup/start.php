<?php

elgg_register_event_handler('init', 'system', 'signup_init');

function signup_init() {
    elgg_register_page_handler('signup', 'signup_page_handler');
}

function signup_page_handler() {
   // echo elgg_view_resource('template');
    echo elgg_view_resource('signup');
    echo elgg_view_resource('footer');
    echo elgg_view_resource('template_footer');
}
