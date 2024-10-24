const avatars = ["👸", "🧙", "🧝", "🧚", "🧛", "🧜", "🧞", "🧟"];

function TitleAvatar() {
  return (
    <span className="text-2xl">
      {avatars[Math.floor(Math.random() * avatars.length)]}
    </span>
  );
}

export default TitleAvatar;
