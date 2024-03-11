const LIST_INPUTS = [
  { label: 'Pokemon Name', type: 'text', require: true, error: 'Wrong name' },
  { label: 'Pokemon Number', type: 'text', require: true, error: 'Wrong number' },
  { label: 'Picture', type: 'text', require: false, error: 'Wrong path' },
  { label: 'Type1', type: 'selected', require: true },
  { label: 'Type2', type: 'selected', require: false },
  { label: 'Description', type: 'text', require: false }
];

export { LIST_INPUTS };
