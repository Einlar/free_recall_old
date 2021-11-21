export const standard = defineScenario({
  recallRecord: {
    one: {
      data: {
        type: 'RECALL',
        presentedWords: 'String',
        words: { foo: 'bar' },
        subject: { create: { email: 'String', age: 9183550, gender: 'MALE' } },
      },
    },

    two: {
      data: {
        type: 'RECALL',
        presentedWords: 'String',
        words: { foo: 'bar' },
        subject: { create: { email: 'String', age: 5471583, gender: 'MALE' } },
      },
    },
  },
})
