export default ({ state }) => {
  const fields = {};
  Object.keys(state.values).forEach((blockID) => {
    const fieldKey = Object.keys(state.values[blockID])[0];
    fields[blockID] = state.values?.[blockID]?.[fieldKey]?.value;
  });

  return fields;
};
