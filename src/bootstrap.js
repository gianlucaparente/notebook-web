define([
    'vue',
    'axios',
    'configuration'
], function (vue, axios, configuration) {

    axios.get(`http://localhost:8080/notes`)
        .then(response => {

            vue.component('note-list', {
                props: ['notes'],
                template: "<table border='1' cellpadding='5' cellspacing='5'>" +
                "<note-item v-for='note in notes' v-bind:note='note' v-bind:key='note.id'></note-item>" +
                "</table>"
            });

            vue.component('note-item', {
                props: ['note'],
                template: '<tr>' +
                '<td>{{ new Date(note.date).toLocaleDateString() }}</td>' +
                '<td>{{ note.title }}</td>' +
                '<td>{{ note.contact.name }}</td>' +
                '<td>{{ note.contact.telephone1 }} - {{ note.contact.telephone2 }}</td>' +
                '<td>{{ note.address }}</td>' +
                '</tr>'
            });

            var app = new vue({
                el: '#app',
                data: {
                    notes: response.data
                }
            });

        })
        .catch(e => {
            console.log(e);
        })
    
});



