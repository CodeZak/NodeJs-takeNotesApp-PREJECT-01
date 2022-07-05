const notes = require("./notes");
const yargs = require("yargs");

yargs.command({
    command: "add",
    describe: "adding notes",
    builder: {
        title: {
            describe: "note title",
            demandOption: true,
            type: "string",
        },
        body: {
            describe: "note body",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    },
});

yargs.command({
    command: "remove",
    describe: "removing notes",
    builder: {
        title: {
            describe: "remove note title",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notes.removeNote(argv.title);
    },
});

yargs.command({
    command: "list",
    describe: "list notes",
    handler() {
        notes.listNotes();
    },
});

yargs.command({
    command: "read",
    describe: "read notes",
    builder: {
        title: {
            describe: "read note title",
            demandOption: true,
            type: "string",
        },
    },
    handler(argv) {
        notes.getNotes(argv.title);
    },
});

yargs.parse();
