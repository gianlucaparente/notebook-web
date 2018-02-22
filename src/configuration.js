let configuration = {

    application: {

        rootElement: "app",

        components: [
            {
                name: 'note-list',
                path: 'components/note-list/note-list.component'
            },
            {
                name: 'note-item',
                path: 'components/note-item/note-item.component'
            }
        ]

    },
    
    navigation: {
        
    }
   
};

define([], function () {
    return configuration;
});