

export default {
  Bill: async (context: any) => {
    if (context && context.fieldNodes && context.fieldNodes[0]) {
      return { _id: "123test" }
    }
  },
}