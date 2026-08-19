import { useState } from "react";

export function TwitterFollowCard({
  userName,
  formatUserName,
  children,
  initialIsFollowing,
  initialIsFollowingHover,
  link,
}) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isFollowingHover, setIsFollowingHover] = useState(
    initialIsFollowingHover,
  );

  let text = isFollowing ? "Siguiendo" : "Seguir";

  let buttonClassName = isFollowing
    ? "tw-followCard-button following"
    : "tw-followCard-button";

  if (isFollowing && isFollowingHover) {
    text = "Dejar de seguir";
  }
  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  const handleHover = () => {
    setIsFollowingHover(!isFollowingHover);
  };

  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img
          className="tw-followCard-avatar"
          alt="El avatar de steam"
          src={link}
        />
        <div className="tw-followCard-info">
          <strong>{children}</strong>
          <span className="tw-followCard-infoUserName">
            {formatUserName(userName)}
          </span>
        </div>
      </header>

      <aside>
        <button
          className={buttonClassName}
          onClick={handleClick}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          {text}
        </button>
      </aside>
    </article>
  );
}
