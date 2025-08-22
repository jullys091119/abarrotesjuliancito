export default function HorizontalList() {
  const items = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex gap-4 w-full">
        {items.map((item) => (
          <div
            key={item}
            className="flex-shrink-0 w-1/3 h-40 bg-green-600 text-white flex items-center justify-center rounded-xl"
          >
            Item {item}
          </div>
        ))}
      </div>
    </div>
  );
}
