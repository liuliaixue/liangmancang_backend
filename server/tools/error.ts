const Err = {
  NotFound(msg: string) {
    return new Error(`NotFound: ${msg}`);
  },
  NotMatch(msg: string) {
    return new Error(`NotMatch: ${msg}`);
  },
  Existed(msg: string) {
    return new Error(`Existed: ${msg}`);
  }
};
export default Err;
