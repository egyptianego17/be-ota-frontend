
const ColoredCircle = ({ isGreen }: { isGreen: boolean }) => {
    return (
      <div
        className={`flex h-2 w-2 shrink-0 rounded-full ${
          isGreen ? "bg-green-500" : "bg-red-500"
        }`}
      ></div>
    );
  };

  
export default ColoredCircle;