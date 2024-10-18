const gods = [
  {
    name: "Zeus",
    description: "God of the sky, lightning, thunder, law, order, and justice",
  },
  {
    name: "Athena",
    description: "Goddess of wisdom, war, and the arts",
  },
  {
    name: "Poseidon",
    description: "God of the sea, rivers, lakes and floods",
  },
];

const GodsList = () => {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold">Here are some gods:</h2>
      <div className="flex w-full flex-col justify-center gap-4">
        {gods.map((god, index) => (
          <div key={index}>
            <h3 className="font-semibold">{god.name}</h3>
            <p>{god.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GodsList;
