let NoteItem = {
    props: ['note'],
    template:
    "<div class='Note'>" +
    "<div class='title'>{{ note.title }}</div>" +
    "<div class='date'>{{ new Date(note.date).toLocaleDateString() }}</div>" +
    "<div class='address'>{{ note.address }}</div>" +
    "<div class='contact'>" +
    "<div class='name'>{{ note.contact.name }}</div>" +
    "<div class='telephone'>{{ note.contact.telephone1 }} - {{ note.contact.telephone2 }}</div>" +
    "</div>" +
    "</div>"
};

define([], function() {
    return NoteItem;
});
 