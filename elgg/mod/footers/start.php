<?php

elgg_register_event_handler('init', 'system', 'footer_init');

function footer_init() {
    elgg_register_page_handler('footer', 'footer_page_handler');
}

function footer_page_handler() {
    echo elgg_view_resource('footer');
}