export default {
  schemas: {
    Person: {
      type: Object,
      properties: {
        firstname: {
          type: String,
        },

        lastname: {
          type: String,
        },
        email: {
          type: String,
        },
        role: {
          type: String,
        },
      },
    },
  },
};
