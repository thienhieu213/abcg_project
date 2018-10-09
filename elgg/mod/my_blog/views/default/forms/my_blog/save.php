<?php
echo elgg_view_field([
    '#type' => 'text',
    '#label' => elgg_echo('title'),
    'name' => 'title',
    'required' => true,
]);

echo elgg_view_field([
    '#type' => 'longtext',
    '#label' => elgg_echo('body'),
    'name' => 'body',
    'required' => true,
]);

echo elgg_view_field([
    '#type' => 'tags',
    '#label' => elgg_echo('tags'),
    '#help' => elgg_echo('tags:help'),
    'name' => 'tags',
]);

$submit = elgg_view_field(array(
    '#type' => 'submit',
    '#class' => 'elgg-foot',
    'value' => elgg_echo('save'),
));
elgg_set_form_footer($submit);
