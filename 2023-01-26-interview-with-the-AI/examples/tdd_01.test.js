// my solution
const swapKeysAndValues = (obj) => {
  if (!obj) {
    return {};
  }

  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (acc[value]) {
      acc[`${value}_${key}`] = key;
    } else {
      acc[value] = key;
    }
    return acc;
  }, {});
};

// chatGPT3 solution
// function swapKeysAndValues(obj) {
//   if (!obj) {
//     return {};
//   }

//   const result = {};
//   const valueCount = {};

//   Object.keys(obj).forEach((key) => {
//     const value = obj[key];
//     if (!valueCount[value]) {
//       valueCount[value] = 1;
//       result[value] = key;
//     } else {
//       valueCount[value] += 1;
//       result[`${value}_key_${key}`] = key;
//     }
//   });

//   return result;
// }

describe('swapKeysAndValues', () => {
  it.each`
    value
    ${null}
    ${undefined}
  `(
    'returns an empty object if the provided object is null or undefined',
    ({ value }) => {
      expect(swapKeysAndValues(value)).toEqual({});
    }
  );

  it.each`
    value                                                       | expected
    ${{ key_fox: 'value_red' }}                                     | ${{ value_red: 'key_fox' }}
    ${{ key_fox: 'value_red', key_tiger: 'value_orange' }}                   | ${{ value_red: 'key_fox', value_orange: 'key_tiger' }}
    ${{ key_fox: 'value_red', key_tiger: 'value_orange', key_deer: 'value_brown' }} | ${{ value_red: 'key_fox', value_orange: 'key_tiger', value_brown: 'key_deer' }}
  `(
    'returns the object with keys and values swapped',
    ({ value, expected }) => {
      expect(swapKeysAndValues(value)).toEqual(expected);
    }
  );

  it('returns the key with the key as suffix if the value is not unique', () => {
    const value = {
      key_fox: 'value_red',
      key_tiger: 'value_red',
      key_deer: 'value_red',
    };

    expect(swapKeysAndValues(value)).toEqual({
      value_red: 'key_fox',
      value_red_key_tiger: 'key_tiger',
      value_red_key_deer: 'key_deer',
    });
  });
});
