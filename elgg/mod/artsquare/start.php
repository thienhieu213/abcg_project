<?php

elgg_register_event_handler('init', 'system', 'artsquare_init');

function artsquare_init() {
    elgg_register_page_handler('artsquare', 'artsquare_page_handler');
}

function artsquare_page_handler() {
    echo elgg_view_resource('template');
    echo elgg_view_resource('artsquare');
    echo elgg_view_resource('footer');
    echo elgg_view_resource('template_footer');
}