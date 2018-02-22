
class NotebookApp {

    constructor(vue, axios, configuration) {

        var components = this.registerComponents(vue, configuration.application.components);

        axios.get("http://localhost:8080/notes")
            .then((response) => {

                var app = new vue({
                    el: '#' + configuration.application.rootElement,
                    data: {
                        notes: response.data
                    }
                });

            })
            .catch((e) => {
                console.log(e);
            });


    }

    registerComponents(vue, components) {

        if (!components || components.length === 0 || !vue) {
            console.log("NotebookApp: No components found to load.");
            return;
        }

        console.log("NotebookApp: Start register components..");

        var module;

        components.forEach((component) => {

            try {
                module = require([component.path]);
                vue.component(component.name, module);
                console.log("NotebookApp: Register component " + component.name);
            } catch(e) {
                console.warn("NotebookApp: Component " + component.name + " not found.");
            }

        });

        console.log("NotebookApp: End register components.");

    }

    retrieveData(axios) {

        axios.get("http://localhost:8080/notes")
            .then((response) => {
                this.notes = response.data;
            })
            .catch((e) => {
                console.log(e);
            });

    }
}

define([
    'vue', 'axios', 'configuration'
], function (vue, axios, configuration) {
    new NotebookApp(vue, axios, configuration);
});