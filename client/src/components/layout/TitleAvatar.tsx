const avatars = ["👸", "🧙", "🧝", "🧚", "🧛", "🧜", "🧞", "🧟"];

function TitleAvatar() {
  return (
    <div className="text-2xl">
      {avatars[Math.floor(Math.random() * avatars.length)]}
    </div>
  );
}

export default TitleAvatar;
