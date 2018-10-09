// <script>
require = {
    "baseUrl": "http://localhost/thienhieu/elgg/cache/1538985180/default/",
    "paths": {
        "jquery.treeview": [
            "http://localhost/thienhieu/elgg/cache/1538985180/default/jquery-treeview/jquery.treeview"
        ],
        "admin/users/unvalidated": [
            "http://localhost/thienhieu/elgg/cache/1538985180/default/admin/users/unvalidated"
        ]
    },
    "shim": {
        "jquery.ui.autocomplete.html": {
            "deps": [
                "jquery-ui"
            ]
        },
        "jquery.treeview": {
            "deps": [
                "jquery"
            ],
            "exports": "jQuery.fn.treeview"
        },
        "ckeditor/ckeditor": {
            "exports": "CKEDITOR"
        },
        "jquery.ckeditor": {
            "deps": [
                "jquery",
                "ckeditor/ckeditor"
            ],
            "exports": "jQuery.fn.ckeditor"
        }
    },
    "waitSeconds": 20
};

