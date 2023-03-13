import EventHandler from "events";

const eventBus = new EventHandler();

eventBus.on("newUser", () => {
  console.log("Creando nuevo usuario");
});

eventBus.emit("newUser");

/*
eventBus.on("anyEventNameString", () => {
  console.log("any function callback");
});

eventBus.emit("anyEventNameString");
*/
