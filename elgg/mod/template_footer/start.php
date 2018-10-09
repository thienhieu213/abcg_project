<?php

elgg_register_event_handler('init', 'system', 'template_footer_init');

function template_footer_init() {
    elgg_register_page_handler('template_footer', 'template_footer_page_handler');
}

function template_footer_page_handler() {
    echo elgg_view_resource('template_footer');
}