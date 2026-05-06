import "./components.css";
export default function Post({ caption, imageSrc }) {
  return (
    <div className="flex flex-col w-lg h-125 rounded-xl p-3 gap-2 bg-[#e8e5e0] postContainer">
      <div className="flex justify-center items-center w-full h-[91%] rounded-sm  bg-white">
        {imageSrc ? <img className="h-full" src={imageSrc} /> : <></>}
      </div>
      <div className="flex justify-center items-center w-full h-8 rounded-sm text-sm bg-white">
        <p>{caption}</p>
      </div>
    </div>
  );
}
