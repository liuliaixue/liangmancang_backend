const Err = {
  NotFound(msg: string) {
    return new Error(`NotFound: ${msg}`);
  },
  NotMatch(msg: string) {
    return new Error(`NotMatch: ${msg}`);
  },
  Existed(msg: string) {
    return new Error(`Existed: ${msg}`);
  },
  IllegalValue(msg: String) {
    return new Error(`IllegalValue: ${msg}`);
  }
};
export default Err;
