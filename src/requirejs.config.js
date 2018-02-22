var requireConfig = {
    "map": {},
    "paths": {
        "vue": [
            "components/vue/dist/vue"
        ],
        "axios": [
            "components/axios/dist/axios"
        ],
        "grunt": [
            "../node_modules/grunt/lib/grunt"
        ]
    },
    "deps": [
        "./bootstrap"
    ]
};

requirejs.config(requireConfig);
