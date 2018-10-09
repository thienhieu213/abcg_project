<?php

elgg_register_event_handler('init', 'system', 'template_init');

function template_init() {
    elgg_register_page_handler('template', 'template_page_handler');
}

function template_page_handler() {
    echo elgg_view_resource('template');
}