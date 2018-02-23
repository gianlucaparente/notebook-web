class NotebookApp {

    constructor(vue, axios, configuration) {

        this.registerComponents(vue, configuration.application.components);

        var app = new vue({
            el: '#' + configuration.application.rootElement,
            data: {
                notes: []
            },
            components: configuration.application.components,
            mounted: function () {
                this.retrieveData(axios);
            },
            methods: {
                retrieveData(axios) {

                    axios.get("http://localhost:8080/notes")
                        .then((response) => {
                            this.notes = response.data;
                            console.log("NotebookApp: Data retrieved correctly.");
                        })
                        .catch((e) => {
                            console.log(e);
                        });

                }
            }
        });

        console.log("NotebookApp: Vue App created.", app);

    }

    registerComponents(vue, components) {

        console.log("NotebookApp: Start register components..");

        Object.keys(components).forEach((key) => {
            vue.component(key, components[key]);
            console.log("NotebookApp: Register component " + key);
        });

        console.log("NotebookApp: End register components.");

    }

}

define([
    'vue',
    'axios',
    'configuration',
    '../note-list/note-list.component',
    '../note-item/note-item.component'
], function (vue,
             axios,
             configuration,
             NoteList,
             NoteItem) {

    if (!configuration.application) {
        configuration.application = {
            components: {}
        };
    }

    configuration.application.components = {
        'note-list': NoteList,
        'note-item': NoteItem
    };

    new NotebookApp(vue, axios, configuration);

});