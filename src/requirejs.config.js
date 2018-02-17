var requireConfig = {
    "map": {},
    "paths": {
        "vue": [
            "../node_modules/vue/dist/vue"
        ],
        "axios": [
            "../node_modules/axios/dist/axios"
        ]
    },
    "deps": [
        "./bootstrap"
    ]
};

requirejs.config(requireConfig);
