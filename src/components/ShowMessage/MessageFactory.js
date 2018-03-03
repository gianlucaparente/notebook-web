export default class MessageFactory {

  static MESSAGE_CLASSES = {
    success: "success",
    error: "error",
    info: "info",
    warning: "warning"
  };

  static getMessage(text, type) {
    if (!text) {
      console.error("No message found for create message object.");
      return undefined;
    }
    if (!type) {
      type = MessageFactory.MESSAGE_CLASSES.info;
    }
    return {
      text: text,
      type: type
    }
  }

}
